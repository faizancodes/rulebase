"use client";

import { useMemo } from "react";

import { useQuery } from "@tanstack/react-query";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import { LoadingState } from "@/components/ui/loading-state";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { fetchDashboardCompliance, fetchDashboardCrossReferences, fetchDashboardDependencies, fetchDashboardSummary, fetchDashboardVelocity, fetchCongressBills, fetchFederalRegisterNotices, fetchSecFilings } from "@/lib/api";
import { formatDate } from "@/lib/formatters";

export default function DashboardPage() {
  const activeSource = "all";
  const selectedEntity = "";

  const summaryQuery = useQuery({ queryKey: ["dashboard", "summary"], queryFn: fetchDashboardSummary });
  const velocityQuery = useQuery({ queryKey: ["dashboard", "velocity"], queryFn: fetchDashboardVelocity });
  const dependencyQuery = useQuery({ queryKey: ["dashboard", "dependencies"], queryFn: fetchDashboardDependencies });
  const complianceQuery = useQuery({ queryKey: ["dashboard", "compliance"], queryFn: fetchDashboardCompliance });
  const crossReferenceQuery = useQuery({ queryKey: ["dashboard", "cross-references"], queryFn: fetchDashboardCrossReferences });
  const noticesQuery = useQuery({ queryKey: ["dashboard", "notices", activeSource, selectedEntity], queryFn: () => fetchFederalRegisterNotices(selectedEntity) });
  const billsQuery = useQuery({ queryKey: ["dashboard", "bills", activeSource, selectedEntity], queryFn: () => fetchCongressBills(selectedEntity) });
  const filingsQuery = useQuery({ queryKey: ["dashboard", "filings", activeSource, selectedEntity], queryFn: () => fetchSecFilings(selectedEntity) });

  const summary = Array.isArray(summaryQuery.data?.data) ? summaryQuery.data.data : [];
  const notices = Array.isArray(noticesQuery.data?.data) ? noticesQuery.data.data : [];
  const bills = Array.isArray(billsQuery.data?.data) ? billsQuery.data.data : [];
  const filings = Array.isArray(filingsQuery.data?.data) ? filingsQuery.data.data : [];
  const summaryError = summaryQuery.error instanceof Error ? summaryQuery.error.message : null;
  const velocityError = velocityQuery.error instanceof Error ? velocityQuery.error.message : null;
  const dependencyError = dependencyQuery.error instanceof Error ? dependencyQuery.error.message : null;
  const complianceError = complianceQuery.error instanceof Error ? complianceQuery.error.message : null;
  const crossReferenceError = crossReferenceQuery.error instanceof Error ? crossReferenceQuery.error.message : null;

  const recentDate = useMemo(() => formatDate(new Date().toISOString()), []);

  return (
    <div className="min-h-screen bg-background text-text-primary lg:flex">
      <Sidebar />
      <div className="flex min-h-screen flex-1 flex-col">
        <Topbar />
        <main className="flex-1 p-4 sm:p-6 xl:p-8">
          <div className="space-y-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.05em] text-text-muted">Dashboard</p>
                <h1 className="mt-2 text-3xl text-text-primary">Federal regulatory intelligence</h1>
                <p className="mt-2 max-w-2xl text-sm text-text-secondary">Monitor rulemaking, legislation, and issuer disclosures in one operational view.</p>
              </div>
              <Badge>{recentDate}</Badge>
            </div>

            {summaryQuery.isLoading ? <LoadingState /> : summaryQuery.error ? <ErrorState message={summaryQuery.error.message} onRetry={() => summaryQuery.refetch()} /> : (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {summary.map((item) => (
                  <Card key={item.label}>
                    <p className="text-xs uppercase tracking-[0.05em] text-text-muted">{item.label}</p>
                    <p className="mt-3 text-3xl text-text-primary">{item.value}</p>
                    <p className="mt-2 text-sm text-text-secondary">{item.delta}</p>
                  </Card>
                ))}
              </div>
            )}

            <div className="grid gap-6 xl:grid-cols-2">
              <Card>
                <div className="space-y-4">
                  <h2 className="text-xl text-text-primary">Rulemaking velocity</h2>
                  {velocityQuery.isLoading ? <LoadingState /> : velocityQuery.error ? <ErrorState message={velocityQuery.error.message} onRetry={() => velocityQuery.refetch()} /> : <pre className="overflow-auto text-xs text-text-secondary">{JSON.stringify(velocityQuery.data?.data ?? [], null, 2)}</pre>}
                </div>
              </Card>
              <Card>
                <div className="space-y-4">
                  <h2 className="text-xl text-text-primary">Compliance score</h2>
                  {complianceQuery.isLoading ? <LoadingState /> : complianceQuery.error ? <ErrorState message={complianceQuery.error.message} onRetry={() => complianceQuery.refetch()} /> : <pre className="overflow-auto text-xs text-text-secondary">{JSON.stringify(complianceQuery.data?.data ?? {}, null, 2)}</pre>}
                </div>
              </Card>
            </div>

            <div className="grid gap-6 xl:grid-cols-2">
              <Card>
                <div className="space-y-4">
                  <h2 className="text-xl text-text-primary">Dependency graph</h2>
                  {dependencyQuery.isLoading ? <LoadingState /> : dependencyQuery.error ? <ErrorState message={dependencyQuery.error.message} onRetry={() => dependencyQuery.refetch()} /> : <pre className="overflow-auto text-xs text-text-secondary">{JSON.stringify(dependencyQuery.data?.data ?? {}, null, 2)}</pre>}
                </div>
              </Card>
              <Card>
                <div className="space-y-4">
                  <h2 className="text-xl text-text-primary">Cross references</h2>
                  {crossReferenceQuery.isLoading ? <LoadingState /> : crossReferenceQuery.error ? <ErrorState message={crossReferenceQuery.error.message} onRetry={() => crossReferenceQuery.refetch()} /> : <pre className="overflow-auto text-xs text-text-secondary">{JSON.stringify(crossReferenceQuery.data?.data ?? [], null, 2)}</pre>}
                </div>
              </Card>
            </div>

            <div className="grid gap-6 xl:grid-cols-3">
              <Card>
                <div className="space-y-4">
                  <h2 className="text-xl text-text-primary">Recent notices</h2>
                  {notices.length > 0 ? notices.slice(0, 3).map((notice) => <div key={notice.documentNumber} className="border-b border-border-subtle pb-3 last:border-0 last:pb-0"><p className="text-sm text-text-primary">{notice.title}</p><p className="text-xs text-text-muted">{notice.agency} · {notice.documentNumber}</p></div>) : <EmptyState title="No notices" description="No Federal Register notices matched the current filters." />}
                </div>
              </Card>
              <Card>
                <div className="space-y-4">
                  <h2 className="text-xl text-text-primary">Active bills</h2>
                  {bills.length > 0 ? bills.slice(0, 3).map((bill) => <div key={bill.billId} className="border-b border-border-subtle pb-3 last:border-0 last:pb-0"><p className="text-sm text-text-primary">{bill.title}</p><p className="text-xs text-text-muted">{bill.chamber} · {bill.latestAction ?? bill.status}</p></div>) : <EmptyState title="No bills" description="No congressional activity matched the current filters." />}
                </div>
              </Card>
              <Card>
                <div className="space-y-4">
                  <h2 className="text-xl text-text-primary">Issuer filings</h2>
                  {filings.length > 0 ? filings.slice(0, 3).map((filing) => <div key={filing.accessionNumber} className="border-b border-border-subtle pb-3 last:border-0 last:pb-0"><p className="text-sm text-text-primary">{filing.companyName}</p><p className="text-xs text-text-muted">{filing.formType} · {filing.filingDate}</p></div>) : <EmptyState title="No filings" description="No SEC filings matched the current filters." />}
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
