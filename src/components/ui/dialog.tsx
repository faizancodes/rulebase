import type { ReactNode } from "react";

interface DialogProps {
  open: boolean;
  title: string;
  children: ReactNode;
}

export function Dialog({ open, title, children }: DialogProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-lg border border-border-default bg-surface-2 p-6">
        <h2 className="text-lg text-text-primary">{title}</h2>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
}