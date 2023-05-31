import type { CollectionEntry } from 'astro:content';
import type { blogCollectionName } from '@/content/config';

interface PostFrontmatter {
  title: string;
  summary: string;
  draft?: boolean;
  added: string;
  updated?: string;
}
type BlogPost = CollectionEntry<typeof blogCollectionName>;

export type { PostFrontmatter, BlogPost };
