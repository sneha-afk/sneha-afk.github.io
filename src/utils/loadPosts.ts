import fm from "front-matter";
// Import the front-matter library to parse YAML metadata at the top of markdown files

export type PostMeta = {
  slug: string; // URL-friendly identifier derived from the filename
  title: string;
  date: string;
};

export async function loadPosts(): Promise<PostMeta[]> {
  // Grab all markdown files in /src/posts
  // import.meta.glob returns an object where each key is the file path
  // and the value is a function that imports the module (lazy by default)
  const files = import.meta.glob("/src/posts/*.md", {
    import: "default", // Only get the default export of the file
    query: "?raw", // Load the file content as a raw string
  });

  // Map over all file entries and process them
  const posts: PostMeta[] = await Promise.all(
    Object.entries(files).map(async ([path, loader]) => {
      // 'loader' is a function returning a promise for the file content
      const raw = await (loader as () => Promise<string>)();

      // Parse front-matter metadata from the raw markdown
      const { attributes } = fm<{ title?: string; date?: string }>(raw);

      // Generate a slug from the file name
      const slug = path.split("/").pop()!.replace(/\.md$/, "");

      return {
        slug,
        title: attributes.title ?? "Untitled",
        date: attributes.date ?? "",
      };
    }),
  );

  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return posts;
}
