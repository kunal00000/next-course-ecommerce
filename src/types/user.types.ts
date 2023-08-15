import z from "zod";

export const user_zod_schema = z
  .object({
    _id: z.string().uuid().optional(),
    username: z.string().min(1).max(20).uuid(),
    password: z.string().min(1).max(40),
    purchasedCourses: z.array(z.string())
  })
  .strict();

export type User = z.infer<typeof user_zod_schema>;
