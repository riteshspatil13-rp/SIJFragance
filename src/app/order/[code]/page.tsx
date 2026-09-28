import Link from "next/link";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { orders } from "@/db/schema";
import { inr, site, waLink } from "@/lib/site";

export const dynamic = "force-dynamic";
export const metadata = { title: "Order Confirmed" };

type Params = Promise<{ code: string }>;

export default async function OrderPage({ params }: { params: Params }) {
  const { code } = await params;
  const rows = await db
    .select()
    .from(orders)
    .where(eq(orders.orderCode, decodeURIComponent(code).toUpperCase()))
    .limit(1);
  const order = rows[0];
  if (!order) notFound();

  const summary = order.items
    .map((i) => `• ${i.qty} × ${i.name} (${i.size}) — ${inr(i.price * i.qty)}`)
    .join("\n");

  const message = `Hi SIJ Fragrances! Confirming my order ${order.orderCode}.\n\n${summary}\n\nTotal: ${inr(
    order.total,
  )}\nName: ${order.customerName}\nPhone: ${order.phone}\nMethod: ${
    order.fulfillment === "pickup" ? "Pickup at scent bar" : "Home delivery"
  } (${order.paymentMethod.toUpperCase()})`;

  const steps = [
    { t: "Order received", d: "Just now", done: true },
    { t: "Packed & quality checked", d: "Within 24 hours", done: false },
    {
      t: order.fulfillment === "pickup" ? "Ready for pickup" : "Out for delivery",
      d: order.fulfillment === "pickup" ? "Same day, 2 hours" : "2–6 days",
      done: false,
    },
  ];

  return (
    <div className="mx-auto max-w-4xl px-5 py-16 lg:px-8 lg:py-24">
      <div className="border hairline p-10 text-center">
        <p className="text-[10px] uppercase tracking-luxe text-gold">Order confirmed</p>
        <h1 className="mt-5 font-display text-5xl font-light">Thank you, {order.customerName.split(" ")[0]}.</h1>
        <p className="mt-4 text-sm text-ivory/55">
          Your order <span className="text-champagne">{order.orderCode}</span> is confirmed. A
          consultant will message you on {order.phone} shortly.
        </p>
        <a
          href={waLink(message)}
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-block rounded-full bg-[#1fa855] px-9 py-4 text-[11px] uppercase tracking-[0.2em] text-white hover:bg-[#189c4c]"
        >
          Send order details on WhatsApp
        </a>
      </div>

      <div className="mt-10 grid gap-8 md:grid-cols-2">
        <div className="border hairline p-8">
          <h2 className="text-[10px] uppercase tracking-luxe text-gold">What happens next</h2>
          <ol className="mt-6 space-y-5">
            {steps.map((s) => (
              <li key={s.t} className="flex gap-4">
                <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${s.done ? "bg-gold" : "bg-white/20"}`} />
                <span>
                  <span className="block text-sm text-ivory/85">{s.t}</span>
                  <span className="block text-[10px] uppercase tracking-[0.14em] text-ivory/40">{s.d}</span>
                </span>
              </li>
            ))}
          </ol>
          <p className="mt-7 border-t hairline pt-5 text-xs leading-relaxed text-ivory/45">
            {order.fulfillment === "pickup"
              ? `Collect from ${site.addressLine1}, ${site.addressLine2}. Hours: ${site.hours}.`
              : `Shipping to ${order.address}, ${order.city}, ${order.state} ${order.pincode}.`}
          </p>
        </div>

        <div className="border hairline p-8">
          <h2 className="text-[10px] uppercase tracking-luxe text-gold">Your order</h2>
          <div className="mt-6 space-y-4">
            {order.items.map((i) => (
              <div key={`${i.slug}-${i.size}`} className="flex justify-between text-sm">
                <span className="text-ivory/80">
                  {i.name}
                  <span className="block text-[10px] uppercase tracking-[0.14em] text-ivory/40">
                    {i.size} × {i.qty}
                  </span>
                </span>
                <span className="text-champagne">{inr(i.price * i.qty)}</span>
              </div>
            ))}
          </div>
          <dl className="mt-6 space-y-2 border-t hairline pt-5 text-sm text-ivory/60">
            <div className="flex justify-between"><dt>Subtotal</dt><dd>{inr(order.subtotal)}</dd></div>
            <div className="flex justify-between"><dt>Shipping & extras</dt><dd>{order.shipping === 0 ? "Free" : inr(order.shipping)}</dd></div>
            {order.discount > 0 && (
              <div className="flex justify-between text-gold"><dt>Discount</dt><dd>− {inr(order.discount)}</dd></div>
            )}
            <div className="flex justify-between border-t hairline pt-3 font-display text-2xl text-ivory">
              <dt>Total</dt><dd className="text-gold">{inr(order.total)}</dd>
            </div>
          </dl>
          <p className="mt-4 text-[10px] uppercase tracking-[0.14em] text-ivory/35">
            Payment: {order.paymentMethod === "cod" ? "Cash on delivery" : order.paymentMethod.toUpperCase()}
          </p>
        </div>
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Link href="/shop" className="rounded-full border border-white/25 px-8 py-3.5 text-[11px] uppercase tracking-[0.18em] hover:border-gold hover:text-gold">
          Continue shopping
        </Link>
        <Link href="/track" className="rounded-full border border-white/25 px-8 py-3.5 text-[11px] uppercase tracking-[0.18em] hover:border-gold hover:text-gold">
          Track this order
        </Link>
      </div>
    </div>
  );
}
