import fm from "front-matter";

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

const MAX_CACHE_SIZE = 5;
const postCache = new Map<string, Post>();
const lruQueue: string[] = [];
let metadataCache: PostMeta[] = [];

/**
 * Loads all post metadata from index.json
 * @returns Sorted array of post metadata
 */
export async function loadPosts(): Promise<PostMeta[]> {
  if (metadataCache.length > 0) {
    return metadataCache;
  }

  try {
    const indexRes = await fetch(`${import.meta.env.BASE_URL}posts/index.json`);
    if (!indexRes.ok) throw new Error("Post index not found");

    const posts: PostMeta[] = await indexRes.json();
    metadataCache = posts.sort(sortByDate);
    return metadataCache;
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
  if (postCache.has(slug)) {
    const cached = postCache.get(slug)!;
    updateLruOrder(slug);
    return cached;
  }

  try {
    const res = await fetch(`${import.meta.env.BASE_URL}posts/${slug}.md`);
    if (!res.ok) return null;

    const raw = await res.text();
    const { attributes, body } = fm<{
      title?: string;
      date?: string;
      tags?: string[];
    }>(raw);

    const post: Post = {
      slug,
      title: attributes.title?.trim() || "Untitled",
      date: attributes.date?.trim() || "",
      tags: attributes.tags || [],
      content: body.trim(),
    };

    cachePost(slug, post);
    return post;
  } catch {
    return null;
  }
}

/**
 * Updates LRU order by moving slug to most recent position
 * @param slug - The post identifier to update
 */
function updateLruOrder(slug: string): void {
  const index = lruQueue.indexOf(slug);
  if (index > -1) {
    lruQueue.splice(index, 1);
  }
  lruQueue.push(slug);
}

/**
 * Caches a post and handles LRU eviction if needed
 * @param slug - The post identifier
 * @param post - The post content to cache
 */
function cachePost(slug: string, post: Post): void {
  postCache.set(slug, post);
  lruQueue.push(slug);

  if (postCache.size > MAX_CACHE_SIZE) {
    const oldest = lruQueue.shift()!;
    postCache.delete(oldest);
  }
}

/**
 * Gets adjacent posts for navigation
 * @param currentSlug - The current post identifier
 * @returns Previous and next post metadata
 */
export function getAdjacentPosts(currentSlug: string): {
  prev: PostMeta | null;
  next: PostMeta | null;
} {
  const index = metadataCache.findIndex((p) => p.slug === currentSlug);
  if (index === -1) return { prev: null, next: null };

  return {
    prev: index > 0 ? metadataCache[index - 1] : null,
    next: index < metadataCache.length - 1 ? metadataCache[index + 1] : null,
  };
}

/**
 * Filters posts by tag
 * @param tag - The tag to filter by
 * @returns Array of posts with matching tag
 */
export function getPostsByTag(tag: string): PostMeta[] {
  return metadataCache.filter((post) =>
    post.tags?.some((t) => t.toLowerCase() === tag.toLowerCase()),
  );
}

/**
 * Gets all unique tags from all posts
 * @returns Sorted array of unique tags
 */
export function getAllTags(): string[] {
  const allTags = metadataCache.flatMap((post) => post.tags || []);
  return Array.from(new Set(allTags)).sort();
}

/**
 * Sorts posts by date (newest first)
 * @param a - First post to compare
 * @param b - Second post to compare
 * @returns Comparison result for sorting
 */
function sortByDate(a: PostMeta, b: PostMeta): number {
  return new Date(b.date).getTime() - new Date(a.date).getTime();
}

/**
 * Clears all post caches
 */
export function clearPostCaches(): void {
  postCache.clear();
  lruQueue.length = 0;
  metadataCache = [];
}
