import { NextRequest } from "next/server";

import { jsonError, jsonOk } from "@/app/api/_utils";

export async function GET(_request: NextRequest) {
  try {
    return jsonOk([
      { label: "Mon", value: 12, date: "2026-03-23", source: "federal-register" },
      { label: "Tue", value: 18, date: "2026-03-24", source: "congress" },
      { label: "Wed", value: 9, date: "2026-03-25", source: "sec" },
      { label: "Thu", value: 22, date: "2026-03-26", source: "federal-register" },
      { label: "Fri", value: 16, date: "2026-03-27", source: "congress" },
    ]);
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Failed to load velocity data");
  }
}
