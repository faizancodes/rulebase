"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { AlertItem } from "@/lib/types";

interface AlertListProps {
  alerts: AlertItem[];
  onMarkRead: (id: string) => void;
}

export function AlertList({ alerts, onMarkRead }: AlertListProps) {
  return (
    <Card className="border-border-default bg-surface-2 p-6">
      <div className="space-y-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-text-muted">Triggered events</p>
          <h2 className="mt-2 text-lg font-light text-text-primary">Alert feed</h2>
        </div>
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div key={alert.id} className="flex flex-wrap items-center justify-between gap-3 border border-border-default bg-surface-1 p-4">
              <div>
                <div className="text-sm text-text-primary">{alert.title}</div>
                <div className="mt-1 text-sm text-text-secondary">{alert.message}</div>
              </div>
              {!alert.read ? (
                <Button variant="secondary" onClick={() => onMarkRead(alert.id)}>
                  Mark read
                </Button>
              ) : (
                <span className="text-xs uppercase tracking-[0.2em] text-text-muted">Read</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
