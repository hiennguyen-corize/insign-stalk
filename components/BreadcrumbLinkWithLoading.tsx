"use client";

import { InstantLink } from "@/components/InstantLink";

interface BreadcrumbLinkWithLoadingProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function BreadcrumbLinkWithLoading({
  href,
  children,
  className,
}: BreadcrumbLinkWithLoadingProps) {
  return (
    <InstantLink href={href} className={className}>
      {children}
    </InstantLink>
  );
}
