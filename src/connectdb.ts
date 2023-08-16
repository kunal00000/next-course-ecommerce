import { MONGODB_URI } from "./config";
import mongoose from "mongoose";

export async function ConnectDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB connected");
    });

    connection.on("error", (err) => {
      console.log("MongoDB connection error:" + err);
    });
  } catch (error) {
    console.log(error);
  }
}
