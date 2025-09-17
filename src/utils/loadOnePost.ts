import fm from "front-matter";

export type Post = {
  slug: string;
  title: string;
  date: string;
  content: string;
};

const MAX_CACHE_SIZE = 20;
const cache = new Map<string, Post>();

export async function loadOnePost(slug: string): Promise<Post | null> {
  // Return cached post if available
  if (cache.has(slug)) {
    const cached = cache.get(slug)!;
    cache.delete(slug);
    cache.set(slug, cached); // bump to most recent
    return cached;
  }

  try {
    // Fetch the markdown file from public/posts at runtime
    const res = await fetch(`/posts/${slug}.md`);
    if (!res.ok) return null;

    const raw = await res.text();
    const { attributes, body } = fm<{ title?: string; date?: string }>(raw);

    const post: Post = {
      slug,
      title: attributes.title?.trim() || "Untitled",
      date: attributes.date?.trim() || "",
      content: body.trim(),
    };

    // Insert into cache and evict oldest if over capacity
    cache.set(slug, post);
    if (cache.size > MAX_CACHE_SIZE) {
      const oldest = cache.keys().next().value;
      if (oldest !== undefined) cache.delete(oldest);
    }

    return post;
  } catch {
    return null;
  }
}
