import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
  title?: string;
  children?: ReactNode;
}

export function ErrorState({ message, onRetry, title = "Failed to load data", children }: ErrorStateProps) {
  return (
    <Card>
      <div className="space-y-3 text-center">
        <p className="text-sm text-semantic-error">{title}</p>
        <p className="text-sm text-text-secondary">{message}</p>
        {children}
        {onRetry ? <Button onClick={onRetry}>Try again</Button> : null}
      </div>
    </Card>
  );
}