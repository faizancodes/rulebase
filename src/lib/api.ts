import type {
  ApiResponse,
  CompareResult,
  CongressBill,
  CongressBillDetail,
  CrossReferenceInsight,
  DashboardComplianceSummary,
  DashboardCrossReferenceHighlight,
  DashboardDependencyGraph,
  DashboardSummaryStat,
  DashboardVelocityPoint,
  EntityRecord,
  EntitySummary,
  EntityTimelineItem,
  FederalRegisterDocument,
  FederalRegisterNotice,
  SecCompanyProfile,
  SecFiling,
  SimilarityResult,
} from "@/lib/types";

export async function fetchJson<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, options);
  if (!response.ok) throw new Error(`Request failed: ${response.status} ${response.statusText}`);
  return (await response.json()) as T;
}

export async function fetchFederalRegisterNotices(query = ""): Promise<ApiResponse<FederalRegisterNotice[]>> {
  return fetchJson(`/api/federal-register/search?q=${encodeURIComponent(query)}`);
}

export async function fetchCongressBills(query = ""): Promise<ApiResponse<CongressBill[]>> {
  return fetchJson(`/api/congress/search?q=${encodeURIComponent(query)}`);
}

export async function fetchSecFilings(query = ""): Promise<ApiResponse<SecFiling[]>> {
  return fetchJson(`/api/sec/search?q=${encodeURIComponent(query)}`);
}

export async function fetchDashboardSummary(): Promise<ApiResponse<DashboardSummaryStat[]>> {
  return fetchJson("/api/dashboard/summary");
}

export async function fetchDashboardVelocity(): Promise<ApiResponse<DashboardVelocityPoint[]>> {
  return fetchJson("/api/dashboard/velocity");
}

export async function fetchDashboardDependencies(): Promise<ApiResponse<DashboardDependencyGraph>> {
  return fetchJson("/api/dashboard/dependencies");
}

export async function fetchDashboardCompliance(): Promise<ApiResponse<DashboardComplianceSummary>> {
  return fetchJson("/api/dashboard/compliance");
}

export async function fetchDashboardCrossReferences(): Promise<ApiResponse<DashboardCrossReferenceHighlight[]>> {
  return fetchJson("/api/dashboard/cross-references");
}

export async function fetchFederalRegisterDocument(documentNumber: string): Promise<ApiResponse<FederalRegisterDocument>> {
  return fetchJson(`/api/federal-register/document/${encodeURIComponent(documentNumber)}`);
}

export async function fetchCongressBillDetail(billId: string): Promise<ApiResponse<CongressBillDetail>> {
  return fetchJson(`/api/congress/bill/${encodeURIComponent(billId)}`);
}

export async function fetchSecCompanyProfile(cik: string): Promise<ApiResponse<SecCompanyProfile>> {
  return fetchJson(`/api/sec/company/${encodeURIComponent(cik)}`);
}

export async function fetchCrossReferenceInsight(query = ""): Promise<ApiResponse<CrossReferenceInsight>> {
  return fetchJson(`/api/insights/cross-reference?q=${encodeURIComponent(query)}`);
}

export async function fetchComplianceScore(query = ""): Promise<ApiResponse<DashboardComplianceSummary>> {
  return fetchJson(`/api/insights/compliance-score?q=${encodeURIComponent(query)}`);
}

export async function fetchSimilarity(query = ""): Promise<ApiResponse<SimilarityResult[]>> {
  return fetchJson(`/api/embeddings/similarity?q=${encodeURIComponent(query)}`);
}

export async function fetchEntitySummary(type: string, id: string): Promise<ApiResponse<EntitySummary>> {
  return fetchJson(`/api/entities/${encodeURIComponent(type)}/${encodeURIComponent(id)}`);
}

export async function fetchEntityTimeline(type: string, id: string): Promise<ApiResponse<EntityTimelineItem[]>> {
  return fetchJson(`/api/entities/${encodeURIComponent(type)}/${encodeURIComponent(id)}/timeline`);
}

export async function fetchCompareItems(ids: string[]): Promise<ApiResponse<CompareResult>> {
  const params = new URLSearchParams();
  ids.forEach((id) => params.append("id", id));
  return fetchJson(`/api/compare?${params.toString()}`);
}

export async function fetchEntityRecord(type: string, id: string): Promise<ApiResponse<EntityRecord>> {
  return fetchJson(`/api/entities/${encodeURIComponent(type)}/${encodeURIComponent(id)}/record`);
}
