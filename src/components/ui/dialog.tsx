"use client";

import { cn } from "@/lib/utils";

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: React.ReactNode;
}

export function Dialog({ open, onOpenChange, title, children }: DialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className={cn("w-full max-w-2xl border border-border-default bg-surface-2 p-6") }>
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-lg font-light text-text-primary">{title}</h2>
          <button className="text-sm text-text-muted" onClick={() => onOpenChange(false)}>
            Close
          </button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
}
