import mongoose from "mongoose";

const user_db_schema = new mongoose.Schema({
  username: { type: String },
  password: String,
  purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
});

export const UserModel = mongoose.model("user", user_db_schema);
