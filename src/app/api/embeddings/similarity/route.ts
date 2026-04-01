import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import type { SimilarityResult } from "@/lib/types";

import { SearchQuerySchema, jsonOk, normalizeQuery } from "../../_utils";

const SeedResults: SimilarityResult[] = [
  {
    id: "sim-1",
    label: "Climate Disclosure Proposal",
    type: "federal-register",
    score: 0.96,
    summary: "Strong semantic overlap with climate and risk-factor language.",
    url: "/api/federal-register/document/2024-00001",
  },
  {
    id: "sim-2",
    label: "Corporate Climate Risk Disclosure Act",
    type: "congress",
    score: 0.89,
    summary: "Matches legislative intent around issuer disclosure obligations.",
    url: "/api/congress/bill/hr-1234",
  },
  {
    id: "sim-3",
    label: "Apple 10-K",
    type: "sec",
    score: 0.83,
    summary: "Contains related disclosure and compliance risk terminology.",
    url: "/api/sec/company/320193",
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
    const data = q ? SeedResults.filter((item) => [item.label, item.summary, item.type].some((value) => value.toLowerCase().includes(q))) : SeedResults;
    return jsonOk(data, { source: "embeddings", query: parsed.data.q, total: data.length });
  } catch {
    return jsonOk(SeedResults, { source: "embeddings", total: SeedResults.length }, true);
  }
}
