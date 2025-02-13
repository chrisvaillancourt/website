import type { CollectionEntry } from 'astro:content';
import type { postCollectionName } from '@/content.config';

type PostCollectionEntry = CollectionEntry<typeof postCollectionName>;

type Posts = readonly PostCollectionEntry[];

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

type Links = readonly { readonly path: string; readonly title: string }[];

export type {
	IElement,
	PaginationLink,
	SiteMeta,
	PostCollectionEntry,
	Posts,
	Links,
};
