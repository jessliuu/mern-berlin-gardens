import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unqiue: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
  },
  gardens: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "garden",
    },
  ],
  volunteeredgardens: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "garden",
    },
  ],
});

const usersModel = mongoose.model("user", usersSchema);
export default usersModel;
