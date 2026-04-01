import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import type { CongressBillDetail } from "@/lib/types";

import { jsonOk } from "../../../_utils";

const ParamsSchema = z.object({ billId: z.string().min(1) });

const SeedBill: CongressBillDetail = {
  billId: "hr-1234",
  title: "Corporate Climate Risk Disclosure Act",
  chamber: "House",
  introducedDate: "2024-01-18",
  latestAction: "Referred to Committee",
  sponsor: "Rep. Jane Doe",
  summary: "Requires standardized climate risk disclosures for public companies.",
  url: "https://www.congress.gov/bill/118th-congress/house-bill/1234",
  committees: ["Financial Services"],
  congress: 118,
  status: "In Committee",
  actions: ["Introduced", "Referred to Committee"],
  subjects: ["climate disclosure", "public companies"],
};

export async function GET(_request: NextRequest, { params }: { params: Promise<{ billId: string }> }) {
  try {
    const { billId } = await params;
    const parsed = ParamsSchema.safeParse({ billId });
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const data = parsed.data.billId === SeedBill.billId ? SeedBill : { ...SeedBill, billId: parsed.data.billId };
    return jsonOk(data, { source: "congress", query: parsed.data.billId, total: 1 });
  } catch {
    return jsonOk(SeedBill, { source: "congress", total: 1 }, true);
  }
}
