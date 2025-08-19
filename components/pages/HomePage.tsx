import { ArrowRight } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import { FilterControls } from "@/components/FilterControls";
import { HighlightText } from "@/components/animate-ui/text/highlight";
import { MotionEffect } from "@/components/animate-ui/effects/motion-effect";
import PaginationClient from "@/components/PaginationClient";
import { ProgressiveImage } from "@/components/ProgressiveImage";
import type { Topic, PostListItem } from "@/types";
import { formatDistanceToNow } from "date-fns";
import { Suspense } from "react";
import PostCard from "@/components/PostCard";

interface HomePageProps {
  posts: PostListItem[];
  topics: Topic[];
  currentPage: number;
  totalPages: number;
  currentTopicSlug?: string;
  currentSort?: string;
}

export default function HomePage({
  posts,
  topics,
  currentPage,
  totalPages,
  currentTopicSlug,
  currentSort,
}: HomePageProps) {
  return (
    <>
      <HeroSection />

      <main className="max-w-4xl mx-auto px-4 pb-16">
        <div className="flex justify-end w-full mb-2">
          <div className="flex flex-col md:flex-row gap-2 md:gap-4 items-center">
            <FilterControls
              topics={topics}
              currentTopic={currentTopicSlug}
              currentSort={currentSort as "asc" | "desc"}
            />
          </div>
        </div>

        <div className="space-y-4 md:space-y-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="mt-8">
            <PaginationClient
              currentPage={currentPage}
              totalPages={totalPages}
              currentTopicSlug={currentTopicSlug}
              currentSort={currentSort}
            />
          </div>
        )}
      </main>
    </>
  );
}
