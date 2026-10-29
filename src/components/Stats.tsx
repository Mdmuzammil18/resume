"use client";

import { useEffect, useRef, useState } from "react";
import { stats } from "@/lib/site";

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLElement | null>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setN(target);
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          let v = 0;
          const tick = () => {
            v++;
            setN(v);
            if (v < target) setTimeout(tick, 900 / target);
          };
          tick();
          io.unobserve(el);
        }
      });
    });
    io.observe(el);
    return () => io.disconnect();
  }, [target]);

  return (
    <strong ref={ref as React.Ref<HTMLElement>}>
      {n}
      {suffix}
    </strong>
  );
}

export function Stats() {
  return (
    <div className="container stats">
      {stats.map((s) => (
        <div className="stat" key={s.label}>
          <Counter target={s.count} suffix={s.suffix} />
          <span>{s.label}</span>
        </div>
      ))}
    </div>
  );
}
