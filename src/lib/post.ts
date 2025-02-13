import { getCollection } from 'astro:content';
import { postCollectionName } from '@/content.config';
import type { Posts } from '@/types';
import { isProd } from '@/lib/env';

export {
	getPostsCollection,
	postsByDate,
	getUniqueTags,
	getUniqueTagsWithCount,
};

/**
 * Blog posts from the blog content collection.
 */
function getPostsCollection() {
	return getCollection(postCollectionName, ({ data }) =>
		// only show draft posts during dev
		isProd() ? data.draft !== true : true,
	);
}

function postsByDate(posts: Posts) {
	return [...posts].sort(
		(a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime(),
	);
}

function getUniqueTags(posts: Posts) {
	const tags = posts.flatMap((post) => post.data.tags);
	const uniqueTags = new Set(tags);
	return [...uniqueTags] as const;
}

function getUniqueTagsWithCount(posts: Posts): {
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
