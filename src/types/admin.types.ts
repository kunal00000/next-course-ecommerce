import mongoose from "mongoose";
import z from "zod";

export const admin_zod_schema = z
  .object({
    _id: z.string().uuid().optional(),
    username: z.string().min(1).max(20),
    password: z.string().min(1).max(40),
    myCourses: z.array(z.instanceof(mongoose.Types.ObjectId))
  })
  .strict();

export type Admin = z.infer<typeof admin_zod_schema>;
