"use client";

import { useCallback, useMemo, useState } from "react";

import { AlertBuilder } from "@/components/alerts/alert-builder";
import { AlertList } from "@/components/alerts/alert-list";
import { AlertRules } from "@/components/alerts/alert-rules";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import { LoadingState } from "@/components/ui/loading-state";
import { useAlertStore } from "@/store/alert-store";
import type { AlertItem, AlertRule } from "@/lib/types";

const seedRules: AlertRule[] = [
  { id: "rule-1", name: "SEC risk factor changes", query: "risk factors", sources: ["sec"], isActive: true, createdAt: "2026-03-18" },
  { id: "rule-2", name: "Agency proposals", query: "proposed rule", sources: ["federal-register"], isActive: true, createdAt: "2026-03-20" },
  { id: "rule-3", name: "Committee hearings", query: "hearing", sources: ["congress"], isActive: false, createdAt: "2026-03-22" },
];

const seedAlerts: AlertItem[] = [
  { id: "alert-1", title: "New SEC filing mentions climate risk", message: "A 10-K update references climate transition exposure.", severity: "warning", createdAt: "2026-03-28", read: false },
  { id: "alert-2", title: "Federal Register proposal overlaps with issuer", message: "A proposed rule matches monitored issuer keywords.", severity: "info", createdAt: "2026-03-27", read: true },
  { id: "alert-3", title: "Congressional hearing cites monitored agency", message: "A hearing transcript references the same agency topic.", severity: "success", createdAt: "2026-03-26", read: false },
];

export default function AlertsPage() {
  const { rules, alerts, unreadCount, isLoading, setRules, setAlerts, addRule, toggleRule, removeRule, markAlertRead, markAllRead, setLoading } = useAlertStore();
  const [error, setError] = useState<string | null>(null);

  const loadSeedData = useCallback(() => {
    setLoading(true);
    setError(null);
    try {
      setRules(seedRules);
      setAlerts(seedAlerts);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load alerts");
    } finally {
      setLoading(false);
    }
  }, [setAlerts, setLoading, setRules]);

  const handleRetry = useCallback(() => {
    loadSeedData();
  }, [loadSeedData]);

  const activeRules = useMemo(() => rules.filter((rule) => rule.isActive), [rules]);

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState message={error} onRetry={handleRetry} />;
  if (rules.length === 0 && alerts.length === 0) {
    return <EmptyState title="No alerts yet" description="Create a monitoring rule to start tracking federal signals." />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-text-muted">Operational monitoring</p>
          <h1 className="mt-2 text-3xl font-light text-text-primary">Alerts</h1>
          <p className="mt-2 max-w-3xl text-sm text-text-secondary">
            Build monitoring rules across agencies, issuers, keywords, and source types.
          </p>
        </div>
        <Button variant="secondary" onClick={markAllRead} disabled={unreadCount === 0}>
          Mark all read
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <AlertBuilder onCreate={addRule} />
        <Card className="border-border-default bg-surface-2 p-6">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.2em] text-text-muted">Status</p>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="border border-border-default bg-surface-1 p-4">
                <div className="text-2xl font-light text-text-primary">{rules.length}</div>
                <div className="text-xs uppercase tracking-[0.2em] text-text-muted">Rules</div>
              </div>
              <div className="border border-border-default bg-surface-1 p-4">
                <div className="text-2xl font-light text-text-primary">{activeRules.length}</div>
                <div className="text-xs uppercase tracking-[0.2em] text-text-muted">Active</div>
              </div>
              <div className="border border-border-default bg-surface-1 p-4">
                <div className="text-2xl font-light text-text-primary">{unreadCount}</div>
                <div className="text-xs uppercase tracking-[0.2em] text-text-muted">Triggered</div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <AlertRules rules={rules} onToggle={toggleRule} onRemove={removeRule} />
      <AlertList alerts={alerts} onMarkRead={markAlertRead} />
      <Button variant="ghost" onClick={loadSeedData}>Refresh sample alerts</Button>
    </div>
  );
}
