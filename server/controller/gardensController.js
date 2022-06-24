import gardensModel from "../models/gardensModel.js";

const getAllGardens = async (req, res) => {
  const neighborhood = req.query.neighborhood;
  console.log("neighborhood", neighborhood);
  if (neighborhood) {
    const selectedGardensByNeighborhood = await gardensModel
      .find({ neighborhood: neighborhood })
      .exec();
    if (selectedGardensByNeighborhood.length === 0) {
      res.status(201).json({
        message: "Unfortunately no gardens found in this neighborhood",
      });
    } else {
      res.status(200).json({ selectedGardensByNeighborhood });
    }
  } else {
    try {
      const allGardens = await gardensModel.find({});
      console.log(allGardens);
      res.status(200).json({ allGardens });
    } catch (err) {
      res.status(400).json({ message: "server issue" });
    }
  }
};

const getGardensByID = async (req, res) => {
  // console.log(req.params);
  try {
    const selectedGardensByID = await gardensModel
      .find({ _id: req.params.id })
      .exec();
    res.status(200).json({ selectedGardensByID });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Unable to retrieve this garden by this ID" });
  }
};

export { getAllGardens, getGardensByID };
