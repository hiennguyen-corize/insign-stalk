"use client";

import { useTheme } from "next-themes";
import { StarsBackground } from "@/components/animate-ui/backgrounds/stars";
import { useEffect, useState } from "react";

export function StarsBackgroundWrapper() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || theme !== "dark") {
    return null;
  }

  return (
    <div className="absolute inset-0">
      <StarsBackground className="w-full h-full" />
    </div>
  );
}
