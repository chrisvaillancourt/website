import type { MarkdownLayoutProps } from 'astro';

interface PostFrontmatter {
  title: string;
  summary: string;
  draft?: boolean;
  added: string;
  updated?: string;
}

type PostLayoutProps = MarkdownLayoutProps<PostFrontmatter>;

export type { PostFrontmatter, PostLayoutProps };
