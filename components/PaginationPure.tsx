"use client";
import { PaginationFull } from "./Pagination";
import { useSearchParams, useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/hooks";
import { start } from "@/lib/features/navProgressSlice";

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
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useAppDispatch();

  function handlePageChange(page: number) {
    const params = new URLSearchParams(searchParams?.toString() || "");
    if (currentTopicSlug) params.set("topic", currentTopicSlug);
    if (currentSort) params.set("sort", currentSort);
    params.set("page", page.toString());

    // Start navigation loading
    dispatch(start());

    // Navigate using router.push
    const url = params.toString() ? `/?${params.toString()}` : "/";
    router.push(url);
  }

  return (
    <PaginationFull
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
    />
  );
}
