import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    if (req.headers["username"] !== undefined) {
      return res
        .status(200)
        .json({
          success: true,
          username: req.headers["username"],
          role: req.headers["role"]
        });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "No username found" });
    }
  } else {
    return res
      .status(404)
      .json({ success: false, message: "Invalid request method" });
  }
}
