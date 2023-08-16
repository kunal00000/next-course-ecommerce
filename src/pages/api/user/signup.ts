import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

import { JWT_SECRET } from "@/config";
import { ConnectDB } from "@/connectdb";
import { UserModel } from "@/models/user.model";
import { user_zod_schema } from "@/types/user.types";

ConnectDB();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    try {
      const admin = await UserModel.findOne({ username: req.body.username });

      if (admin) {
        return res
          .status(403)
          .json({ success: false, message: "User already exists" });
      } else {
        const valid = user_zod_schema.safeParse({
          ...req.body,
          purchasedCourses: []
        });

        if (valid.success) {
          const new_user = new UserModel(valid.data);
          await new_user.save();

          const token = jwt.sign(
            { username: new_user["username"], role: "admin" },
            JWT_SECRET,
            { expiresIn: "1h" }
          );

          res.setHeader("Set-Cookie", `token=${token}; Secure; HttpOnly`);

          return res.status(200).json({
            success: true,
            message: "User created successfully",
            user: new_user
          });
        } else {
          return res.status(400).json({
            success: false,
            message: "Validation failed",
            error: valid.error
          });
        }
      }
    } catch (error: any) {
      return res.status(500).json({ success: false, error: error.message });
    }
  } else {
    return res
      .status(404)
      .json({ success: false, message: "Invalid request method." });
  }
}
