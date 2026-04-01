"use client";

import { useCallback, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import type { AlertRule } from "@/lib/types";

interface AlertBuilderProps {
  onCreate: (rule: AlertRule) => void;
}

export function AlertBuilder({ onCreate }: AlertBuilderProps) {
  const [name, setName] = useState("");
  const [query, setQuery] = useState("");
  const [source, setSource] = useState("federal-register");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreate = useCallback(async () => {
    if (!name.trim() || !query.trim() || isSubmitting) return;
    setIsSubmitting(true);
    try {
      onCreate({
        id: `rule-${Date.now()}`,
        name: name.trim(),
        query: query.trim(),
        sources: [source],
        isActive: true,
        createdAt: new Date().toISOString().slice(0, 10),
      });
      setName("");
      setQuery("");
    } finally {
      setIsSubmitting(false);
    }
  }, [isSubmitting, name, onCreate, query, source]);

  return (
    <Card className="border-border-default bg-surface-2 p-6">
      <div className="space-y-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-text-muted">Create rule</p>
          <h2 className="mt-2 text-lg font-light text-text-primary">Alert builder</h2>
        </div>
        <div className="space-y-3">
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Rule name" />
          <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Keywords, agencies, issuers" />
          <Select value={source} onChange={(e) => setSource(e.target.value)}>
            <option value="federal-register">Federal Register</option>
            <option value="congress">Congress</option>
            <option value="sec">SEC</option>
          </Select>
          <Button onClick={handleCreate} disabled={isSubmitting || !name.trim() || !query.trim()}>
            {isSubmitting ? "Creating..." : "Create alert"}
          </Button>
        </div>
      </div>
    </Card>
  );
}
