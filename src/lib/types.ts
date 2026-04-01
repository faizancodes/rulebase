export interface SourceCoverageStat {
  label: string;
  value: string;
  description: string;
}

export interface FederalRegisterNotice {
  documentNumber: string;
  title: string;
  agency: string;
  publicationDate: string;
  commentDeadline: string;
  abstract: string;
  url: string;
  actionType: string;
  topics: string[];
}

export interface CongressBill {
  billId: string;
  title: string;
  chamber: string;
  introducedDate: string;
  latestAction: string;
  sponsor: string;
  summary: string;
  url: string;
  committees: string[];
}

export interface SecFiling {
  accessionNumber: string;
  cik: string;
  companyName: string;
  formType: string;
  filingDate: string;
  description: string;
  url: string;
  industry: string;
  riskFlags: string[];
}

export interface CrossReferenceRecord {
  id: string;
  sourceType: "federal-register" | "congress" | "sec";
  sourceId: string;
  targetType: "agency" | "committee" | "issuer" | "industry" | "keyword";
  targetId: string;
  targetName: string;
  relevanceScore: number;
  rationale: string;
  matchedTerms: string[];
}

export interface AlertRule {
  id: string;
  name: string;
  query: string;
  sources: string[];
  isActive: boolean;
  createdAt: string;
}

export interface AlertItem {
  id: string;
  title: string;
  message: string;
  severity: "info" | "warning" | "error" | "success";
  createdAt: string;
  read: boolean;
}

export interface EntityRecord {
  id: string;
  type: "agency" | "committee" | "issuer" | "industry" | "keyword";
  name: string;
  description: string;
  relatedCount: number;
  lastUpdated: string;
}

export interface TimelinePoint {
  label: string;
  value: number;
  date: string;
}

export interface ChartSeries {
  name: string;
  points: TimelinePoint[];
}

export interface ComplianceImpactScore {
  score: number;
  label: string;
  drivers: string[];
  explanation: string;
}

export interface ApiResponse<T> {
  data: T;
  _fallback?: boolean;
  meta?: ApiResponseMeta;
}

export interface ApiResponseMeta {
  source?: string;
  query?: string;
  total?: number;
  page?: number;
  pageSize?: number;
  nextPage?: number | null;
  cached?: boolean;
  rateLimited?: boolean;
}

export interface SearchParams {
  q?: string;
  page?: number;
  pageSize?: number;
  sort?: string;
  filter?: string;
}

export interface FederalRegisterDocument extends FederalRegisterNotice {
  documentType: string;
  agencies: string[];
  effectiveDate: string;
  htmlUrl: string;
}

export interface CongressBillDetail extends CongressBill {
  congress: number;
  status: string;
  actions: string[];
  subjects: string[];
}

export interface SecCompanyProfile {
  cik: string;
  companyName: string;
  ticker: string;
  sic: string;
  industry: string;
  filings: SecFiling[];
}

export interface CrossReferenceInsight {
  id: string;
  sourceType: CrossReferenceRecord["sourceType"];
  sourceId: string;
  targetType: CrossReferenceRecord["targetType"];
  targetId: string;
  targetName: string;
  relevanceScore: number;
  rationale: string;
  matchedTerms: string[];
  impact: string;
}

export interface SimilarityResult {
  id: string;
  label: string;
  type: string;
  score: number;
  summary: string;
  url: string;
}

export interface FetchJsonOptions extends RequestInit {
  baseUrl?: string;
}

export interface NavigationLink {
  label: string;
  href: string;
  description: string;
}

export interface DashboardSummaryStat {
  label: string;
  value: string;
  delta: string;
  tone: "positive" | "neutral" | "warning";
}

export interface DashboardVelocityPoint {
  label: string;
  value: number;
  date: string;
  source: "federal-register" | "congress" | "sec";
}

export interface DashboardDependencyNode {
  id: string;
  type: "agency" | "committee" | "issuer" | "industry";
  name: string;
  count: number;
  intensity: number;
}

export interface DashboardDependencyEdge {
  source: string;
  target: string;
  weight: number;
  label: string;
}

export interface DashboardDependencyGraph {
  nodes: DashboardDependencyNode[];
  edges: DashboardDependencyEdge[];
}

export interface DashboardComplianceDriver {
  label: string;
  value: number;
  max: number;
}

export interface DashboardComplianceSummary {
  score: number;
  label: string;
  explanation: string;
  drivers: DashboardComplianceDriver[];
}

export interface DashboardCrossReferenceHighlight {
  id: string;
  sourceType: CrossReferenceRecord["sourceType"];
  sourceLabel: string;
  targetType: CrossReferenceRecord["targetType"];
  targetLabel: string;
  relevanceScore: number;
  rationale: string;
  matchedTerms: string[];
}

export interface DashboardWidgetResponse<T> {
  data: T;
  _fallback?: boolean;
  meta?: ApiResponseMeta;
}
