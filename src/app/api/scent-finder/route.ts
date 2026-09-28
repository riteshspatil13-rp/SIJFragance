import { NextResponse } from "next/server";
import { db } from "@/db";
import { quizResults } from "@/db/schema";
import { getProducts } from "@/lib/data";

export const dynamic = "force-dynamic";

type Answers = {
  vibe?: string;
  moment?: string;
  strength?: string;
  format?: string;
  budget?: string;
};

const vibeMap: Record<string, string[]> = {
  warm: ["Woody Oriental", "Amber Spicy", "Amber", "Leather"],
  fresh: ["Citrus Aromatic", "Aquatic", "Earthy"],
  floral: ["Floral", "White Floral"],
  sweet: ["Gourmand", "Amber"],
  woody: ["Woody", "Woody Musk", "Woody Oriental"],
};

const momentMap: Record<string, string[]> = {
  office: ["Office", "Daily"],
  date: ["Date Night", "Evening"],
  wedding: ["Wedding", "Festive"],
  daily: ["Daily", "Casual", "College"],
  gift: ["Gifting"],
};

export async function POST(request: Request) {
  const answers = (await request.json()) as Answers;
  const all = await getProducts();

  const scored = all
    .filter((p) => p.collection !== "Discovery")
    .map((p) => {
      let score = 0;
      const families = vibeMap[answers.vibe ?? ""] ?? [];
      if (families.some((f) => p.family.includes(f) || f.includes(p.family))) score += 5;

      const occasions = momentMap[answers.moment ?? ""] ?? [];
      if (occasions.some((o) => p.occasions.includes(o))) score += 4;

      if (answers.strength === "subtle" && p.sillage <= 3) score += 3;
      if (answers.strength === "balanced" && p.sillage === 3) score += 3;
      if (answers.strength === "bold" && p.sillage >= 4) score += 3;

      if (answers.format === "attar" && p.concentration.toLowerCase().includes("attar")) score += 4;
      if (answers.format === "spray" && !p.concentration.toLowerCase().includes("attar")) score += 2;

      const price = p.variants[0].price;
      if (answers.budget === "under1000" && price <= 1000) score += 3;
      if (answers.budget === "1000to2500" && price > 500 && price <= 2500) score += 3;
      if (answers.budget === "premium" && price >= 1200) score += 3;

      score += Number(p.rating);
      return { p, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  const recommendedSlugs = scored.map((s) => s.p.slug);

  try {
    await db.insert(quizResults).values({
      answers: (answers ?? {}) as Record<string, string>,
      recommendedSlugs,
    });
  } catch (error) {
    console.error("quiz log error", error);
  }

  return NextResponse.json({ products: scored.map((s) => s.p) });
}
