"use client";

import Link from "next/link";
import { useCart } from "@/components/cart-context";
import { inr, site } from "@/lib/site";

export default function CartPage() {
  const { lines, setQty, remove, subtotal, shipping, total, ready } = useCart();

  return (
    <div className="mx-auto max-w-6xl px-5 py-14 lg:px-8 lg:py-20">
      <h1 className="font-display text-5xl font-light">Your Bag</h1>

      {!ready ? (
        <p className="mt-10 text-sm text-ivory/40">Loading…</p>
      ) : lines.length === 0 ? (
        <div className="mt-12 border hairline p-14 text-center">
          <p className="font-display text-3xl">Nothing here yet.</p>
          <p className="mt-3 text-sm text-ivory/50">
            Begin with the Discovery Set — eight 2 ml atomisers and a ₹500 voucher.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/discovery" className="rounded-full bg-gold px-8 py-3.5 text-[11px] uppercase tracking-[0.18em] text-ink">
              Discovery Set
            </Link>
            <Link href="/shop" className="rounded-full border border-white/25 px-8 py-3.5 text-[11px] uppercase tracking-[0.18em]">
              Shop all
            </Link>
          </div>
        </div>
      ) : (
        <div className="mt-12 grid gap-12 lg:grid-cols-[1.6fr_1fr]">
          <div className="divide-y divide-white/10 border-y hairline">
            {lines.map((l) => (
              <div key={`${l.slug}-${l.size}`} className="flex gap-5 py-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={l.image} alt={l.name} className="h-32 w-[104px] object-cover" />
                <div className="flex-1">
                  <Link href={`/product/${l.slug}`} className="font-display text-2xl hover:text-gold">
                    {l.name}
                  </Link>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-ivory/45">{l.size}</p>
                  <div className="mt-4 flex items-center gap-4">
                    <div className="flex items-center border hairline">
                      <button className="px-3 py-1.5 text-ivory/70" onClick={() => setQty(l.slug, l.size, l.qty - 1)}>−</button>
                      <span className="px-3 text-sm">{l.qty}</span>
                      <button className="px-3 py-1.5 text-ivory/70" onClick={() => setQty(l.slug, l.size, l.qty + 1)}>+</button>
                    </div>
                    <button
                      onClick={() => remove(l.slug, l.size)}
                      className="text-[10px] uppercase tracking-[0.16em] text-ivory/40 hover:text-gold"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <p className="font-display text-xl text-champagne">{inr(l.price * l.qty)}</p>
              </div>
            ))}
          </div>

          <aside className="h-fit border hairline p-8">
            <h2 className="font-display text-2xl">Order Summary</h2>
            <dl className="mt-6 space-y-3 text-sm text-ivory/65">
              <div className="flex justify-between"><dt>Subtotal</dt><dd>{inr(subtotal)}</dd></div>
              <div className="flex justify-between">
                <dt>Shipping</dt>
                <dd>{shipping === 0 ? "Free" : inr(shipping)}</dd>
              </div>
              <div className="flex justify-between border-t hairline pt-4 font-display text-2xl text-ivory">
                <dt>Total</dt><dd className="text-gold">{inr(total)}</dd>
              </div>
            </dl>
            <Link
              href="/checkout"
              className="mt-7 block rounded-full bg-gold py-4 text-center text-[11px] uppercase tracking-[0.2em] text-ink hover:bg-champagne"
            >
              Proceed to Checkout
            </Link>
            <p className="mt-4 text-center text-[10px] uppercase tracking-[0.14em] text-ivory/35">
              COD · UPI · Cards · Pickup in Pune
            </p>
            <p className="mt-6 border-t hairline pt-5 text-xs leading-relaxed text-ivory/45">
              Need help before you buy? WhatsApp us at {site.phoneDisplay} — we reply in minutes.
            </p>
          </aside>
        </div>
      )}
    </div>
  );
}
