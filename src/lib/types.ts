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
}

export interface FetchJsonOptions extends RequestInit {
  baseUrl?: string;
}

export interface NavigationLink {
  label: string;
  href: string;
  description: string;
}
