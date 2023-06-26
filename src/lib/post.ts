import { getCollection } from 'astro:content';
import { postCollectionName } from '@/content/config';
import { POSTS_PATH } from '@/lib/constants';

/**
 * Blog posts from the blog content collection.
 */
function getPostsCollection() {
	return getCollection(postCollectionName);
}

/**
 * Get the full URL of a post.
 * Used to link to a post's page.
 */
function postUrl(slug: string) {
	const routePrefix = POSTS_PATH;
	return `${routePrefix}/${slug}`;
}

export { getPostsCollection, postUrl };
