import mongoose from "mongoose";

const admin_db_schema = new mongoose.Schema({
  username: String,
  password: String,
  myCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
});

export const AdminModel = mongoose.model("admin", admin_db_schema);
