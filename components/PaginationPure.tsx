"use client";
import { PaginationFull } from "./Pagination";
import { useRouter, useSearchParams } from "next/navigation";

interface PaginationPureProps {
  currentPage: number;
  totalPages: number;
  currentTopicSlug?: string;
  currentSort?: string;
}

export default function PaginationPure({
  currentPage,
  totalPages,
  currentTopicSlug,
  currentSort,
}: PaginationPureProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handlePageChange(page: number) {
    const params = new URLSearchParams(searchParams.toString());
    if (currentTopicSlug) params.set("topic", currentTopicSlug);
    if (currentSort) params.set("sort", currentSort);
    params.set("page", page.toString());
    router.push(params.toString() ? `/?${params.toString()}` : "/");
  }

  return (
    <PaginationFull
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
    />
  );
}
