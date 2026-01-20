import fm from "front-matter";
import { LRUCache } from "@utils/LRUCache";

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  tags?: string[];
};

/** Represents a complete post with content */
export type Post = PostMeta & {
  content: string;
};

let allPosts: PostMeta[] | null = null;
const postCache = new LRUCache<Post>(5);

/**
 * Loads all post metadata from index.json
 * @returns Sorted array of post metadata
 */
export async function loadPosts(): Promise<PostMeta[]> {
  if (allPosts) return allPosts;

  try {
    const res = await fetch(`${import.meta.env.BASE_URL}posts/index.json`);
    if (!res.ok) throw new Error("Post index not found");

    const posts: PostMeta[] = await res.json();
    allPosts = posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return allPosts;
  } catch (err) {
    console.error("Failed to load posts:", err);
    return [];
  }
}

/**
 * Loads a single post with content, using LRU caching
 * @param slug - The post identifier
 * @returns Post with content or null if not found
 */
export async function loadOnePost(slug: string): Promise<Post | null> {
  const cached = postCache.get(slug);
  if (cached) return cached;

  try {
    const res = await fetch(`${import.meta.env.BASE_URL}posts/${slug}.md`);
    if (!res.ok) return null;

    const raw = await res.text();
    const { attributes, body } = fm<PostMeta>(raw);

    const post: Post = {
      slug,
      title: attributes.title?.trim() || "Untitled",
      date: attributes.date?.trim() || "",
      tags: attributes.tags || [],
      content: body.trim(),
    };

    postCache.set(slug, post);
    return post;
  } catch {
    return null;
  }
}

/**
 * Gets adjacent posts for navigation
 * @param currentSlug - The current post identifier
 * @returns Previous and next post metadata
 */
export function getAdjacentPosts(slug: string): {
  prev: PostMeta | null;
  next: PostMeta | null;
} {
  if (!allPosts) return { prev: null, next: null };

  const idx = allPosts.findIndex((p) => p.slug === slug);
  if (idx === -1) return { prev: null, next: null };

  return {
    prev: idx > 0 ? allPosts[idx - 1] : null,
    next: idx < allPosts.length - 1 ? allPosts[idx + 1] : null,
  };
}

/**
 * Filters posts by tag
 * @param tag - The tag to filter by
 * @returns Array of posts with matching tag
 */
export function getPostsByTag(tag: string): PostMeta[] {
  if (!allPosts) return [];
  const lower = tag.toLowerCase();
  return allPosts.filter((p) => p.tags?.some((t) => t.toLowerCase() === lower));
}

/**
 * Gets all unique tags from all posts
 * @returns Sorted array of unique tags
 */
export function getAllTags(): string[] {
  if (!allPosts) return [];
  const tags = new Set(allPosts.flatMap((p) => p.tags || []));
  return Array.from(tags).sort();
}

/**
 * Sorts posts by date (newest first)
 * @param a - First post to compare
 * @param b - Second post to compare
 * @returns Comparison result for sorting
 */
// function sortByDate(a: PostMeta, b: PostMeta): number {
//   return new Date(b.date).getTime() - new Date(a.date).getTime();
// }

/**
 * Clears all post caches
 */
export function clearCaches(): void {
  allPosts = null;
  postCache.clear();
}
