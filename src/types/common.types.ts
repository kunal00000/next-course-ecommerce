import z from "zod";

export const user_input_zod_schema = z
  .object({
    username: z.string().min(1).max(20),
    password: z.string().min(1).max(40)
  })
  .strict();
