import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

import { JWT_SECRET } from "@/config";
import { ConnectDB } from "@/connectdb";
import { AdminModel } from "@/models/admin.model";

ConnectDB();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const admin = await AdminModel.findOne({
        username: req.headers["username"],
        password: req.headers["password"]
      });

      if (admin) {
        const token = jwt.sign(
          { username: req.headers["username"], role: "admin" },
          JWT_SECRET,
          {
            expiresIn: "1d"
          }
        );

        res.setHeader("Set-Cookie", `token=${token}; Secure; HttpOnly; Path=/`);
        return res
          .status(200)
          .json({ success: true, message: "Logged in successfully" });
      } else {
        return res
          .status(403)
          .json({ success: false, message: "Invalid username or password" });
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
