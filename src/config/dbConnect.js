import mongoose from "mongoose";
import { MONGO_URI } from "./serverConfig.js";

const dbConnect = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("DB connected successfully");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

export default dbConnect;
