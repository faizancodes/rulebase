import { NextRequest } from "next/server";

import { jsonError, jsonOk, normalizeQuery } from "@/app/api/_utils";

export async function GET(request: NextRequest) {
  try {
    const query = normalizeQuery(request.nextUrl.searchParams.get("q"));
    const seed = [
      { id: "sim-1", label: "Climate disclosure rule", type: "federal-register", score: 0.94, summary: "High semantic overlap with climate-related disclosure language.", url: "/entities/federal-register/sim-1" },
      { id: "sim-2", label: "House oversight hearing", type: "congress", score: 0.88, summary: "Matches committee discussion around reporting burdens.", url: "/entities/congress/sim-2" },
      { id: "sim-3", label: "10-K risk factor update", type: "sec", score: 0.84, summary: "Similar issuer disclosure language and risk framing.", url: "/entities/sec/sim-3" },
    ];

    if (!query) {
      return jsonOk(seed, { query, total: seed.length }, true);
    }

    return jsonOk(
      seed.map((item) => ({ ...item, summary: `${item.summary} Query: ${query}.` })),
      { query, total: seed.length },
      true,
    );
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Failed to load similarity results", 500);
  }
}
