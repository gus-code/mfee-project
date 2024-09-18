import z from 'zod';

export const schema = z.object({
  title: z.string().min(1),
  image: z.string().min(1).url(),
  description: z.string().min(1),
  category: z.string().min(1)
});

export const commentSchema = z.object({
  author: z.string().min(1),
  content: z.string().min(1)
});

export const validatePost = (data: unknown) => {
  return schema.safeParse(data);
};

export const validatePartialPost = (data: unknown) => {
  return schema.partial().safeParse(data);
};

export const validateComment = (data: unknown) => {
  return commentSchema.safeParse(data);
};
