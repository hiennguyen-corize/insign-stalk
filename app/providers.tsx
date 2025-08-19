"use client";

import { FC, PropsWithChildren, useRef } from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "@/components/theme-provider";
import { makeStore, AppStore } from "@/lib/store";

export const Providers: FC<PropsWithChildren> = ({ children }) => {
  const storeRef = useRef<AppStore>(makeStore());

  return (
    <Provider store={storeRef.current}>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem={false}
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </Provider>
  );
};
