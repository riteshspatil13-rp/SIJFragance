import { NextResponse } from "next/server";
import { db } from "@/db";
import { subscribers } from "@/db/schema";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const { email, source } = await request.json();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email))) {
      return NextResponse.json({ error: "Enter a valid email." }, { status: 400 });
    }
    await db
      .insert(subscribers)
      .values({ email: String(email).toLowerCase().trim(), source: String(source ?? "footer") })
      .onConflictDoNothing();
    return NextResponse.json({ ok: true, code: "SIJ10" });
  } catch (error) {
    console.error("newsletter error", error);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
