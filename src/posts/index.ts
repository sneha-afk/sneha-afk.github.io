// src/posts/index.ts
// Grab all .md files in posts folder as raw strings
const postFiles = import.meta.glob("./*.md", {
  eager: true,
  import: "default",
  query: "?raw",
});

console.log(postFiles);

export default postFiles;
