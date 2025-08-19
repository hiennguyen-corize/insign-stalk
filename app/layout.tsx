import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import Header from "@/components/Header";
import { Providers } from "@/app/providers";
import { StarsBackgroundWrapper } from "@/components/StarsBackgroundWrapper";
import { BackToTop } from "@/components/BackToTop";
import { NavOverlay } from "@/components/NavOverlay";
import { NavProgressListener } from "@/app/nav-progress-listener";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "InsightStalk",
  description:
    "Curated insights from top blogs and news sources across all topics",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <div className="min-h-screen bg-white dark:bg-gradient-to-b dark:from-gray-900 dark:to-black transition-colors relative">
            {/* Stars background chỉ hiển thị trong dark mode */}
            <StarsBackgroundWrapper />

            {/* Content overlay */}
            <div className="relative z-10">
              <Header />
              {children}
            </div>

            {/* Back to top button */}
            <BackToTop />
          </div>

          <NavOverlay />
          <NavProgressListener />
        </Providers>
      </body>
    </html>
  );
}
