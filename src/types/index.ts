import type { CollectionEntry } from 'astro:content';
import type { postCollectionName } from '@/content/config';

type PostCollectionEntry = CollectionEntry<typeof postCollectionName>;

interface IElement {
	readonly as?: keyof HTMLElementTagNameMap;
}

interface PaginationLink {
	url: string;
	text?: string;
	srLabel?: string;
}

interface SiteMeta {
	title: string;
	description?: string;
	ogImage?: string | undefined;
	articleDate?: string | undefined;
}

export type { IElement, PaginationLink, SiteMeta, PostCollectionEntry };
