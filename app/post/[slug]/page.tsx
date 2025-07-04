"use server";

import { firestore } from "@/lib/firebaseAdmin";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Home } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import ReactMarkdown from "react-markdown";
import { unstable_cache } from "next/cache";
import type { PostDetail, Topic } from "@/types";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ScrollProgress } from "@/components/animate-ui/components/scroll-progress";
import { ProgressiveImage } from "@/components/ProgressiveImage";

const getPostWithCache = (slug: string) => {
  return unstable_cache(
    async (): Promise<PostDetail | null> => {
      try {
        const postsCollection = firestore.collection("posts");
        const querySnapshot = await postsCollection
          .where("slug", "==", slug)
          .select("title", "content", "createdAt", "image", "topicId")
          .limit(1)
          .get();

        if (querySnapshot.empty) {
          return null;
        }

        const doc = querySnapshot.docs[0];
        const data = doc.data()!;
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt.toDate(),
        } as PostDetail;
      } catch (error) {
        console.error("Error fetching post by slug:", error);
        return null;
      }
    },
    [`post-detail-${slug}`], // Cache key động với slug
    {
      revalidate: 3600, // 1 hour
      tags: ["post"],
    }
  );
};

const getTopicById = (topicId: string) => {
  return unstable_cache(
    async (): Promise<Topic | null> => {
      try {
        const topicDoc = await firestore
          .collection("topics")
          .doc(topicId)
          .get();
        if (!topicDoc.exists) return null;
        return { id: topicDoc.id, ...topicDoc.data() } as Topic;
      } catch (error) {
        console.error("Error fetching topic by ID:", error);
        return null;
      }
    },
    [`topic-${topicId}`],
    { revalidate: 3600, tags: ["topics"] }
  );
};

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const getPost = getPostWithCache(slug);
  const post = await getPost();

  if (!post) {
    notFound();
  }

  const getTopic = getTopicById(post.topicId);
  const topic = await getTopic();

  return (
    <main className="max-w-4xl mx-auto px-4 py-16">
      <ScrollProgress />
      <div className="mb-8">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link
                  href="/"
                  className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <Home className="w-4 h-4" />
                  <span>Home</span>
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {topic && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href={`/?topic=${topic.slug}`}>{topic.name}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </>
            )}
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{post.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <article className="bg-gray-50/80 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-8 transition-colors">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <span className="text-gray-400 dark:text-gray-500 text-sm">
              {formatDistanceToNow(post.createdAt)} ago
            </span>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {post.title}
        </h1>

        {post.image && (
          <div className="mb-8 rounded-xl overflow-hidden">
            <ProgressiveImage
              src={post.image}
              alt="Post illustration"
              width={800}
              height={400}
              className="object-cover w-full"
              sizes="(max-width: 768px) 100vw, 800px"
              priority={true}
              quality={100}
            />
          </div>
        )}

        <div className="prose prose-lg max-w-none text-gray-800 dark:text-gray-200 leading-relaxed prose-headings:text-gray-900 prose-headings:dark:text-white prose-p:text-gray-800 prose-p:dark:text-gray-200 prose-strong:text-gray-900 prose-strong:dark:text-white prose-code:text-gray-900 prose-code:dark:text-white prose-code:bg-gray-100 prose-code:dark:bg-gray-700 prose-pre:bg-gray-100 prose-pre:dark:bg-gray-700">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </article>
    </main>
  );
}
