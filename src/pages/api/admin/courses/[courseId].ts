import { NextApiRequest, NextApiResponse } from "next";

import { ConnectDB } from "@/connectdb";
import { CourseModel } from "@/models/course.model";
import { courseform_zod_schema } from "@/types/course.types";

ConnectDB();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "PUT") {
    const { courseId } = req.query;

    const valid = courseform_zod_schema.safeParse(req.body);

    if (valid.success) {
      const upd_course = await CourseModel.findByIdAndUpdate(
        courseId,
        { ...valid.data, updatedAt: new Date() },
        {
          new: true
        }
      );

      if (upd_course) {
        return res.status(200).json({
          success: true,
          message: "Course updated successfully"
        });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "Course not found" });
      }
    }
  } else if (req.method == "DELETE") {
    const { courseId } = req.query;
    const course = await CourseModel.findByIdAndDelete(courseId);

    if (course) {
      res
        .status(200)
        .json({ success: true, message: "Course deleted successfully" });
    } else {
      res.status(404).json({ success: false, message: "Course not found" });
    }
  } else {
    return res
      .status(404)
      .json({ success: false, message: "Invalid request method." });
  }
}
