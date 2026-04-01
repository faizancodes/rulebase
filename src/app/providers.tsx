"use client";

import type { ReactNode } from "react";

import { QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

import { createQueryClient } from "@/lib/query-client";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const [queryClient] = useState(() => createQueryClient());
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}