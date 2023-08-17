import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

import { JWT_SECRET } from "@/config";
import { ConnectDB } from "@/connectdb";
import { AdminModel } from "@/models/admin.model";
import { admin_zod_schema } from "@/types/admin.types";

ConnectDB();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    try {
      const admin = await AdminModel.findOne({ username: req.body.username });

      if (admin) {
        return res
          .status(400)
          .json({ success: false, message: "Admin already exists" });
      } else {
        const valid = admin_zod_schema.safeParse({
          ...req.body,
          myCourses: [
            new mongoose.Types.ObjectId("64b6f81f6bf4b7cff0ed1978"),
            new mongoose.Types.ObjectId("64b6f8606bf4b7cff0ed197f"),
            new mongoose.Types.ObjectId("64b6f8a86bf4b7cff0ed198f"),
            new mongoose.Types.ObjectId("64b6f8d86bf4b7cff0ed1999"),
            new mongoose.Types.ObjectId("64b6f9056bf4b7cff0ed19a3"),
            new mongoose.Types.ObjectId("64b6f9816bf4b7cff0ed19be"),
            new mongoose.Types.ObjectId("64b6f9a66bf4b7cff0ed19c8"),
            new mongoose.Types.ObjectId("64b6f9c86bf4b7cff0ed19ce")
          ]
        });

        if (valid.success) {
          const new_admin = new AdminModel(valid.data);
          await new_admin.save();

          const token = jwt.sign(
            { username: new_admin["username"], role: "admin" },
            JWT_SECRET,
            { expiresIn: "1h" }
          );

          res.setHeader(
            "Set-Cookie",
            `token=${token}; Secure; HttpOnly; Path=/`
          );

          return res.status(200).json({
            success: true,
            message: "Admin created successfully",
            user: new_admin
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
