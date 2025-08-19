"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function PostCardSkeleton() {
  return (
    <div className="bg-gray-50/80 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-2 md:p-6 flex flex-col md:flex-row gap-3 md:gap-6 items-start shadow-sm mb-4 md:mb-8 animate-pulse">
      {/* Image skeleton */}
      <div className="w-full md:w-[30%] flex-shrink-0">
        <Skeleton className="w-full h-40 md:h-48 rounded-2xl" />
      </div>

      {/* Content skeleton */}
      <div className="flex-1 flex flex-col h-full space-y-3">
        {/* Date skeleton */}
        <Skeleton className="w-24 h-4" />

        {/* Title skeleton */}
        <Skeleton className="w-full h-6" />
        <Skeleton className="w-3/4 h-6" />

        {/* Description skeleton */}
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-2/3 h-4" />

        {/* Read more button skeleton */}
        <div className="mt-auto flex justify-end">
          <Skeleton className="w-24 h-8 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export function TopicFilterSkeleton() {
  return (
    <div className="flex flex-col md:flex-row gap-2 md:gap-4 items-center">
      <Skeleton className="w-32 h-10 rounded-lg" />
      <Skeleton className="w-24 h-10 rounded-lg" />
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="text-center space-y-6 animate-pulse">
        <Skeleton className="w-64 h-12 mx-auto" />
        <Skeleton className="w-96 h-6 mx-auto" />
        <Skeleton className="w-48 h-4 mx-auto" />
      </div>
    </div>
  );
}

export function PostDetailSkeleton() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 space-y-8 animate-pulse">
      {/* Breadcrumb skeleton */}
      <div className="flex items-center space-x-2">
        <Skeleton className="w-16 h-4" />
        <Skeleton className="w-4 h-4" />
        <Skeleton className="w-24 h-4" />
        <Skeleton className="w-4 h-4" />
        <Skeleton className="w-48 h-4" />
      </div>

      {/* Article skeleton */}
      <article className="bg-gray-50/80 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-8">
        {/* Date skeleton */}
        <div className="flex items-center justify-between mb-6">
          <Skeleton className="w-32 h-4" />
        </div>

        {/* Title skeleton */}
        <Skeleton className="w-full h-10 mb-8" />

        {/* Image skeleton */}
        <Skeleton className="w-full h-64 rounded-xl mb-8" />

        {/* Content skeleton */}
        <div className="space-y-4">
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-3/4 h-4" />
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-5/6 h-4" />
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-2/3 h-4" />
        </div>
      </article>
    </div>
  );
}

export function PaginationSkeleton() {
  return (
    <div className="flex justify-center items-center space-x-2 mt-8 animate-pulse">
      <Skeleton className="w-10 h-10 rounded-lg" />
      <Skeleton className="w-10 h-10 rounded-lg" />
      <Skeleton className="w-10 h-10 rounded-lg" />
      <Skeleton className="w-10 h-10 rounded-lg" />
      <Skeleton className="w-10 h-10 rounded-lg" />
    </div>
  );
}

export function LoadingSpinner({ className }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center ${className || ""}`}>
      <div className="relative">
        <div className="w-8 h-8 border-4 border-gray-200 dark:border-gray-700 rounded-full" />
        <div className="absolute top-0 left-0 w-8 h-8 border-4 border-transparent border-t-blue-500 rounded-full animate-spin" />
      </div>
    </div>
  );
}

export function LoadingDots({ className }: { className?: string }) {
  return (
    <div className={`flex space-x-1 ${className || ""}`}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
          style={{ animationDelay: `${i * 0.1}s` }}
        />
      ))}
    </div>
  );
}
