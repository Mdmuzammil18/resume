"use client";

import { useEffect, useRef } from "react";

type Line = [string, string, string, string?, string?];

const lines: Line[] = [
  ["p", "❯ ", "ship project-alpha"],
  ["ok", "✓ ", "ios + android    ", "dim", "app store · play store"],
  ["ok", "✓ ", "web              ", "dim", "marketplace for users"],
  ["arr", "→ ", "live in production"],
  ["p", "❯ ", "ship flagship"],
  ["ok", "✓ ", "notifications    ", "dim", "node · 20+ events"],
  ["wip", "◐ ", "next             ", "dim", "agentic workflows · evals"],
];

export function Terminal() {
  const ref = useRef<HTMLPreElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.innerHTML = "";
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const span = (cls: string, text: string) => {
      const s = document.createElement("span");
      if (cls) s.className = cls;
      s.textContent = text;
      return s;
    };
    const renderLine = (parts: Line) => {
      const frag = document.createDocumentFragment();
      frag.appendChild(span(parts[0], parts[1]));
      frag.appendChild(span("", parts[2]));
      if (parts[3]) frag.appendChild(span(parts[3], parts[4] ?? ""));
      frag.appendChild(document.createTextNode("\n"));
      return frag;
    };
    const cursor = span("cursor", "");

    if (reduced) {
      lines.forEach((l) => el.appendChild(renderLine(l)));
      el.appendChild(span("p", "❯ "));
      el.appendChild(cursor);
      return;
    }

    let i = 0;
    let timer: ReturnType<typeof setTimeout>;
    const next = () => {
      if (i < lines.length) {
        el.appendChild(renderLine(lines[i++]));
        timer = setTimeout(next, lines[i - 1][0] === "p" ? 700 : 350);
      } else {
        el.appendChild(span("p", "❯ "));
        el.appendChild(cursor);
      }
    };
    timer = setTimeout(next, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="terminal reveal visible" aria-label="Terminal showing shipped projects">
      <div className="terminal-bar">
        <span className="tdot r" />
        <span className="tdot y" />
        <span className="tdot g" />
        <span className="mono terminal-title">~/muzammil — zsh</span>
      </div>
      <pre className="terminal-body mono" ref={ref} />
    </div>
  );
}
