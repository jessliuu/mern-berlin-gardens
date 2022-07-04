import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
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
  messageText: {
    type: String,
    required: true,
  },
  messageDate: {
    type: Date,
    required: true,
  },
});

const gardensModel = mongoose.model("garden", gardenSchema);
export default gardensModel;
