import { NextRequest } from "next/server";

import { jsonError, jsonOk } from "@/app/api/_utils";

export async function GET(_request: NextRequest) {
  try {
    return jsonOk({
      score: 72.4,
      label: "Moderate disclosure pressure",
      explanation: "Recent rulemaking and committee activity suggest a meaningful chance of risk-factor updates and comment-letter activity.",
      drivers: [
        { label: "Rule intensity", value: 7, max: 10 },
        { label: "Issuer exposure", value: 6, max: 10 },
        { label: "Comment activity", value: 8, max: 10 },
      ],
    });
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Failed to load compliance score");
  }
}
