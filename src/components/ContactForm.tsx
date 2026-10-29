"use client";

import { useState } from "react";
import { site } from "@/lib/site";

export function ContactForm() {
  const [note, setNote] = useState("I usually reply within a couple of days.");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const subject = encodeURIComponent(`Hello from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setNote("Opening your mail app…");
  };

  return (
    <form className="contact-form reveal visible" onSubmit={onSubmit}>
      <label>
        Name
        <input type="text" name="name" required maxLength={100} autoComplete="name" />
      </label>
      <label>
        Email
        <input type="email" name="email" required maxLength={200} autoComplete="email" />
      </label>
      <label>
        Message
        <textarea name="message" rows={5} required maxLength={2000} />
      </label>
      <button className="btn" type="submit">
        Send message →
      </button>
      <p className="muted small">{note}</p>
    </form>
  );
}
