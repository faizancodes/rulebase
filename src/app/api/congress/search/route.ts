import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import type { CongressBill } from "@/lib/types";

import { SearchQuerySchema, jsonOk, normalizeQuery } from "../../_utils";

const SeedBills: CongressBill[] = [
  {
    billId: "hr-1234",
    title: "Corporate Climate Risk Disclosure Act",
    chamber: "House",
    introducedDate: "2024-01-18",
    latestAction: "Referred to Committee",
    sponsor: "Rep. Jane Doe",
    summary: "Requires standardized climate risk disclosures for public companies.",
    url: "https://www.congress.gov/bill/118th-congress/house-bill/1234",
    committees: ["Financial Services"],
  },
  {
    billId: "s-567",
    title: "Cyber Incident Reporting Modernization Act",
    chamber: "Senate",
    introducedDate: "2024-02-02",
    latestAction: "Placed on Calendar",
    sponsor: "Sen. John Smith",
    summary: "Updates federal cyber incident reporting timelines and coordination.",
    url: "https://www.congress.gov/bill/118th-congress/senate-bill/567",
    committees: ["Homeland Security"],
  },
  {
    billId: "hr-890",
    title: "AI Accountability and Transparency Act",
    chamber: "House",
    introducedDate: "2024-03-11",
    latestAction: "Committee Hearings Held",
    sponsor: "Rep. Alex Lee",
    summary: "Creates governance and disclosure obligations for high-impact AI systems.",
    url: "https://www.congress.gov/bill/118th-congress/house-bill/890",
    committees: ["Energy and Commerce"],
  },
];

function buildBills(query: string): CongressBill[] {
  if (!query) return SeedBills;
  const q = query.toLowerCase();
  return SeedBills.filter((bill) =>
    [bill.title, bill.summary, bill.sponsor, bill.chamber, ...bill.committees].some((value) =>
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

    const data = buildBills(parsed.data.q);
    return jsonOk(data, { source: "congress", query: parsed.data.q, total: data.length });
  } catch {
    return jsonOk(SeedBills, { source: "congress", total: SeedBills.length }, true);
  }
}
