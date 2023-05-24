import { getCollection } from 'astro:content';
import { blogCollectionName } from '@/content/config';

/**
 * Blog posts from the blog content collection.
 */
function getPosts() {
  return getCollection(blogCollectionName);
}

/**
 * Non-draft blog posts.
 */
async function getPublishedPosts() {
  const posts = await getPosts();
  const nonDraftPosts = posts.filter((post) => !post.data.draft);
  return nonDraftPosts;
}

/**
 * Get the full URL of a post.
 * Used to link to a post's page.
 * Must be in the `/posts` route.
 */
function postUrl(slug: string) {
  const routePrefix = '/posts';
  return `${routePrefix}/${slug}`;
}

/**
 * Non-draft blog posts, sorted by date (most recent first).
 */
async function publishedPostsByDate() {
  const posts = await getPublishedPosts();
  return posts.sort((a, b) => b.data.added.getTime() - a.data.added.getTime());
}

export { getPublishedPosts, postUrl, publishedPostsByDate };
