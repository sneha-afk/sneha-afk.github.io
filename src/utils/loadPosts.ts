import fm from "front-matter";
// Import the front-matter library to parse YAML metadata at the top of markdown files

export type PostMeta = {
  slug: string; // URL-friendly identifier derived from the filename
  title: string;
  date: string;
};

export async function loadPosts(): Promise<PostMeta[]> {
  try {
    // 1️⃣ Fetch the index JSON
    const indexRes = await fetch(`${import.meta.env.BASE_URL}posts/index.json`);
    if (!indexRes.ok) throw new Error("Post index not found");
    const slugs: string[] = await indexRes.json();

    // 2️⃣ Fetch each markdown file and parse front-matter
    const posts = await Promise.all(
      slugs.map(async (slug) => {
        const res = await fetch(`${import.meta.env.BASE_URL}posts/${slug}.md`);
        if (!res.ok) throw new Error(`Post "${slug}" not found`);
        const raw = await res.text();
        const { attributes } = fm<{ title?: string; date?: string }>(raw);

        return {
          slug,
          title: attributes.title?.trim() || "Untitled",
          date: attributes.date?.trim() || "",
        };
      }),
    );

    // 3️⃣ Sort by date (newest first)
    posts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );

    return posts;
  } catch (err) {
    console.error("Failed to load posts:", err);
    return [];
  }
}
