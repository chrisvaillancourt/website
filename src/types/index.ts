import type { CollectionEntry } from 'astro:content';
import type { blogCollectionName } from '@/content/config';

type BlogPost = CollectionEntry<typeof blogCollectionName>;

export type { BlogPost };
