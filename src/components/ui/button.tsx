import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
}

export function Button({ className, children, variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-accent-primary/40 disabled:cursor-not-allowed disabled:opacity-50",
        variant === "primary" && "border-accent-primary bg-accent-primary text-[#0a0a0a] hover:bg-accent-hover",
        variant === "secondary" && "border-border-default bg-surface-2 text-text-primary hover:border-border-hover hover:bg-surface-3",
        variant === "ghost" && "border-transparent bg-transparent text-text-secondary hover:bg-surface-2 hover:text-text-primary",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}