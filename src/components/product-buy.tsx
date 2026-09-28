"use client";

import { useState } from "react";
import { useCart } from "@/components/cart-context";
import type { Product } from "@/db/schema";
import { inr, waLink } from "@/lib/site";

export function ProductBuy({ product }: { product: Product }) {
  const { add } = useCart();
  const [variantIdx, setVariantIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const v = product.variants[variantIdx];
  const off = Math.round(((v.mrp - v.price) / v.mrp) * 100);

  return (
    <div className="space-y-7">
      <div>
        <p className="text-[10px] uppercase tracking-[0.18em] text-ivory/40">Choose your size</p>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {product.variants.map((opt, i) => (
            <button
              key={opt.sku}
              onClick={() => setVariantIdx(i)}
              className={`border px-4 py-3 text-left transition ${
                i === variantIdx
                  ? "border-gold bg-gold/10"
                  : "border-white/15 hover:border-white/40"
              }`}
            >
              <span className="block text-[10px] uppercase tracking-[0.14em] text-ivory/60">
                {opt.size}
              </span>
              <span className="mt-1 block text-sm text-ivory">{inr(opt.price)}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-baseline gap-3">
        <span className="font-display text-4xl text-gold">{inr(v.price * qty)}</span>
        <span className="text-sm text-ivory/35 line-through">{inr(v.mrp * qty)}</span>
        {off > 0 && (
          <span className="bg-gold px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-ink">
            Save {off}%
          </span>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center border hairline">
          <button className="px-4 py-3 text-ivory/70" onClick={() => setQty(Math.max(1, qty - 1))}>
            −
          </button>
          <span className="w-8 text-center text-sm">{qty}</span>
          <button className="px-4 py-3 text-ivory/70" onClick={() => setQty(qty + 1)}>
            +
          </button>
        </div>
        <button
          onClick={() =>
            add({
              productId: product.id,
              slug: product.slug,
              name: product.name,
              size: v.size,
              price: v.price,
              qty,
              image: product.imageUrl,
            })
          }
          className="flex-1 rounded-full bg-gold px-8 py-4 text-[11px] uppercase tracking-[0.2em] text-ink transition hover:bg-champagne"
        >
          Add to Bag
        </button>
      </div>

      <a
        href={waLink(
          `Hi SIJ Fragrances! I'd like to order ${qty} x ${product.name} (${v.size}) — ${inr(
            v.price * qty,
          )}. Is it in stock?`,
        )}
        target="_blank"
        rel="noreferrer"
        className="flex items-center justify-center gap-3 rounded-full border border-[#1fa855] py-4 text-[11px] uppercase tracking-[0.18em] text-[#5fd68f] transition hover:bg-[#1fa855] hover:text-white"
      >
        Order this on WhatsApp
      </a>

      <ul className="grid gap-2 border-t hairline pt-6 text-xs text-ivory/45 sm:grid-cols-2">
        <li>✓ Free shipping above ₹999</li>
        <li>✓ Cash on delivery available</li>
        <li>✓ Dispatched in 24 hours</li>
        <li>✓ Pickup in Pune — ready in 2 hrs</li>
      </ul>
    </div>
  );
}
