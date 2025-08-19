"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch } from "@/lib/hooks";
import { start } from "@/lib/features/navProgressSlice";
import { ReactNode, MouseEvent } from "react";

interface InstantLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
  [key: string]: any;
}

export function InstantLink({
  href,
  children,
  className,
  onClick,
  ...props
}: InstantLinkProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // Call custom onClick if provided
    if (onClick) {
      onClick(e);
    }

    // Don't trigger navigation for:
    // - Middle click (opens in new tab)
    // - Cmd/Ctrl + click (opens in new tab)
    // - Right click (context menu)
    // - External links
    if (
      e.button === 1 || // Middle click
      e.metaKey || // Cmd key (Mac)
      e.ctrlKey || // Ctrl key (Windows/Linux)
      e.button === 2 || // Right click
      href.startsWith("http") || // External links
      e.defaultPrevented // Already handled
    ) {
      return;
    }

    // Compare target vs current URL (ignore hash). If identical, don't show overlay
    try {
      const currentSearch = searchParams?.toString() || "";
      const targetUrl = new URL(href, window.location.origin);
      const targetPath = targetUrl.pathname;
      const targetSearch = targetUrl.search.startsWith("?")
        ? targetUrl.search.slice(1)
        : targetUrl.search;

      const isSameRoute =
        targetPath === pathname && targetSearch === currentSearch;
      if (isSameRoute) {
        // Let Next.js handle normally without overlay
        return;
      }
    } catch {}

    // Prevent default behavior and start overlay
    e.preventDefault();
    dispatch(start());
    router.push(href);
  };

  return (
    <Link href={href} className={className} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}
