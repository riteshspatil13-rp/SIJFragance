"use client";

import { useState } from "react";
import type { Order } from "@/db/schema";
import { inr, site, waLink } from "@/lib/site";

export default function TrackPage() {
  const [code, setCode] = useState("");
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function lookup(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setOrder(null);
    const res = await fetch(`/api/orders?code=${encodeURIComponent(code.trim())}`);
    const data = await res.json();
    if (!res.ok) setError(data.error ?? "Order not found.");
    else setOrder(data.order as Order);
    setLoading(false);
  }

  return (
    <div className="mx-auto max-w-3xl px-5 py-16 lg:py-24">
      <p className="text-[10px] uppercase tracking-luxe text-gold">Order Status</p>
      <h1 className="mt-4 font-display text-5xl font-light">Track your parcel</h1>
      <p className="mt-4 text-sm text-ivory/50">
        Enter the order code we sent you (e.g. SIJ-482913). Need a human? WhatsApp {site.phoneDisplay}.
      </p>

      <form onSubmit={lookup} className="mt-9 flex flex-wrap gap-4">
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="SIJ-000000"
          className="flex-1 border hairline bg-transparent px-4 py-3.5 text-sm uppercase tracking-[0.12em] focus:border-gold focus:outline-none"
        />
        <button disabled={loading} className="rounded-full bg-gold px-9 py-3.5 text-[11px] uppercase tracking-[0.18em] text-ink disabled:opacity-60">
          {loading ? "Checking…" : "Track"}
        </button>
      </form>

      {error && <p className="mt-6 border border-red-400/40 bg-red-500/10 px-4 py-3 text-xs text-red-200">{error}</p>}

      {order && (
        <div className="mt-10 border hairline p-8">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h2 className="font-display text-3xl">{order.orderCode}</h2>
            <span className="border border-gold/40 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-gold">
              {order.status}
            </span>
          </div>
          <p className="mt-3 text-sm text-ivory/55">
            {order.fulfillment === "pickup" ? "Pickup at Pune scent bar" : `Delivering to ${order.city}, ${order.state} ${order.pincode}`}
          </p>
          <div className="mt-6 space-y-3 border-t hairline pt-5 text-sm">
            {order.items.map((i) => (
              <div key={`${i.slug}-${i.size}`} className="flex justify-between">
                <span className="text-ivory/75">{i.name} · {i.size} × {i.qty}</span>
                <span className="text-champagne">{inr(i.price * i.qty)}</span>
              </div>
            ))}
            <div className="flex justify-between border-t hairline pt-4 font-display text-xl">
              <span>Total</span><span className="text-gold">{inr(order.total)}</span>
            </div>
          </div>
          <a
            href={waLink(`Hi SIJ Fragrances! Any update on my order ${order.orderCode}?`)}
            target="_blank"
            rel="noreferrer"
            className="mt-7 inline-block rounded-full border border-[#1fa855] px-8 py-3 text-[11px] uppercase tracking-[0.18em] text-[#5fd68f] hover:bg-[#1fa855] hover:text-white"
          >
            Ask for an update
          </a>
        </div>
      )}
    </div>
  );
}
