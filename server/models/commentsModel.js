import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    authorid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    gardenid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "garden",
      required: true,
    },
    commentText: {
      type: String,
      required: true,
    },
    commentDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const commentsModel = mongoose.model("comment", commentSchema);
export default commentsModel;
