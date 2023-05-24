import { defineCollection, z } from 'astro:content';

// Each collection needs to be defined with `defineCollection()`
const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    draft: z.boolean().default(false),
    title: z.string(),
    summary: z.string().optional(),
    added: z.string().transform((str) => new Date(str)),
    edited: z
      .string()
      .optional()
      .transform((str) => str && new Date(str)),
    tags: z.array(z.string()).optional(),
    image: z.string().optional(),
  }),
});

const blogCollectionName = 'blog';

// exporting the collections object registers it
// Each key needs to match the collection directory structure in "src/content"
const collections = {
  [blogCollectionName]: blogCollection,
};

export { blogCollectionName, collections };
