import { NextRequest } from "next/server";

import { jsonError, jsonOk } from "@/app/api/_utils";

export async function GET(_request: NextRequest) {
  try {
    return jsonOk({
      nodes: [
        { id: "epa", type: "agency", name: "EPA", count: 18, intensity: 82 },
        { id: "banking", type: "committee", name: "Senate Banking", count: 11, intensity: 64 },
        { id: "acme", type: "issuer", name: "Acme Corp", count: 7, intensity: 48 },
        { id: "energy", type: "industry", name: "Energy", count: 14, intensity: 71 },
      ],
      edges: [
        { source: "EPA", target: "Energy", weight: 8, label: "rule impact" },
        { source: "Senate Banking", target: "Acme Corp", weight: 5, label: "hearing mentions" },
        { source: "Acme Corp", target: "Energy", weight: 4, label: "risk disclosure" },
      ],
    });
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Failed to load dependency graph");
  }
}
