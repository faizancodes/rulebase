import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import type { SecCompanyProfile } from "@/lib/types";

import { jsonOk } from "../../../_utils";

const ParamsSchema = z.object({ cik: z.string().min(1) });

const SeedCompany: SecCompanyProfile = {
  cik: "320193",
  companyName: "Apple Inc.",
  ticker: "AAPL",
  sic: "3571",
  industry: "Technology",
  filings: [
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
  ],
};

export async function GET(_request: NextRequest, { params }: { params: Promise<{ cik: string }> }) {
  try {
    const { cik } = await params;
    const parsed = ParamsSchema.safeParse({ cik });
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const data = parsed.data.cik === SeedCompany.cik ? SeedCompany : { ...SeedCompany, cik: parsed.data.cik };
    return jsonOk(data, { source: "sec", query: parsed.data.cik, total: 1 });
  } catch {
    return jsonOk(SeedCompany, { source: "sec", total: 1 }, true);
  }
}
