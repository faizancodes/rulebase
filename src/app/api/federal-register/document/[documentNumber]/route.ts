import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import type { FederalRegisterDocument } from "@/lib/types";

import { jsonOk } from "../../../_utils";

const ParamsSchema = z.object({ documentNumber: z.string().min(1) });

const SeedDocument: FederalRegisterDocument = {
  documentNumber: "2024-00001",
  title: "Climate-Related Disclosure Enhancement Proposal",
  agency: "Securities and Exchange Commission",
  publicationDate: "2024-01-12",
  commentDeadline: "2024-03-15",
  abstract: "Proposes expanded climate-related disclosure requirements for public issuers.",
  url: "https://www.federalregister.gov/documents/2024/01/12/2024-00001",
  actionType: "Proposed Rule",
  topics: ["climate", "disclosure", "risk factors"],
  documentType: "Proposed Rule",
  agencies: ["Securities and Exchange Commission"],
  effectiveDate: "2024-06-01",
  htmlUrl: "https://www.federalregister.gov/documents/2024/01/12/2024-00001/html",
};

export async function GET(_request: NextRequest, { params }: { params: Promise<{ documentNumber: string }> }) {
  try {
    const { documentNumber } = await params;
    const parsed = ParamsSchema.safeParse({ documentNumber });
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const data = parsed.data.documentNumber === SeedDocument.documentNumber ? SeedDocument : { ...SeedDocument, documentNumber: parsed.data.documentNumber };
    return jsonOk(data, { source: "federal-register", query: parsed.data.documentNumber, total: 1 });
  } catch {
    return jsonOk(SeedDocument, { source: "federal-register", total: 1 }, true);
  }
}
