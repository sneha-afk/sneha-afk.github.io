export const stripLeadingChar = (str: string, char: string): string => (str.startsWith(char) ? str.substring(1) : str);

export const isExternalUrl = (url: string): boolean => url.startsWith("http://") || url.startsWith("https://");

export const getGithubSourceUrl = (slug: string, branch = "main"): string =>
  `https://github.com/sneha-afk/sneha-afk.github.io/blob/${branch}/public/posts/${slug}.md`;
