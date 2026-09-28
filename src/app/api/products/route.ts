import { NextResponse } from "next/server";
import { getProducts } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const products = await getProducts({
    family: searchParams.get("family") ?? undefined,
    gender: searchParams.get("gender") ?? undefined,
    collection: searchParams.get("collection") ?? undefined,
    mood: searchParams.get("mood") ?? undefined,
    q: searchParams.get("q") ?? undefined,
    sort: searchParams.get("sort") ?? undefined,
    max: searchParams.get("max") ? Number(searchParams.get("max")) : undefined,
  });
  return NextResponse.json({ count: products.length, products });
}
