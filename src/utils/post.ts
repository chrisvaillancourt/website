import type { CollectionEntry } from 'astro:content';

export function sortMDByDate(posts: CollectionEntry<'post'>[] = []) {
	return posts.sort(
		(a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime(),
	);
}

export function getUniqueTags(posts: CollectionEntry<'post'>[] = []) {
	const tags = posts.flatMap((post) => post.data.tags);
	const uniqueTags = new Set(tags);
	return [...uniqueTags] as const;
}

export function getUniqueTagsWithCount(posts: CollectionEntry<'post'>[] = []): {
	[key: string]: number;
} {
	return posts.reduce((prev, post) => {
		const runningTags: { [key: string]: number } = { ...prev };
		post.data.tags.forEach((tag) => {
			runningTags[tag] = (runningTags[tag] || 0) + 1;
		});
		return runningTags;
	}, {});
}
