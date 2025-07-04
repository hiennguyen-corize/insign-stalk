"use server";

import { firestore } from "@/lib/firebaseAdmin";
import { unstable_cache } from "next/cache";
import type {
  Topic,
  PostListItem,
  GetBlogPostsParams,
  GetBlogPostsResult,
  SearchParams,
} from "@/types";
import HomePage from "@/components/pages/HomePage";

const POSTS_PER_PAGE = 5;

// Function to fetch topics with cache
const getTopics = unstable_cache(
  async (): Promise<Topic[]> => {
    try {
      const topicsSnapshot = await firestore.collection("topics").get();
      if (topicsSnapshot.empty) return [];
      return topicsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Topic[];
    } catch (error) {
      console.error("Error fetching topics:", error);
      return [];
    }
  },
  ["topics"],
  {
    revalidate: 300, // 5 minutes
    tags: ["topics"],
  }
);

// Function to fetch posts with pagination, filtering and sorting with cache
const getBlogPosts = unstable_cache(
  async ({
    page = 1,
    topicSlug,
    sortDirection = "desc",
  }: GetBlogPostsParams): Promise<GetBlogPostsResult> => {
    try {
      let query: FirebaseFirestore.Query = firestore.collection("posts");
      let countQuery: FirebaseFirestore.Query = firestore.collection("posts");

      if (topicSlug) {
        const topicsCollection = firestore.collection("topics");
        const topicQuery = await topicsCollection
          .where("slug", "==", topicSlug)
          .limit(1)
          .get();

        if (!topicQuery.empty) {
          const topicId = topicQuery.docs[0].id;
          query = query.where("topicId", "==", topicId);
          countQuery = countQuery.where("topicId", "==", topicId);
        } else {
          return { posts: [], totalPosts: 0 };
        }
      }

      const totalPostsSnapshot = await countQuery.count().get();
      const totalPosts = totalPostsSnapshot.data().count;

      query = query
        .orderBy("createdAt", sortDirection)
        .select(
          "title",
          "summary",
          "slug",
          "createdAt",
          "source",
          "topicId",
          "image",
          "description"
        )
        .limit(POSTS_PER_PAGE)
        .offset((page - 1) * POSTS_PER_PAGE);

      const postsSnapshot = await query.get();
      if (postsSnapshot.empty) return { posts: [], totalPosts: 0 };

      const posts = postsSnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt.toDate(),
        } as PostListItem;
      });

      return { posts, totalPosts };
    } catch (error) {
      console.error("Error fetching posts:", error);
      return { posts: [], totalPosts: 0 };
    }
  },
  ["blog-posts"],
  {
    revalidate: 300, // 5 minutes
    tags: ["posts"],
  }
);

export default async function XStalkClone({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const currentPage = Number(params?.page) || 1;
  const currentTopicSlug = params?.topic;
  const currentSort = params?.sort === "asc" ? "asc" : "desc";

  const topics = await getTopics();
  const { posts, totalPosts } = await getBlogPosts({
    page: currentPage,
    topicSlug: currentTopicSlug,
    sortDirection: currentSort,
  });

  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  return (
    <HomePage
      posts={posts}
      topics={topics}
      currentPage={currentPage}
      totalPages={totalPages}
      currentTopicSlug={currentTopicSlug}
      currentSort={currentSort}
    />
  );
}
