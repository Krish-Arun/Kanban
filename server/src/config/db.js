import mongoose from "mongoose";

export default async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "rateeverything",
    });
    console.log("MongoDB connected ✔");
  } catch (err) {
    console.error("Mongo Error ❌", err);
    process.exit(1);
  }
}
