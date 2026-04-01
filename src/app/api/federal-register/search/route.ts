import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import type { FederalRegisterNotice } from "@/lib/types";

import { SearchQuerySchema, jsonOk, normalizeQuery } from "../../_utils";

const SeedNotices: FederalRegisterNotice[] = [
  {
    documentNumber: "2024-00001",
    title: "Climate-Related Disclosure Enhancement Proposal",
    agency: "Securities and Exchange Commission",
    publicationDate: "2024-01-12",
    commentDeadline: "2024-03-15",
    abstract: "Proposes expanded climate-related disclosure requirements for public issuers.",
    url: "https://www.federalregister.gov/documents/2024/01/12/2024-00001",
    actionType: "Proposed Rule",
    topics: ["climate", "disclosure", "risk factors"],
  },
  {
    documentNumber: "2024-00002",
    title: "Cybersecurity Incident Reporting Standards",
    agency: "Department of Homeland Security",
    publicationDate: "2024-02-08",
    commentDeadline: "2024-04-10",
    abstract: "Establishes incident reporting timelines and minimum disclosure expectations.",
    url: "https://www.federalregister.gov/documents/2024/02/08/2024-00002",
    actionType: "Final Rule",
    topics: ["cybersecurity", "incident reporting", "compliance"],
  },
  {
    documentNumber: "2024-00003",
    title: "AI Governance and Model Risk Management",
    agency: "Office of Management and Budget",
    publicationDate: "2024-03-01",
    commentDeadline: "2024-05-01",
    abstract: "Seeks public comment on governance controls for high-impact AI systems.",
    url: "https://www.federalregister.gov/documents/2024/03/01/2024-00003",
    actionType: "Request for Comment",
    topics: ["ai", "governance", "model risk"],
  },
];

function buildNotices(query: string): FederalRegisterNotice[] {
  if (!query) return SeedNotices;
  const q = query.toLowerCase();
  return SeedNotices.filter((notice) =>
    [notice.title, notice.agency, notice.abstract, notice.actionType, ...notice.topics].some((value) =>
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

    const data = buildNotices(parsed.data.q);
    return jsonOk(data, {
      source: "federal-register",
      query: parsed.data.q,
      total: data.length,
      page: parsed.data.page,
      pageSize: parsed.data.pageSize,
      nextPage: null,
    });
  } catch {
    return jsonOk(SeedNotices, { source: "federal-register", total: SeedNotices.length }, true);
  }
}
