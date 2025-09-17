// src/posts/index.ts

const postFiles = import.meta.glob("./*.md", {
  eager: true,
  import: "default",
  query: "?raw",
});

export default postFiles;
