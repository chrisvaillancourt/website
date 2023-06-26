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

export type { IElement, PaginationLink, SiteMeta };
