---
title: "The agentic loop, explained step by step"
excerpt: "How an AI agent actually works: call the Messages API, check stop_reason, run the tool, append the result, repeat until the model is done."
date: "2026-11-16"
category: "ai"
tags: ["ai", "agents", "claude", "llm"]
featured: true
---

The idea every AI agent depends on is the **agentic loop**. Once it clicked for me,
"agents" stopped looking like magic. An agent is a `while` loop around an API call.

## The one-sentence version

The Messages API produces **one step at a time**. The `stop_reason` says **why that
step ended**. My code runs a loop of **call → check → act → append** until the model
says it is done or one of my safety limits is reached.

## The ingredients

Each call to the Messages API takes three things:

- **`messages`**: the conversation so far, as an array
- **`model`**: the model to run
- **`tools`**: the tools the model may ask for, each with a name, a description
  and a JSON schema for its input

The response contains the new assistant message (its `content` blocks) plus a
`stop_reason` that says why the model stopped generating. My code reads that
reason to decide what to do next.

## Branch 1: `stop_reason == "tool_use"`

The model is **not finished**. It is asking for a tool to be run.

The key point is that **the model does not run anything**. It only writes a
`tool_use` block containing a tool name, an input and an id. My code:

1. Reads the `name` and `input` from each `tool_use` block
2. Runs the tool itself
3. Appends the **assistant message** to `messages`
4. Appends a **user message** containing a `tool_result` block that points back to
   the request by `tool_use_id`
5. Calls the API again with the longer history

The API is stateless, so the **whole history is sent on every call**. That is how
the model sees what it asked for and what came back, and uses that to choose its next
step.

## Branch 2: `stop_reason == "end_turn"`

The model has **finished its turn**. Instead of asking for a tool, it has written a
final text answer. My code breaks out of the loop and returns that text to the user.

> Note: `end_turn` means the model has stopped, not that the task worked. The final
> message could be "All tests pass", but it could also be a clarifying question or
> "I couldn't fix this". Read the answer before treating it as a success.

## The other stop reasons

A real loop should handle these too, not only the two common cases:

| `stop_reason`   | What it means                                   | What the loop should do                        |
| --------------- | ----------------------------------------------- | ---------------------------------------------- |
| `tool_use`      | Model wants one or more tools run               | Run them, append results, call again           |
| `end_turn`      | Model finished naturally                        | Return the answer                              |
| `max_tokens`    | Hit the `max_tokens` limit mid-response          | Raise the limit, or handle the truncated output |
| `stop_sequence` | Generated one of your custom stop sequences     | Handle it the way your app expects             |
| `pause_turn`    | A long server-side tool turn was paused          | Send the response back so the model can continue |
| `refusal`       | Model declined to continue                      | Stop and show the user                         |

## Safety stops are my job

The API doesn't know about my budgets or approval rules, so those checks go **in my
loop code**:

- a **maximum number of steps**, so a confused agent can't loop forever
- a **token or cost budget**, tracked from `response.usage` on each call
- **human approval** before risky tools such as deleting files, sending emails or
  making payments

## The loop in code

Here is the whole thing in Python with the Anthropic SDK:

```python
import anthropic

client = anthropic.Anthropic()
MODEL = "claude-sonnet-4-5"

TOOLS = [
    {
        "name": "run_tests",
        "description": "Run the project's test suite and return the output.",
        "input_schema": {"type": "object", "properties": {}},
    },
    {
        "name": "read_file",
        "description": "Read a file from the repository.",
        "input_schema": {
            "type": "object",
            "properties": {"path": {"type": "string"}},
            "required": ["path"],
        },
    },
    {
        "name": "edit_file",
        "description": "Replace old_text with new_text in a file.",
        "input_schema": {
            "type": "object",
            "properties": {
                "path": {"type": "string"},
                "old_text": {"type": "string"},
                "new_text": {"type": "string"},
            },
            "required": ["path", "old_text", "new_text"],
        },
    },
]


def run_agent(goal: str, max_steps: int = 10, token_budget: int = 100_000) -> str:
    messages = [{"role": "user", "content": goal}]
    tokens_used = 0

    for _ in range(max_steps):  # safety stop: step limit
        response = client.messages.create(
            model=MODEL,
            max_tokens=4096,
            tools=TOOLS,
            messages=messages,
        )

        tokens_used += response.usage.input_tokens + response.usage.output_tokens
        if tokens_used > token_budget:  # safety stop: budget
            raise RuntimeError("Token budget exceeded")

        # Always keep the assistant turn in the history
        messages.append({"role": "assistant", "content": response.content})

        if response.stop_reason == "end_turn":
            return "".join(b.text for b in response.content if b.type == "text")

        if response.stop_reason == "tool_use":
            results = []
            # A single response can contain several tool_use blocks
            for block in response.content:
                if block.type != "tool_use":
                    continue
                try:
                    output = execute_tool(block.name, block.input)
                    results.append({
                        "type": "tool_result",
                        "tool_use_id": block.id,
                        "content": output,
                    })
                except Exception as e:
                    results.append({
                        "type": "tool_result",
                        "tool_use_id": block.id,
                        "content": str(e),
                        "is_error": True,  # let the model see the failure and adapt
                    })
            # All results go back together in one user message
            messages.append({"role": "user", "content": results})
            continue

        raise RuntimeError(f"Unexpected stop_reason: {response.stop_reason}")

    raise RuntimeError("Hit max_steps before the model finished")
```

`execute_tool` is your own code. It maps a tool name to a real function, and it is
where human approval goes if a tool is risky.

## Watching it run

Here is a real trace for the goal *"The tests are failing, fix them."* Each block is
one API response:

```python
# Call 1
{
  "role": "assistant",
  "content": [
    {"type": "text", "text": "Let me run the tests first."},
    {"type": "tool_use", "id": "toolu_01", "name": "run_tests", "input": {}}
  ],
  "stop_reason": "tool_use"   # continue
}

# Call 2
{
  "role": "assistant",
  "content": [
    {"type": "text", "text": "test_add fails. Let me look at the add function."},
    {"type": "tool_use", "id": "toolu_02", "name": "read_file", "input": {"path": "app.py"}}
  ],
  "stop_reason": "tool_use"   # continue
}

# Call 3: edit_file tool_use  -> "tool_use", continue
# Call 4: run_tests tool_use  -> "tool_use", continue

# Call 5
{
  "role": "assistant",
  "content": [
    {"type": "text", "text": "Fixed. add() had an extra + 1. All tests now pass."}
  ],
  "stop_reason": "end_turn"   # stop, break the loop
}
```

And here is the `messages` array just before call 2. Each tool request is followed
by a **user** message carrying its result:

```python
[
  {"role": "user", "content": "The tests are failing, fix them."},
  {"role": "assistant", "content": [
      {"type": "text", "text": "Let me run the tests first."},
      {"type": "tool_use", "id": "toolu_01", "name": "run_tests", "input": {}}
  ]},
  {"role": "user", "content": [
      {"type": "tool_result", "tool_use_id": "toolu_01",
       "content": "FAILED test_add: expected 4, got 5"}
  ]}
]
```

`stop_reason` is a field on the **response**, not part of the message. You append only
the `role` and `content`.

## Things that tripped me up

- **The model never runs tools.** It asks for them, and your code runs them.
- **Tool results go in a `user` message**, as `tool_result` blocks linked by
  `tool_use_id`.
- **Send back every result.** If a response has three `tool_use` blocks, the next
  message needs three `tool_result` blocks.
- **The API is stateless.** The model only knows what is in `messages`, so the history
  gets longer with every step, and so does the cost.
- **`end_turn` means the model stopped, not that it succeeded.** Read the answer.
- **Safety limits belong in your code.** Step limits, budgets and approvals are never
  the API's job.

## Recap

```text
messages = [user goal]
loop:
    response = call Messages API(messages, model, tools)
    append assistant message
    if stop_reason == "end_turn":  return answer
    if stop_reason == "tool_use":  run tools, append tool_results as a user message
    else:                          handle / stop
    check safety limits (steps, tokens, approvals)
```

That is the core of every agent I have looked at so far. More advanced setups like
sub-agents, memory and planning are built on top of this loop.
