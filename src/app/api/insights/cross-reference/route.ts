import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import type { CrossReferenceInsight } from "@/lib/types";

import { SearchQuerySchema, jsonOk, normalizeQuery } from "../../_utils";

const SeedInsights: CrossReferenceInsight[] = [
  {
    id: "xref-1",
    sourceType: "federal-register",
    sourceId: "2024-00001",
    targetType: "issuer",
    targetId: "320193",
    targetName: "Apple Inc.",
    relevanceScore: 0.92,
    rationale: "Climate disclosure language aligns with issuer risk-factor updates.",
    matchedTerms: ["climate", "disclosure", "risk factors"],
    impact: "High",
  },
  {
    id: "xref-2",
    sourceType: "congress",
    sourceId: "hr-1234",
    targetType: "industry",
    targetId: "technology",
    targetName: "Technology",
    relevanceScore: 0.84,
    rationale: "Bill text references public-company reporting obligations in technology sectors.",
    matchedTerms: ["reporting", "public companies"],
    impact: "Medium",
  },
  {
    id: "xref-3",
    sourceType: "sec",
    sourceId: "0000789019-24-000015",
    targetType: "keyword",
    targetId: "cybersecurity",
    targetName: "Cybersecurity",
    relevanceScore: 0.88,
    rationale: "8-K disclosure language mirrors federal incident reporting proposals.",
    matchedTerms: ["cybersecurity", "incident reporting"],
    impact: "High",
  },
];

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const parsed = SearchQuerySchema.safeParse({
      q: normalizeQuery(url.searchParams.get("q")),
      page: url.searchParams.get("page") ?? undefined,
      pageSize: url.searchParams.get("pageSize") ?? undefined,
      sort: url.searchParams.get("sort") ?? undefined,
      filter: url.searchParams.get("filter") ?? undefined,
    });

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const q = parsed.data.q.toLowerCase();
    const data = q
      ? SeedInsights.filter((item) =>
          [item.targetName, item.rationale, item.impact, ...item.matchedTerms].some((value) => value.toLowerCase().includes(q)),
        )
      : SeedInsights;

    return jsonOk(data, { source: "insights", query: parsed.data.q, total: data.length });
  } catch {
    return jsonOk(SeedInsights, { source: "insights", total: SeedInsights.length }, true);
  }
}
