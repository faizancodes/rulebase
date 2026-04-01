import type { ReactNode } from "react";

import { Card } from "@/components/ui/card";

interface EmptyStateProps {
  title?: string;
  description?: string;
  message?: string;
  icon?: ReactNode;
  className?: string;
  children?: ReactNode;
}

export function EmptyState({ title = "No results found", description, message, icon, className, children }: EmptyStateProps) {
  return (
    <Card className={className}>
      <div className="text-center space-y-3 py-6">
        {icon ? <div className="mx-auto flex h-12 w-12 items-center justify-center border border-border-default bg-surface-3">{icon}</div> : null}
        <p className="text-sm text-text-primary">{title}</p>
        <p className="text-sm text-text-secondary">{description ?? message ?? "Try adjusting your filters or search terms."}</p>
        {children}
      </div>
    </Card>
  );
}