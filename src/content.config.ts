import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

function removeDupsAndLowerCase(array: readonly string[]) {
	if (!array.length) return array;
	const lowercaseItems = array.map((str) => str.toLowerCase());
	const distinctItems = new Set(lowercaseItems);
	return Array.from(distinctItems);
}

const postCollection = defineCollection({
	loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/post' }),
	schema: z.object({
		title: z.string().max(60),
		draft: z.boolean().default(false),
		description: z.string().min(10).max(160),
		publishDate: z.string().transform((str) => new Date(str)),
		updatedDate: z
			.string()
			.optional()
			.transform((str) => str && new Date(str)),
		tags: z.array(z.string()).default([]).transform(removeDupsAndLowerCase),
		ogImage: z.string().optional(),
	}),
});

const postCollectionName = 'post';

const collections = { [postCollectionName]: postCollection };

export { postCollectionName, collections };
