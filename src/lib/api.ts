import type {
  ApiResponse,
  CongressBill,
  CongressBillDetail,
  CrossReferenceInsight,
  DashboardComplianceSummary,
  DashboardCrossReferenceHighlight,
  DashboardDependencyGraph,
  DashboardSummaryStat,
  DashboardVelocityPoint,
  FederalRegisterDocument,
  FederalRegisterNotice,
  SecCompanyProfile,
  SecFiling,
  SimilarityResult,
} from "@/lib/types";

export async function fetchJson<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status} ${response.statusText}`);
  }
  return (await response.json()) as T;
}

export async function fetchFederalRegisterNotices(query = ""): Promise<ApiResponse<FederalRegisterNotice[]>> {
  return fetchJson<ApiResponse<FederalRegisterNotice[]>>(
    `/api/federal-register/search?q=${encodeURIComponent(query)}`,
  );
}

export async function fetchCongressBills(query = ""): Promise<ApiResponse<CongressBill[]>> {
  return fetchJson<ApiResponse<CongressBill[]>>(`/api/congress/search?q=${encodeURIComponent(query)}`);
}

export async function fetchSecFilings(query = ""): Promise<ApiResponse<SecFiling[]>> {
  return fetchJson<ApiResponse<SecFiling[]>>(`/api/sec/search?q=${encodeURIComponent(query)}`);
}

export async function fetchDashboardSummary(): Promise<ApiResponse<DashboardSummaryStat[]>> {
  return fetchJson<ApiResponse<DashboardSummaryStat[]>>("/api/dashboard/summary");
}

export async function fetchDashboardVelocity(): Promise<ApiResponse<DashboardVelocityPoint[]>> {
  return fetchJson<ApiResponse<DashboardVelocityPoint[]>>("/api/dashboard/velocity");
}

export async function fetchDashboardDependencies(): Promise<ApiResponse<DashboardDependencyGraph>> {
  return fetchJson<ApiResponse<DashboardDependencyGraph>>("/api/dashboard/dependencies");
}

export async function fetchDashboardCompliance(): Promise<ApiResponse<DashboardComplianceSummary>> {
  return fetchJson<ApiResponse<DashboardComplianceSummary>>("/api/dashboard/compliance");
}

export async function fetchDashboardCrossReferences(): Promise<ApiResponse<DashboardCrossReferenceHighlight[]>> {
  return fetchJson<ApiResponse<DashboardCrossReferenceHighlight[]>>("/api/dashboard/cross-references");
}

export async function fetchFederalRegisterDocument(documentNumber: string): Promise<ApiResponse<FederalRegisterDocument>> {
  return fetchJson<ApiResponse<FederalRegisterDocument>>(`/api/federal-register/document/${encodeURIComponent(documentNumber)}`);
}

export async function fetchCongressBillDetail(billId: string): Promise<ApiResponse<CongressBillDetail>> {
  return fetchJson<ApiResponse<CongressBillDetail>>(`/api/congress/bill/${encodeURIComponent(billId)}`);
}

export async function fetchSecCompanyProfile(cik: string): Promise<ApiResponse<SecCompanyProfile>> {
  return fetchJson<ApiResponse<SecCompanyProfile>>(`/api/sec/company/${encodeURIComponent(cik)}`);
}

export async function fetchCrossReferenceInsight(query = ""): Promise<ApiResponse<CrossReferenceInsight>> {
  return fetchJson<ApiResponse<CrossReferenceInsight>>(`/api/insights/cross-reference?q=${encodeURIComponent(query)}`);
}

export async function fetchComplianceScore(query = ""): Promise<ApiResponse<DashboardComplianceSummary>> {
  return fetchJson<ApiResponse<DashboardComplianceSummary>>(`/api/insights/compliance-score?q=${encodeURIComponent(query)}`);
}

export async function fetchSimilarity(query = ""): Promise<ApiResponse<SimilarityResult[]>> {
  return fetchJson<ApiResponse<SimilarityResult[]>>(`/api/embeddings/similarity?q=${encodeURIComponent(query)}`);
}
