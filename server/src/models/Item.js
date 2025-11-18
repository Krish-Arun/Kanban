import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String },
  rating: { type: Number, default: 0 },
  ratingsCount: { type: Number, default: 0 }, // to compute averages later
}, { timestamps: true });

export default mongoose.model("Item", ItemSchema);
