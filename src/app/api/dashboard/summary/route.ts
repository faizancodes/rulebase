import { NextRequest } from "next/server";

import { jsonError, jsonOk } from "@/app/api/_utils";

export async function GET(_request: NextRequest) {
  try {
    return jsonOk([
      { label: "Federal Register notices", value: "128", delta: "+12% vs last week", tone: "positive" },
      { label: "Active bills", value: "34", delta: "+5 new actions", tone: "neutral" },
      { label: "SEC filings", value: "91", delta: "3 risk updates", tone: "warning" },
      { label: "Cross-links", value: "57", delta: "+18% relevance", tone: "positive" },
    ]);
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Failed to load dashboard summary");
  }
}
