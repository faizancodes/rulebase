import type { InputHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn("h-10 w-full border border-border-default bg-surface-2 px-3 text-sm text-text-primary placeholder:text-text-muted outline-none focus:border-border-hover", className)} {...props} />;
}