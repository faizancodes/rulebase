import type {
  ApiResponse,
  CongressBill,
  FederalRegisterNotice,
  SecFiling,
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