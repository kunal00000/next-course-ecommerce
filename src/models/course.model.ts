import mongoose from "mongoose";

const course_db_schema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  imageLink: String,
  published: Boolean,
  updatedAt: Date
});

export const CourseModel =
  mongoose.models.Course || mongoose.model("Course", course_db_schema);
