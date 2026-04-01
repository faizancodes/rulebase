import { NextRequest } from "next/server";

import { jsonError, jsonOk } from "@/app/api/_utils";

export async function GET(_request: NextRequest) {
  try {
    return jsonOk([
      {
        id: "xref-1",
        sourceType: "federal-register",
        sourceLabel: "EPA proposal",
        targetType: "sec",
        targetLabel: "10-K risk factor",
        relevanceScore: 91,
        rationale: "The proposal aligns with new disclosure language around compliance costs and operational changes.",
        matchedTerms: ["compliance costs", "operational changes"],
      },
      {
        id: "xref-2",
        sourceType: "congress",
        sourceLabel: "Committee hearing",
        targetType: "federal-register",
        targetLabel: "FTC notice",
        relevanceScore: 84,
        rationale: "Hearing testimony references the same market structure concerns raised in the notice.",
        matchedTerms: ["market structure", "testimony"],
      },
    ]);
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Failed to load cross references");
  }
}
