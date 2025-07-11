import Link from "next/link";
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

interface HomePageProps {
  posts: PostListItem[];
  topics: Topic[];
  currentPage: number;
  totalPages: number;
  currentTopicSlug?: string;
  currentSort?: string;
}

function PostCard({ post }: { post: PostListItem }) {
  return (
    <MotionEffect
      key={post.id}
      slide
      fade
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      <Link href={`/post/${post.slug}`} className="block group">
        <article className="bg-gray-50/80 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-2 md:p-6 group-hover:bg-gray-100/90 dark:group-hover:bg-gray-700/90 transition-colors flex flex-col md:flex-row gap-3 md:gap-6 items-start shadow-sm mb-4 md:mb-8">
          {post.image && (
            <div className="w-full md:w-[30%] flex-shrink-0 max-h-40 md:max-h-none overflow-hidden rounded-2xl">
              <ProgressiveImage
                src={post.image}
                alt="Post illustration"
                width={400}
                height={225}
                className="object-cover rounded-2xl border dark:border-gray-600 aspect-[4/3] w-full"
                sizes="(max-width: 768px) 100vw, 30vw"
                priority={false}
                quality={85}
              />
            </div>
          )}
          <div className="flex-1 flex flex-col h-full">
            <div className="flex items-center justify-between mb-1 md:mb-2">
              <span className="text-gray-500 dark:text-gray-400 text-xs md:text-sm">
                {formatDistanceToNow(post.createdAt)} ago
              </span>
            </div>
            <h2 className="text-base md:text-lg font-bold text-gray-900 dark:text-white mb-1 md:mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              <HighlightText text={post.title} />
            </h2>
            {post.description && (
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-xs md:text-sm flex-grow mb-2 md:mb-3">
                {post.description}
              </p>
            )}
            <div className="mt-auto flex justify-end">
              <div className="inline-flex items-center text-blue-600 dark:text-blue-400 px-3 py-1 rounded-lg group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition-all duration-200">
                <span className="text-sm font-medium group-hover:underline">
                  Read more
                </span>
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
              </div>
            </div>
          </div>
        </article>
      </Link>
    </MotionEffect>
  );
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
            <Suspense>
              <FilterControls
                topics={topics}
                currentTopic={currentTopicSlug}
                currentSort={currentSort as "asc" | "desc"}
              />
            </Suspense>
          </div>
        </div>
        <div className="space-y-8">
          {!!posts.length ? (
            posts.map((post) => <PostCard key={post.id} post={post} />)
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400">
              No posts found for this topic.
            </p>
          )}
        </div>
        <PaginationClient
          currentPage={currentPage}
          totalPages={totalPages}
          currentTopicSlug={currentTopicSlug}
          currentSort={currentSort}
        />
      </main>
    </>
  );
}
