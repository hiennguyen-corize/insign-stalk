"use client";

import { useSearchParams, useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { FilterControlsProps } from "@/types";
import { Suspense } from "react";
import { useAppDispatch } from "@/lib/hooks";
import { start } from "@/lib/features/navProgressSlice";

export function FilterControls({
  topics,
  currentTopic,
  currentSort,
}: FilterControlsProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleValueChange = (key: "topic" | "sort", value: string) => {
    const current = new URLSearchParams(
      Array.from(searchParams?.entries() || [])
    );

    if (key === "topic" && value === "all") {
      current.delete("topic");
    } else {
      current.set(key, value);
    }

    // Reset to page 1 when filter or sort changes
    current.set("page", "1");

    const search = current.toString();
    const query = search ? `?${search}` : "";

    // Start navigation loading
    dispatch(start());

    // Navigate using router.push
    router.push(`/${query}`);
  };

  return (
    <div className="flex justify-center items-center gap-4 mb-4 flex-wrap px-4">
      <Select
        value={currentTopic || "all"}
        onValueChange={(value) => handleValueChange("topic", value)}
      >
        <SelectTrigger className="w-[200px] bg-white/80 dark:bg-gray-800/90 backdrop-blur-sm border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 hover:bg-white dark:hover:bg-gray-800 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400">
          <SelectValue placeholder="Filter by Topic" />
        </SelectTrigger>
        <SelectContent className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-gray-200 dark:border-gray-600">
          <SelectItem
            value="all"
            className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-gray-100 dark:focus:bg-gray-700"
          >
            All Topics
          </SelectItem>
          {topics.map((topic) => (
            <SelectItem
              key={topic.id}
              value={topic.slug}
              className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-gray-100 dark:focus:bg-gray-700"
            >
              {topic.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={currentSort}
        onValueChange={(value) => handleValueChange("sort", value)}
      >
        <SelectTrigger className="w-[200px] bg-white/80 dark:bg-gray-800/90 backdrop-blur-sm border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 hover:bg-white dark:hover:bg-gray-800 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-gray-200 dark:border-gray-600">
          <SelectItem
            value="desc"
            className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-gray-100 dark:focus:bg-gray-700"
          >
            Newest First
          </SelectItem>
          <SelectItem
            value="asc"
            className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-gray-100 dark:focus:bg-gray-700"
          >
            Oldest First
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export function FilterControlsWrapper(props: FilterControlsProps) {
  return (
    <Suspense>
      <FilterControls {...props} />
    </Suspense>
  );
}
