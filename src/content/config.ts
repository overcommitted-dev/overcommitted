import { defineCollection, z } from 'astro:content';

const transcripts = defineCollection({});

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.date(),
    author: z.string(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().default(false)
  })
});

export const collections = {
  transcripts,
  blog
};
