import fm from "front-matter";

export type Post = {
  slug: string;
  title: string;
  date: string;
  content: string;
};

const cache: Record<string, Post> = {};

export async function loadOnePost(slug: string): Promise<Post | null> {
  if (cache[slug]) return cache[slug];

  const modules = import.meta.glob("/src/posts/*.md", {
    import: "default",
    query: "?raw",
  });

  const path = Object.keys(modules).find((p) => p.endsWith(`${slug}.md`));
  if (!path) return null;

  const raw = await (modules[path] as () => Promise<string>)();
  const { attributes, body } = fm<{ title?: string; date?: string }>(raw);

  const post: Post = {
    slug,
    title: attributes.title ?? "Untitled",
    date: attributes.date ?? "",
    content: body,
  };

  cache[slug] = post;
  return post;
}
