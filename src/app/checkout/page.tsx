"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useCart } from "@/components/cart-context";
import { inr, site } from "@/lib/site";

const states = [
  "Maharashtra", "Delhi", "Karnataka", "Tamil Nadu", "Telangana", "Gujarat", "Rajasthan",
  "Uttar Pradesh", "West Bengal", "Kerala", "Punjab", "Haryana", "Madhya Pradesh", "Other",
];

export default function CheckoutPage() {
  const { lines, subtotal, clear, ready } = useCart();
  const router = useRouter();
  const [fulfillment, setFulfillment] = useState<"delivery" | "pickup">("delivery");
  const [payment, setPayment] = useState<"cod" | "upi" | "whatsapp">("cod");
  const [giftWrap, setGiftWrap] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    customerName: "", phone: "", email: "", address: "", city: "", state: "Maharashtra",
    pincode: "", notes: "",
  });

  const totals = useMemo(() => {
    const shipping = fulfillment === "pickup" || subtotal >= site.freeShipAbove ? 0 : site.shippingFee;
    const wrap = giftWrap ? site.giftWrapFee : 0;
    const discount = coupon.trim().toUpperCase() === "SIJ10" ? Math.round(subtotal * 0.1) : 0;
    return { shipping, wrap, discount, total: subtotal + shipping + wrap - discount };
  }, [subtotal, fulfillment, giftWrap, coupon]);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function placeOrder(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, fulfillment, paymentMethod: payment, giftWrap, coupon, items: lines }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Could not place order.");
        setLoading(false);
        return;
      }
      clear();
      router.push(`/order/${data.order.orderCode}`);
    } catch {
      setError("Network issue. Please try WhatsApp ordering.");
      setLoading(false);
    }
  }

  if (ready && lines.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-24 text-center">
        <h1 className="font-display text-4xl">Your bag is empty</h1>
        <Link href="/shop" className="mt-8 inline-block rounded-full bg-gold px-8 py-3.5 text-[11px] uppercase tracking-[0.18em] text-ink">
          Shop fragrances
        </Link>
      </div>
    );
  }

  const inputCls =
    "w-full border hairline bg-transparent px-4 py-3 text-sm text-ivory placeholder:text-ivory/25 focus:border-gold focus:outline-none";

  return (
    <div className="mx-auto max-w-6xl px-5 py-14 lg:px-8 lg:py-20">
      <h1 className="font-display text-5xl font-light">Checkout</h1>
      <p className="mt-3 text-sm text-ivory/45">
        Secure, encrypted and India-wide. Prefer chat? WhatsApp {site.phoneDisplay}.
      </p>

      <form onSubmit={placeOrder} className="mt-12 grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-10">
          <section>
            <h2 className="text-[10px] uppercase tracking-luxe text-gold">01 · How to receive it</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {([
                { id: "delivery", t: "Home delivery", d: "2–6 days across India" },
                { id: "pickup", t: "Pickup at scent bar", d: "Ready in 2 hrs · Pune" },
              ] as const).map((o) => (
                <button
                  type="button"
                  key={o.id}
                  onClick={() => setFulfillment(o.id)}
                  className={`border px-5 py-4 text-left transition ${
                    fulfillment === o.id ? "border-gold bg-gold/10" : "border-white/15"
                  }`}
                >
                  <span className="block text-sm text-ivory">{o.t}</span>
                  <span className="mt-1 block text-[10px] uppercase tracking-[0.14em] text-ivory/45">{o.d}</span>
                </button>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-[10px] uppercase tracking-luxe text-gold">02 · Your details</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <input required placeholder="Full name" value={form.customerName} onChange={set("customerName")} className={inputCls} />
              <input required placeholder="10-digit mobile" value={form.phone} onChange={set("phone")} className={inputCls} />
              <input type="email" placeholder="Email (for invoice)" value={form.email} onChange={set("email")} className={`${inputCls} sm:col-span-2`} />
            </div>
          </section>

          {fulfillment === "delivery" && (
            <section>
              <h2 className="text-[10px] uppercase tracking-luxe text-gold">03 · Delivery address</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <textarea required placeholder="Flat / building / street / landmark" value={form.address} onChange={set("address")} rows={3} className={`${inputCls} sm:col-span-2`} />
                <input required placeholder="City" value={form.city} onChange={set("city")} className={inputCls} />
                <select value={form.state} onChange={set("state")} className={inputCls}>
                  {states.map((s) => <option key={s} value={s} className="bg-ink">{s}</option>)}
                </select>
                <input required placeholder="6-digit pincode" value={form.pincode} onChange={set("pincode")} className={inputCls} />
              </div>
            </section>
          )}

          <section>
            <h2 className="text-[10px] uppercase tracking-luxe text-gold">
              {fulfillment === "delivery" ? "04" : "03"} · Payment
            </h2>
            <div className="mt-4 space-y-3">
              {([
                { id: "cod", t: "Cash on delivery", d: "Pay the courier. No extra fee." },
                { id: "upi", t: "UPI / Cards / Netbanking", d: "Payment link sent on WhatsApp instantly." },
                { id: "whatsapp", t: "Confirm on WhatsApp", d: "We verify stock, then take payment." },
              ] as const).map((o) => (
                <button
                  type="button"
                  key={o.id}
                  onClick={() => setPayment(o.id)}
                  className={`flex w-full items-center justify-between border px-5 py-4 text-left transition ${
                    payment === o.id ? "border-gold bg-gold/10" : "border-white/15"
                  }`}
                >
                  <span>
                    <span className="block text-sm text-ivory">{o.t}</span>
                    <span className="mt-1 block text-[10px] uppercase tracking-[0.14em] text-ivory/45">{o.d}</span>
                  </span>
                  <span className={`h-3 w-3 rounded-full border ${payment === o.id ? "border-gold bg-gold" : "border-white/30"}`} />
                </button>
              ))}
            </div>
            <label className="mt-5 flex items-center gap-3 text-sm text-ivory/65">
              <input type="checkbox" checked={giftWrap} onChange={(e) => setGiftWrap(e.target.checked)} className="h-4 w-4 accent-[#c9a227]" />
              Add luxury gift wrap with a handwritten note (+{inr(site.giftWrapFee)})
            </label>
            <textarea placeholder="Gift note or delivery instructions (optional)" value={form.notes} onChange={set("notes")} rows={2} className={`${inputCls} mt-4`} />
          </section>
        </div>

        <aside className="h-fit border hairline p-8 lg:sticky lg:top-28">
          <h2 className="font-display text-2xl">Order Summary</h2>
          <div className="mt-5 space-y-4 border-b hairline pb-5">
            {lines.map((l) => (
              <div key={`${l.slug}-${l.size}`} className="flex gap-3 text-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={l.image} alt={l.name} className="h-16 w-14 object-cover" />
                <div className="flex-1">
                  <p className="text-ivory/85">{l.name}</p>
                  <p className="text-[10px] uppercase tracking-[0.14em] text-ivory/40">{l.size} × {l.qty}</p>
                </div>
                <p className="text-champagne">{inr(l.price * l.qty)}</p>
              </div>
            ))}
          </div>

          <div className="mt-5 flex gap-2">
            <input
              placeholder="Coupon (try SIJ10)"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              className="w-full border hairline bg-transparent px-3 py-2.5 text-xs uppercase tracking-[0.12em] focus:border-gold focus:outline-none"
            />
          </div>

          <dl className="mt-5 space-y-3 text-sm text-ivory/65">
            <div className="flex justify-between"><dt>Subtotal</dt><dd>{inr(subtotal)}</dd></div>
            <div className="flex justify-between"><dt>Shipping</dt><dd>{totals.shipping === 0 ? "Free" : inr(totals.shipping)}</dd></div>
            {totals.wrap > 0 && <div className="flex justify-between"><dt>Gift wrap</dt><dd>{inr(totals.wrap)}</dd></div>}
            {totals.discount > 0 && (
              <div className="flex justify-between text-gold"><dt>Discount (SIJ10)</dt><dd>− {inr(totals.discount)}</dd></div>
            )}
            <div className="flex justify-between border-t hairline pt-4 font-display text-2xl text-ivory">
              <dt>Total</dt><dd className="text-gold">{inr(totals.total)}</dd>
            </div>
          </dl>

          {error && <p className="mt-5 border border-red-400/40 bg-red-500/10 px-4 py-3 text-xs text-red-200">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-full bg-gold py-4 text-[11px] uppercase tracking-[0.2em] text-ink transition hover:bg-champagne disabled:opacity-60"
          >
            {loading ? "Placing order…" : `Place order · ${inr(totals.total)}`}
          </button>
          <p className="mt-4 text-center text-[10px] uppercase tracking-[0.14em] text-ivory/35">
            7-day returns on unopened bottles
          </p>
        </aside>
      </form>
    </div>
  );
}
