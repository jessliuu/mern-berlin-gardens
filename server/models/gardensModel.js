import mongoose from "mongoose";

const gardenSchema = new mongoose.Schema({
  farmName: {
    type: String,
    required: true,
  },
  availableOn: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
  },
  groupSize: {
    type: Number,
  },
  task: {
    type: Array,
    // required: true,
  },
  neighborhood: {
    type: String,
  },
  experienceRequired: {
    type: Boolean,
  },
  childrenWelcome: {
    type: Boolean,
  },
  image: {
    type: String,
  },
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    // required: true,
  },
  volunteers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
});

const gardensModel = mongoose.model("garden", gardenSchema);
export default gardensModel;
