"use client";

import { useCallback, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import { LoadingState } from "@/components/ui/loading-state";
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
  const [rules, setRules] = useState<AlertRule[]>(seedRules);
  const [alerts, setAlerts] = useState<AlertItem[]>(seedAlerts);
  const [error, setError] = useState<string | null>(null);

  const unreadCount = useMemo(() => alerts.filter((alert) => !alert.read).length, [alerts]);
  const activeRules = useMemo(() => rules.filter((rule) => rule.isActive), [rules]);
  const isLoading = false;

  const loadSeedData = useCallback(() => {
    setError(null);
    try {
      setRules(seedRules);
      setAlerts(seedAlerts);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load alerts");
    }
  }, []);

  const addRule = useCallback((rule: AlertRule) => {
    setRules((current) => [rule, ...current]);
  }, []);

  const toggleRule = useCallback((id: string) => {
    setRules((current) => current.map((rule) => (rule.id === id ? { ...rule, isActive: !rule.isActive } : rule)));
  }, []);

  const removeRule = useCallback((id: string) => {
    setRules((current) => current.filter((rule) => rule.id !== id));
  }, []);

  const markAlertRead = useCallback((id: string) => {
    setAlerts((current) => current.map((alert) => (alert.id === id ? { ...alert, read: true } : alert)));
  }, []);

  const markAllRead = useCallback(() => {
    setAlerts((current) => current.map((alert) => ({ ...alert, read: true })));
  }, []);

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState message={error} onRetry={loadSeedData} />;
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

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-border-default bg-surface-2 p-6">
          <h2 className="text-lg text-text-primary">Create rule</h2>
          <div className="mt-4 space-y-3">
            <Button onClick={() => addRule({ id: `rule-${Date.now()}`, name: "New monitoring rule", query: "keyword", sources: ["sec"], isActive: true, createdAt: new Date().toISOString().slice(0, 10) })}>
              Add sample rule
            </Button>
            <p className="text-sm text-text-secondary">Use the sample action to verify alert creation in deployment.</p>
          </div>
        </Card>

        <Card className="border-border-default bg-surface-2 p-6">
          <h2 className="text-lg text-text-primary">Status</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
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
              <div className="text-xs uppercase tracking-[0.2em] text-text-muted">Unread</div>
            </div>
          </div>
        </Card>
      </div>

      <Card className="border-border-default bg-surface-2 p-6">
        <h2 className="text-lg text-text-primary">Rules</h2>
        <div className="mt-4 space-y-3">
          {rules.map((rule) => (
            <div key={rule.id} className="flex items-center justify-between gap-3 border border-border-default bg-surface-1 p-4">
              <div>
                <p className="text-sm text-text-primary">{rule.name}</p>
                <p className="text-xs text-text-muted">{rule.query}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="secondary" onClick={() => toggleRule(rule.id)}>{rule.isActive ? "Disable" : "Enable"}</Button>
                <Button variant="ghost" onClick={() => removeRule(rule.id)}>Remove</Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="border-border-default bg-surface-2 p-6">
        <h2 className="text-lg text-text-primary">Alerts</h2>
        <div className="mt-4 space-y-3">
          {alerts.map((alert) => (
            <div key={alert.id} className="flex items-center justify-between gap-3 border border-border-default bg-surface-1 p-4">
              <div>
                <p className="text-sm text-text-primary">{alert.title}</p>
                <p className="text-xs text-text-muted">{alert.message}</p>
              </div>
              <Button variant="secondary" onClick={() => markAlertRead(alert.id)} disabled={alert.read}>
                {alert.read ? "Read" : "Mark read"}
              </Button>
            </div>
          ))}
        </div>
      </Card>

      <Button variant="ghost" onClick={loadSeedData}>Refresh sample alerts</Button>
    </div>
  );
}
