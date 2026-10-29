"use client";

import { useEffect, useRef, useState } from "react";
import { testimonials } from "@/lib/site";

const pad = (n: number) => String(n).padStart(2, "0");

export function Testimonials() {
  const [idx, setIdx] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = testimonials.length;

  const restart = () => {
    if (timer.current) clearInterval(timer.current);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduced) {
      timer.current = setInterval(() => setIdx((i) => (i + 1) % total), 7000);
    }
  };

  useEffect(() => {
    restart();
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const go = (n: number) => {
    setIdx((n + total) % total);
    restart();
  };

  return (
    <div className="carousel">
      <div className="slides" style={{ transform: `translateX(-${idx * 100}%)` }}>
        {testimonials.map((t) => (
          <div className="slide" key={t.name}>
            <figure>
              <p className="pull">{t.pull}</p>
              <blockquote>“{t.quote}”</blockquote>
              <figcaption>
                <span className="avatar">{t.avatar}</span>
                <div>
                  <strong>{t.name}</strong>
                  <span className="muted">{t.title}</span>
                </div>
              </figcaption>
            </figure>
          </div>
        ))}
      </div>
      <div className="carousel-controls">
        <button className="icon-btn" onClick={() => go(idx - 1)} aria-label="Previous testimonial">
          ←
        </button>
        <span className="mono">
          {pad(idx + 1)} / {pad(total)}
        </span>
        <button className="icon-btn" onClick={() => go(idx + 1)} aria-label="Next testimonial">
          →
        </button>
      </div>
    </div>
  );
}
