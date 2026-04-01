import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import type { SecFiling } from "@/lib/types";

import { SearchQuerySchema, jsonOk, normalizeQuery } from "../../_utils";

const SeedFilings: SecFiling[] = [
  {
    accessionNumber: "0000320193-24-000010",
    cik: "320193",
    companyName: "Apple Inc.",
    formType: "10-K",
    filingDate: "2024-02-01",
    description: "Annual report highlighting supply chain, privacy, and regulatory risks.",
    url: "https://www.sec.gov/Archives/edgar/data/320193/000032019324000010/a10-k2023.htm",
    industry: "Technology",
    riskFlags: ["supply chain", "privacy", "regulation"],
  },
  {
    accessionNumber: "0000789019-24-000015",
    cik: "789019",
    companyName: "Microsoft Corporation",
    formType: "8-K",
    filingDate: "2024-02-14",
    description: "Current report discussing cybersecurity incident response and disclosure controls.",
    url: "https://www.sec.gov/Archives/edgar/data/789019/000078901924000015/msft-8k.htm",
    industry: "Technology",
    riskFlags: ["cybersecurity", "disclosure controls"],
  },
  {
    accessionNumber: "0001652044-24-000021",
    cik: "1652044",
    companyName: "Tesla, Inc.",
    formType: "10-Q",
    filingDate: "2024-03-05",
    description: "Quarterly report with manufacturing, regulatory, and litigation risk updates.",
    url: "https://www.sec.gov/Archives/edgar/data/1652044/000165204424000021/tsla-10q.htm",
    industry: "Automotive",
    riskFlags: ["manufacturing", "litigation", "regulatory"],
  },
];

function buildFilings(query: string): SecFiling[] {
  if (!query) return SeedFilings;
  const q = query.toLowerCase();
  return SeedFilings.filter((filing) =>
    [filing.companyName, filing.formType, filing.description, filing.industry, ...filing.riskFlags].some((value) =>
      value.toLowerCase().includes(q),
    ),
  );
}

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

    const data = buildFilings(parsed.data.q);
    return jsonOk(data, { source: "sec", query: parsed.data.q, total: data.length });
  } catch {
    return jsonOk(SeedFilings, { source: "sec", total: SeedFilings.length }, true);
  }
}
