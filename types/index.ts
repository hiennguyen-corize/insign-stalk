// Topic types
export interface Topic {
  id: string;
  name: string;
  slug: string;
}

// Post types
export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  summary: string;
  topic: string;
  images: string[];
  source: string;
  topicId: string;
  createdAt: Date;
}

// Post for list view (minimal fields)
export interface PostListItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  image?: string;
  source: string;
  createdAt: Date;
  topicId: string;
  url: string;
}

// Post for detail view (full content)
export interface PostDetail {
  id: string;
  title: string;
  content: string;
  description: string;
  slug: string;
  image?: string;
  source: string;
  createdAt: Date;
  topicId: string;
  url: string;
  format: string;
}

// Function parameter types
export interface GetBlogPostsParams {
  page?: number;
  topicSlug?: string;
  sortDirection?: "asc" | "desc";
}

export interface GetBlogPostsResult {
  posts: PostListItem[];
  totalPosts: number;
}

export interface GetTopicsResult {
  topics: Topic[];
}

// Search params types
export interface SearchParams {
  page?: string;
  topic?: string;
  sort?: string;
}

// Pagination types
export interface PaginationProps {
  position: "top" | "bottom";
  currentPage: number;
  totalPages: number;
}

// Filter controls types
export interface FilterControlsProps {
  topics: Topic[];
  currentTopic?: string;
  currentSort: "asc" | "desc";
}
