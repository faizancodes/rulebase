"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { AlertRule } from "@/lib/types";

interface AlertRulesProps {
  rules: AlertRule[];
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
}

export function AlertRules({ rules, onToggle, onRemove }: AlertRulesProps) {
  return (
    <Card className="border-border-default bg-surface-2 p-6">
      <div className="space-y-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-text-muted">Monitoring rules</p>
          <h2 className="mt-2 text-lg font-light text-text-primary">Active and inactive rules</h2>
        </div>
        <div className="space-y-3">
          {rules.map((rule) => (
            <div key={rule.id} className="flex flex-wrap items-center justify-between gap-3 border border-border-default bg-surface-1 p-4">
              <div>
                <div className="text-sm text-text-primary">{rule.name}</div>
                <div className="mt-1 text-xs uppercase tracking-[0.2em] text-text-muted">{rule.query}</div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="secondary" onClick={() => onToggle(rule.id)}>
                  {rule.isActive ? "Disable" : "Enable"}
                </Button>
                <Button variant="ghost" onClick={() => onRemove(rule.id)}>
                  Remove
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
