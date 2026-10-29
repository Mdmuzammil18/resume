---
title: "How I built this portfolio with Next.js"
excerpt: "A walkthrough of the stack, the folder structure and how the Markdown blog works — so you can make it your own."
date: "2026-10-26"
category: "build log"
tags: ["nextjs", "react", "markdown"]
featured: true
---

This site is a Next.js App Router project with a file-based Markdown blog. Here is
exactly how it is put together, so you can extend it.

## The stack

- **Next.js 16** with the App Router and React Server Components
- **TypeScript** everywhere
- **Tailwind v4** is installed, but the visual design lives in a hand-written
  `globals.css` so the look stays fully under my control
- **gray-matter + react-markdown** to turn Markdown files into pages

## Where things live

```text
content/blog/*.md      ← your posts (what you are reading now)
src/lib/site.ts        ← all your personal content: projects, jobs, stack
src/lib/posts.ts       ← reads and parses the Markdown files
src/app/page.tsx       ← the home page
src/app/blog/          ← the blog index and post pages
src/components/        ← Nav, Footer, Terminal, Stats, Testimonials, …
```

## Writing a post

Every post is a Markdown file with a small block of frontmatter at the top:

```md
---
title: "My post title"
excerpt: "One sentence that shows up in the list."
date: "2026-10-26"
category: "build log"
tags: ["nextjs", "react"]
---

Your content starts here. Write in plain **Markdown**.
```

Drop the file in `content/blog/`, and it shows up automatically — on the blog index,
on the home page, and at its own URL. No database, no CMS.

## Rendering the Markdown

The post page reads the file, parses the frontmatter and renders the body with
`react-markdown`. A couple of plugins do the heavy lifting:

```tsx
<Markdown
  remarkPlugins={[remarkGfm]}
  rehypePlugins={[rehypeSlug, rehypeHighlight]}
>
  {post.content}
</Markdown>
```

- `remark-gfm` gives you tables, task lists and strikethrough
- `rehype-slug` adds ids to headings so you can link to them
- `rehype-highlight` adds syntax colours to code blocks

## What I would do next

1. Wire the contact form to a real email service
2. Add an RSS feed generated from the same post list
3. Give each project its own case-study page

That is the whole idea: the code is the easy part — the writing is where the value is.
