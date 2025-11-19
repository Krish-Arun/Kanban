import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
  name: String,
  category: String,
  imageUrl: String,
  reviews: [
    {
      username: String,
      rating: Number, // 1–5
      review: String, // user written review
      judgement: {
        judgementText: String,
        judgementTags: [String],
        sentimentScore: Number,
        contradictionDetected: Boolean,
        stats: {
          wordCount: Number,
          charCount: Number,
          emojiCount: Number,
          exaggerationCount: Number
        }
      },
      createdAt: { type: Date, default: Date.now }
    }
  ],
  averageRating: {
    type: Number,
    default: 0
  }
});

export default mongoose.model("Item", ItemSchema);
