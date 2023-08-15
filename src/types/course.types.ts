import z from "zod";

export const course_zod_schema = z
  .object({
    _id: z.string().uuid(),
    title: z.string().min(1).max(40),
    description: z.string().min(1).max(200),
    imageLink: z.string().url(),
    price: z.number().min(0),
    published: z.boolean(),
    updatedAt: z.string()
  })
  .strict();

export type Course = z.infer<typeof course_zod_schema>;

export const courseform_zod_schema = z
  .object({
    title: z.string().min(1).max(40),
    description: z.string().min(1).max(200),
    imageLink: z.string().url(),
    price: z.number().min(0),
    published: z.boolean()
  })
  .strict();

export type CourseForm = z.infer<typeof courseform_zod_schema>;
