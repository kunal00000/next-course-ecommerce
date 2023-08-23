import { NextApiRequest, NextApiResponse } from "next";

import { ConnectDB } from "@/connectdb";
import { AdminModel } from "@/models/admin.model";
import { CourseModel } from "@/models/course.model";
import { courseform_zod_schema } from "@/types/course.types";

ConnectDB();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "GET") {
    const admin = await AdminModel.findOne({
      username: req.headers["username"]
    }).populate("myCourses");

    if (admin) {
      return res.json({ success: true, user: admin });
    } else {
      return res
        .status(403)
        .json({ success: false, message: "Admin not found" });
    }
  } else if (req.method == "POST") {
    const admin = await AdminModel.findOne({
      username: req.headers["username"]
    });

    if (admin) {
      const valid = courseform_zod_schema.safeParse({
        ...req.body
      });

      if (valid.success) {
        const new_course = new CourseModel({
          ...valid.data,
          updatedAt: new Date()
        });
        await new_course.save();

        admin.myCourses.push(new_course._id);
        await admin.save();

        return res.json({
          success: true,
          course: new_course
        });
      } else {
        return res.status(400).json({
          success: false,
          message: "Invalid course input",
          errors: valid.error
        });
      }
    } else {
      return res
        .status(403)
        .json({ success: false, message: "Admin not found" });
    }
  } else {
    return res
      .status(404)
      .json({ success: false, message: "Invalid request method." });
  }
}
