import gardensModel from "../models/gardensModel.js";

const getAllGardens = async (req, res) => {
  try {
    const allGardens = await gardensModel.find({});
    console.log(allGardens);
    res.status(200).json({ allGardens });
  } catch (err) {
    res.status(400).json({ message: "server issue" });
  }
};

export { getAllGardens };
