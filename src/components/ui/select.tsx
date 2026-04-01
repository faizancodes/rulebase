import type { SelectHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export function Select({ className, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select className={cn("h-10 w-full border border-border-default bg-surface-2 px-3 text-sm text-text-primary outline-none focus:border-border-hover", className)} {...props} />;
}
