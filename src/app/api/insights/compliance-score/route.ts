import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import type { ComplianceImpactScore } from "@/lib/types";

import { SearchQuerySchema, jsonOk, normalizeQuery } from "../../_utils";

const SeedScore: ComplianceImpactScore = {
  score: 87,
  label: "High",
  drivers: ["Disclosure overlap", "Comment-letter activity", "Issuer exposure"],
  explanation: "The proposal is likely to affect public-company disclosures and near-term compliance workflows.",
};

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

    const score = parsed.data.q.toLowerCase().includes("cyber") ? 91 : SeedScore.score;
    return jsonOk({ ...SeedScore, score }, { source: "insights", query: parsed.data.q, total: 1 });
  } catch {
    return jsonOk(SeedScore, { source: "insights", total: 1 }, true);
  }
}
