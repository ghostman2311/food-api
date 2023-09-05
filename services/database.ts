import { MONGO_URI } from "../config";
import mongoose from "mongoose";

export default async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('DB connected')
  } catch (err) {
    console.log(err);
  }
};
