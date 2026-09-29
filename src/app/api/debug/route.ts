import { NextResponse } from "next/server";

export async function GET() {
  const url = process.env.DATABASE_URL;
  
  if (!url) {
    return NextResponse.json({ 
      status: "MISSING", 
      message: "DATABASE_URL is not set at all!" 
    });
  }

  return NextResponse.json({
    status: "FOUND",
    length: url.length,
    startsWithPostgres: url.startsWith("postgres"),
    hasSquareBrackets: url.includes("["),
    hasQuotes: url.includes('"'),
    first20Chars: url.substring(0, 20),
    last15Chars: url.substring(url.length - 15),
  });
}
