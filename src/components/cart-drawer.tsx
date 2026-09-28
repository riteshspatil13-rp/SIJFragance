"use client";

import Link from "next/link";
import { useCart } from "@/components/cart-context";
import { inr, site } from "@/lib/site";

export function CartDrawer() {
  const { lines, drawerOpen, setDrawerOpen, setQty, remove, subtotal, shipping, total } = useCart();

  const progress = Math.min(100, Math.round((subtotal / site.freeShipAbove) * 100));

  return (
    <div
      className={`fixed inset-0 z-[60] transition ${
        drawerOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
      aria-hidden={!drawerOpen}
    >
      <div
        onClick={() => setDrawerOpen(false)}
        className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${
          drawerOpen ? "opacity-100" : "opacity-0"
        }`}
      />
      <aside
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-white/10 bg-ink-soft transition-transform duration-500 ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <h2 className="font-display text-xl tracking-wide">Your Bag</h2>
          <button
            onClick={() => setDrawerOpen(false)}
            className="text-xs uppercase tracking-[0.18em] text-ivory/60 hover:text-gold"
          >
            Close
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-5 px-8 text-center">
            <p className="font-display text-2xl text-ivory/80">Your bag is unscented.</p>
            <p className="text-sm text-ivory/50">
              Not sure where to begin? The 8 x 2ml Discovery Set is the smart first step.
            </p>
            <Link
              href="/discovery"
              onClick={() => setDrawerOpen(false)}
              className="rounded-full bg-gold px-7 py-3 text-[11px] uppercase tracking-[0.18em] text-ink"
            >
              Explore Discovery Set
            </Link>
          </div>
        ) : (
          <>
            <div className="border-b border-white/10 px-6 py-4">
              {subtotal >= site.freeShipAbove ? (
                <p className="text-[11px] uppercase tracking-[0.16em] text-gold">
                  Free shipping unlocked
                </p>
              ) : (
                <p className="text-[11px] uppercase tracking-[0.16em] text-ivory/60">
                  {inr(site.freeShipAbove - subtotal)} away from free shipping
                </p>
              )}
              <div className="mt-2 h-px w-full bg-white/10">
                <div className="h-px bg-gold transition-all" style={{ width: `${progress}%` }} />
              </div>
            </div>

            <div className="flex-1 space-y-5 overflow-y-auto px-6 py-5">
              {lines.map((l) => (
                <div key={`${l.slug}-${l.size}`} className="flex gap-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={l.image}
                    alt={l.name}
                    className="h-24 w-20 rounded-sm object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-display text-lg leading-tight">{l.name}</p>
                    <p className="text-[11px] uppercase tracking-[0.16em] text-ivory/50">
                      {l.size}
                    </p>
                    <div className="mt-2 flex items-center gap-3">
                      <div className="flex items-center border hairline">
                        <button
                          className="px-2 py-1 text-sm text-ivory/70"
                          onClick={() => setQty(l.slug, l.size, l.qty - 1)}
                        >
                          −
                        </button>
                        <span className="px-2 text-sm">{l.qty}</span>
                        <button
                          className="px-2 py-1 text-sm text-ivory/70"
                          onClick={() => setQty(l.slug, l.size, l.qty + 1)}
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => remove(l.slug, l.size)}
                        className="text-[10px] uppercase tracking-[0.16em] text-ivory/40 hover:text-gold"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-champagne">{inr(l.price * l.qty)}</p>
                </div>
              ))}
            </div>

            <div className="space-y-3 border-t border-white/10 px-6 py-5">
              <div className="flex justify-between text-sm text-ivory/70">
                <span>Subtotal</span>
                <span>{inr(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm text-ivory/70">
                <span>Shipping</span>
                <span>{shipping === 0 ? "Free" : inr(shipping)}</span>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-3 font-display text-xl">
                <span>Total</span>
                <span className="text-gold">{inr(total)}</span>
              </div>
              <Link
                href="/checkout"
                onClick={() => setDrawerOpen(false)}
                className="block rounded-full bg-gold py-3.5 text-center text-[11px] uppercase tracking-[0.2em] text-ink transition hover:bg-champagne"
              >
                Secure Checkout
              </Link>
              <Link
                href="/cart"
                onClick={() => setDrawerOpen(false)}
                className="block text-center text-[10px] uppercase tracking-[0.18em] text-ivory/50 hover:text-gold"
              >
                View full bag
              </Link>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
