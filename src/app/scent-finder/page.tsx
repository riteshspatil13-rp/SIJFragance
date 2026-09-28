"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/cart-context";
import type { Product } from "@/db/schema";
import { inr, waLink } from "@/lib/site";

const steps = [
  {
    key: "vibe",
    q: "Which world do you want to live in?",
    sub: "Choose the description that makes you feel something.",
    options: [
      { v: "warm", t: "Warm & resinous", d: "Oud, amber, saffron, leather" },
      { v: "fresh", t: "Cool & clean", d: "Citrus, sea salt, rain on earth" },
      { v: "floral", t: "Floral & romantic", d: "Rose, mogra, tuberose" },
      { v: "sweet", t: "Sweet & edible", d: "Coffee, vanilla, cocoa" },
      { v: "woody", t: "Soft & woody", d: "Sandalwood, iris, cashmere musk" },
    ],
  },
  {
    key: "moment",
    q: "When will you wear it most?",
    sub: "Context changes everything about a scent.",
    options: [
      { v: "office", t: "Work & meetings", d: "Must stay polite in a lift" },
      { v: "date", t: "Dinners & dates", d: "Meant to be noticed up close" },
      { v: "wedding", t: "Weddings & festivals", d: "Competing with 400 guests" },
      { v: "daily", t: "Everyday, everywhere", d: "Your signature on repeat" },
      { v: "gift", t: "It's a gift", d: "Safe, loved, beautifully boxed" },
    ],
  },
  {
    key: "strength",
    q: "How loud should your trail be?",
    sub: "Sillage is how far your scent travels.",
    options: [
      { v: "subtle", t: "Whisper", d: "Only someone hugging me knows" },
      { v: "balanced", t: "Balanced", d: "An arm's length of presence" },
      { v: "bold", t: "Statement", d: "Enters the room before I do" },
    ],
  },
  {
    key: "format",
    q: "Spray or attar?",
    sub: "Attars are alcohol-free oils. Sprays diffuse faster.",
    options: [
      { v: "spray", t: "Alcohol spray", d: "Instant projection, easy to wear" },
      { v: "attar", t: "Pure attar oil", d: "Skin-close, long, travel-friendly" },
      { v: "either", t: "Surprise me", d: "I'm open to both" },
    ],
  },
  {
    key: "budget",
    q: "What feels comfortable?",
    sub: "Every tier uses the same oil quality.",
    options: [
      { v: "under1000", t: "Under ₹1,000", d: "Travel sizes & budget-luxury" },
      { v: "1000to2500", t: "₹1,000 – ₹2,500", d: "Full bottles, great value" },
      { v: "premium", t: "₹2,500 and above", d: "Extraits & rare naturals" },
    ],
  },
] as const;

export default function ScentFinderPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [results, setResults] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState(false);
  const { add } = useCart();

  async function choose(key: string, value: string) {
    const next = { ...answers, [key]: value };
    setAnswers(next);
    if (step < steps.length - 1) {
      setStep(step + 1);
      return;
    }
    setLoading(true);
    const res = await fetch("/api/scent-finder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(next),
    });
    const data = await res.json();
    setResults(data.products as Product[]);
    setLoading(false);
  }

  if (loading) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4">
        <span className="font-display text-4xl gold-gradient">Composing your shortlist…</span>
        <span className="text-[10px] uppercase tracking-luxe text-ivory/40">Matching 13 formulas</span>
      </div>
    );
  }

  if (results) {
    return (
      <div className="mx-auto max-w-6xl px-5 py-16 lg:px-8 lg:py-24">
        <p className="text-[10px] uppercase tracking-luxe text-gold">Your olfactive profile</p>
        <h1 className="mt-4 font-display text-5xl font-light lg:text-6xl">Three bottles built for you</h1>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-ivory/50">
          Ranked by fit. Start with the first — or sample all three inside the Discovery Set and
          decide on skin.
        </p>

        <div className="mt-14 space-y-10">
          {results.map((p, i) => (
            <div key={p.id} className="grid gap-8 border hairline p-6 md:grid-cols-[200px_1fr] md:p-8">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.imageUrl} alt={p.imageAlt} className="aspect-[4/5] w-full object-cover" />
              <div>
                <p className="text-[10px] uppercase tracking-[0.18em] text-gold">
                  {i === 0 ? "Your top match" : `Match ${i + 1}`} · {p.family}
                </p>
                <h2 className="mt-3 font-display text-4xl font-light">{p.name}</h2>
                <p className="mt-2 font-display text-lg italic text-champagne/80">{p.tagline}</p>
                <p className="mt-4 text-sm leading-relaxed text-ivory/55">{p.description}</p>
                <p className="mt-4 text-[10px] uppercase tracking-[0.14em] text-ivory/40">
                  {p.topNotes.join(" · ")} → {p.heartNotes.join(" · ")} → {p.baseNotes.join(" · ")}
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <button
                    onClick={() =>
                      add({
                        productId: p.id, slug: p.slug, name: p.name, size: p.variants[0].size,
                        price: p.variants[0].price, qty: 1, image: p.imageUrl,
                      })
                    }
                    className="rounded-full bg-gold px-8 py-3.5 text-[11px] uppercase tracking-[0.18em] text-ink hover:bg-champagne"
                  >
                    Add {p.variants[0].size} · {inr(p.variants[0].price)}
                  </button>
                  <Link href={`/product/${p.slug}`} className="border-b border-gold/40 pb-1 text-[11px] uppercase tracking-[0.16em] text-champagne hover:text-gold">
                    Read the full story →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap gap-4">
          <button
            onClick={() => { setResults(null); setStep(0); setAnswers({}); }}
            className="rounded-full border border-white/25 px-8 py-3.5 text-[11px] uppercase tracking-[0.18em] hover:border-gold hover:text-gold"
          >
            Retake the quiz
          </button>
          <a
            href={waLink(
              `Hi SIJ Fragrances! My scent finder result was: ${results.map((r) => r.name).join(", ")}. Can you help me pick one?`,
            )}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-[#1fa855] px-8 py-3.5 text-[11px] uppercase tracking-[0.18em] text-white hover:bg-[#189c4c]"
          >
            Ask a consultant
          </a>
        </div>
      </div>
    );
  }

  const current = steps[step];

  return (
    <div className="mx-auto max-w-3xl px-5 py-16 lg:py-24">
      <div className="flex items-center gap-2">
        {steps.map((s, i) => (
          <span key={s.key} className={`h-px flex-1 ${i <= step ? "bg-gold" : "bg-white/15"}`} />
        ))}
      </div>
      <p className="mt-6 text-[10px] uppercase tracking-luxe text-gold">
        Question {step + 1} of {steps.length}
      </p>
      <h1 className="mt-4 font-display text-4xl font-light leading-tight lg:text-5xl">{current.q}</h1>
      <p className="mt-3 text-sm text-ivory/45">{current.sub}</p>

      <div className="mt-10 space-y-3">
        {current.options.map((o) => (
          <button
            key={o.v}
            onClick={() => choose(current.key, o.v)}
            className="group flex w-full items-center justify-between border hairline px-6 py-5 text-left transition hover:border-gold hover:bg-gold/5"
          >
            <span>
              <span className="block font-display text-2xl text-ivory">{o.t}</span>
              <span className="mt-1 block text-[11px] uppercase tracking-[0.14em] text-ivory/40">{o.d}</span>
            </span>
            <span className="text-gold opacity-0 transition group-hover:opacity-100">→</span>
          </button>
        ))}
      </div>

      {step > 0 && (
        <button
          onClick={() => setStep(step - 1)}
          className="mt-8 text-[10px] uppercase tracking-[0.16em] text-ivory/40 hover:text-gold"
        >
          ← Back
        </button>
      )}
    </div>
  );
}
