"use client";
import PaginationPure from "./PaginationPure";

interface PaginationClientProps {
  currentPage: number;
  totalPages: number;
  currentTopicSlug?: string;
  currentSort?: string;
}

export default function PaginationClient(props: PaginationClientProps) {
  return <PaginationPure {...props} />;
}
