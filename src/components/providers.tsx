"use client";

import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";
import { HighlightProvider } from "@/components/highlight-context";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange={false}
    >
      <HighlightProvider>{children}</HighlightProvider>
    </ThemeProvider>
  );
}
