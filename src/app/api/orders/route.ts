import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { orders, type OrderItem } from "@/db/schema";
import { site } from "@/lib/site";

export const dynamic = "force-dynamic";

function code() {
  const n = Math.floor(100000 + Math.random() * 900000);
  return `SIJ-${n}`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const items = (body.items ?? []) as OrderItem[];

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Your bag is empty." }, { status: 400 });
    }
    if (!body.customerName || String(body.customerName).trim().length < 2) {
      return NextResponse.json({ error: "Please enter your full name." }, { status: 400 });
    }
    if (!/^[6-9]\d{9}$/.test(String(body.phone ?? "").replace(/\D/g, "").slice(-10))) {
      return NextResponse.json({ error: "Enter a valid 10-digit Indian mobile number." }, { status: 400 });
    }

    const fulfillment = body.fulfillment === "pickup" ? "pickup" : "delivery";
    if (fulfillment === "delivery") {
      if (!body.address || !body.city || !/^\d{6}$/.test(String(body.pincode ?? ""))) {
        return NextResponse.json(
          { error: "Please complete your address, city and 6-digit pincode." },
          { status: 400 },
        );
      }
    }

    const subtotal = items.reduce(
      (sum, i) => sum + Number(i.price) * Number(i.qty),
      0,
    );
    const giftWrap = Boolean(body.giftWrap);
    const shipping =
      fulfillment === "pickup" || subtotal >= site.freeShipAbove ? 0 : site.shippingFee;
    const wrap = giftWrap ? site.giftWrapFee : 0;
    const discount = String(body.coupon ?? "").trim().toUpperCase() === "SIJ10"
      ? Math.round(subtotal * 0.1)
      : 0;
    const total = subtotal + shipping + wrap - discount;

    const orderCode = code();
    const [row] = await db
      .insert(orders)
      .values({
        orderCode,
        customerName: String(body.customerName).trim(),
        phone: String(body.phone).replace(/\D/g, "").slice(-10),
        email: body.email ? String(body.email).trim() : null,
        fulfillment,
        address: fulfillment === "delivery" ? String(body.address) : site.addressLine1,
        city: fulfillment === "delivery" ? String(body.city) : "Pune",
        state: fulfillment === "delivery" ? String(body.state ?? "") : "Maharashtra",
        pincode: fulfillment === "delivery" ? String(body.pincode) : "411001",
        paymentMethod: ["cod", "upi", "whatsapp"].includes(body.paymentMethod)
          ? body.paymentMethod
          : "cod",
        items,
        subtotal,
        shipping: shipping + wrap,
        discount,
        total,
        giftWrap,
        notes: body.notes ? String(body.notes) : null,
        status: "confirmed",
      })
      .returning();

    return NextResponse.json({ ok: true, order: row });
  } catch (error) {
    console.error("order error", error);
    return NextResponse.json({ error: "Could not place order. Please try WhatsApp." }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const orderCode = searchParams.get("code");
  if (!orderCode) return NextResponse.json({ error: "code required" }, { status: 400 });
  const rows = await db.select().from(orders).where(eq(orders.orderCode, orderCode.toUpperCase())).limit(1);
  if (!rows.length) return NextResponse.json({ error: "Order not found" }, { status: 404 });
  return NextResponse.json({ order: rows[0] });
}
