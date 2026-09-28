import { and, asc, desc, eq, ilike, inArray, or, sql, type SQL } from "drizzle-orm";
import { db } from "@/db";
import { products, type Product } from "@/db/schema";
import { seedProducts } from "@/lib/catalog";

let seedPromise: Promise<void> | null = null;

async function seed() {
  const [row] = await db.select({ count: sql<number>`count(*)::int` }).from(products);
  if (row && row.count > 0) return;
  await db.insert(products).values(seedProducts).onConflictDoNothing();
}

export async function ensureSeeded() {
  if (!seedPromise) {
    seedPromise = seed().catch((err) => {
      seedPromise = null;
      throw err;
    });
  }
  return seedPromise;
}

export type ShopFilters = {
  family?: string;
  gender?: string;
  collection?: string;
  mood?: string;
  max?: number;
  q?: string;
  sort?: string;
};

export async function getProducts(filters: ShopFilters = {}): Promise<Product[]> {
  await ensureSeeded();
  const where: SQL[] = [];
  if (filters.family && filters.family !== "All") where.push(eq(products.family, filters.family));
  if (filters.gender && filters.gender !== "All") where.push(eq(products.gender, filters.gender));
  if (filters.collection && filters.collection !== "All")
    where.push(eq(products.collection, filters.collection));
  if (filters.mood && filters.mood !== "All")
    where.push(sql`${filters.mood} = ANY(${products.moods})`);
  if (filters.q) {
    const term = `%${filters.q}%`;
    const clause = or(
      ilike(products.name, term),
      ilike(products.tagline, term),
      ilike(products.family, term),
      ilike(products.description, term),
    );
    if (clause) where.push(clause);
  }
  if (filters.max) {
    where.push(
      sql`(${products.variants} -> 0 ->> 'price')::int <= ${filters.max}`,
    );
  }

  const orderBy =
    filters.sort === "price-asc"
      ? asc(sql`(${products.variants} -> 0 ->> 'price')::int`)
      : filters.sort === "price-desc"
        ? desc(sql`(${products.variants} -> 0 ->> 'price')::int`)
        : filters.sort === "rating"
          ? desc(products.rating)
          : asc(products.sortOrder);

  const query = db.select().from(products);
  const rows = where.length
    ? await query.where(and(...where)).orderBy(orderBy)
    : await query.orderBy(orderBy);
  return rows;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  await ensureSeeded();
  const rows = await db.select().from(products).where(eq(products.slug, slug)).limit(1);
  return rows[0] ?? null;
}

export async function getProductsBySlugs(slugs: string[]): Promise<Product[]> {
  await ensureSeeded();
  if (!slugs.length) return [];
  const rows = await db.select().from(products).where(inArray(products.slug, slugs));
  const order = new Map(slugs.map((s, i) => [s, i]));
  return rows.sort((a, b) => (order.get(a.slug) ?? 0) - (order.get(b.slug) ?? 0));
}

export async function getBestsellers(limit = 6): Promise<Product[]> {
  await ensureSeeded();
  return db
    .select()
    .from(products)
    .where(and(eq(products.bestseller, true), sql`${products.collection} <> 'Discovery'`))
    .orderBy(asc(products.sortOrder))
    .limit(limit);
}

export async function getFacets() {
  const all = await getProducts();
  const uniq = (values: string[]) => Array.from(new Set(values)).sort();
  return {
    families: uniq(all.map((p) => p.family)),
    genders: uniq(all.map((p) => p.gender)),
    collections: uniq(all.map((p) => p.collection)),
    moods: uniq(all.flatMap((p) => p.moods)),
  };
}
