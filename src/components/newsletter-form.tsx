"use client";

import { useState } from "react";

export function NewsletterForm({ source = "footer" }: { source?: string }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      setState(res.ok ? "done" : "error");
      if (res.ok) setEmail("");
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <p className="mt-5 border hairline px-4 py-3 text-xs uppercase tracking-[0.16em] text-gold">
        Welcome in. Your 10% code is on its way.
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="mt-5 flex border-b hairline">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        className="w-full bg-transparent py-3 text-sm text-ivory placeholder:text-ivory/30 focus:outline-none"
      />
      <button
        type="submit"
        disabled={state === "loading"}
        className="shrink-0 text-[10px] uppercase tracking-[0.18em] text-gold disabled:opacity-50"
      >
        {state === "loading" ? "..." : "Join"}
      </button>
    </form>
  );
}
