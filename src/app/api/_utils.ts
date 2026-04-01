import { NextResponse } from "next/server";
import { z } from "zod";

export const SearchQuerySchema = z.object({
  q: z.string().trim().optional().default(""),
  page: z.coerce.number().int().positive().optional().default(1),
  pageSize: z.coerce.number().int().min(1).max(50).optional().default(10),
  sort: z.string().trim().optional().default("relevance"),
  filter: z.string().trim().optional().default(""),
});

export function jsonOk<T>(data: T, meta?: Record<string, unknown>, fallback = false) {
  return NextResponse.json(
    { data, _fallback: fallback, meta },
    {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
        "X-RateLimit-Limit": "60",
        "X-RateLimit-Remaining": "59",
      },
    },
  );
}

export function jsonError(message: string, status = 500) {
  return NextResponse.json({ error: message }, { status });
}

export function normalizeQuery(value: string | null): string {
  return (value ?? "").trim();
}
