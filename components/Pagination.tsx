"use client";

import {
  Pagination as ShadcnPagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationFullProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function PaginationFull({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationFullProps) {
  if (totalPages <= 1) return null;
  const pageNumbers = [];
  let start = Math.max(1, currentPage - 2);
  let end = Math.min(totalPages, currentPage + 2);
  if (currentPage <= 3) {
    end = Math.min(5, totalPages);
  } else if (currentPage >= totalPages - 2) {
    start = Math.max(1, totalPages - 4);
  }
  for (let i = start; i <= end; i++) {
    pageNumbers.push(i);
  }
  return (
    <ShadcnPagination className="my-2 flex justify-end w-full">
      <PaginationContent>
        <PaginationItem>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className="h-8 w-8 p-0 flex items-center justify-center rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </PaginationItem>
        {start > 1 && (
          <>
            <PaginationItem>
              <button
                onClick={() => onPageChange(1)}
                className="h-8 w-8 p-0 flex items-center justify-center rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                1
              </button>
            </PaginationItem>
            {start > 2 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
          </>
        )}
        {pageNumbers.map((page) => (
          <PaginationItem key={page}>
            <button
              onClick={() => onPageChange(page)}
              className={`h-8 w-8 p-0 flex items-center justify-center rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition ${
                page === currentPage
                  ? "border-blue-500 dark:border-blue-400 font-bold"
                  : ""
              }`}
              aria-current={page === currentPage ? "page" : undefined}
            >
              {page}
            </button>
          </PaginationItem>
        ))}
        {end < totalPages && (
          <>
            {end < totalPages - 1 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            <PaginationItem>
              <button
                onClick={() => onPageChange(totalPages)}
                className="h-8 w-8 p-0 flex items-center justify-center rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                {totalPages}
              </button>
            </PaginationItem>
          </>
        )}
        <PaginationItem>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="h-8 w-8 p-0 flex items-center justify-center rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Next page"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </PaginationItem>
      </PaginationContent>
    </ShadcnPagination>
  );
}
