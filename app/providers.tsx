"use client";

import { FC, PropsWithChildren, Suspense } from "react";
import ProgressBar from "@/components/ProgressBar";
import { ThemeProvider } from "@/components/theme-provider";

export const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      <Suspense>
        <ProgressBar />
      </Suspense>
      {children}
    </ThemeProvider>
  );
};
