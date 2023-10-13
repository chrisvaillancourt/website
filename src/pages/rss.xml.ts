import rss from '@astrojs/rss';
import { getPostsCollection } from '@/lib/post';
import { siteConfig } from '@/site.config';

export async function GET() {
	const posts = await getPostsCollection();

	return rss({
		title: siteConfig.title,
		description: siteConfig.description,
		site: import.meta.env.SITE,
		items: posts.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.publishDate,
			link: `posts/${post.slug}`,
		})),
	});
}
