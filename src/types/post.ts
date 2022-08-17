import type { MarkdownInstance } from 'astro';
import type { POST_FRONTMATTER } from '@/lib/constants';

type PostFrontmatterProperty = typeof POST_FRONTMATTER[number];

type Post = MarkdownInstance<Record<PostFrontmatterProperty, unknown>>;

export type { Post };
