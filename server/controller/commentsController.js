import commentsModel from "../models/commentsModel.js";

// const postComment = async (req, res) => {
//     const newComment = new commentsModel({
//         authorid: req.user._id,
//         gardenid: req.body.gardenid,
//         commentText: req.body.commentText,
//         commentDate: req.body.commentDate
//     });
//     console.log("newComment", newComment);
//     try {
//         const savedComment = await newComment.save();
//         console.log("savedComment", savedComment);
//     }
// }

const getComments = async (req, res) => {
  console.log("req...", req.query);
  try {
    const comments = await commentsModel
      .find({ gardenid: req.query.myGardenID })
      //   .find({})
      .populate({ path: "gardenid", select: ["farmName"] })
      .populate({ path: "authorid", select: ["name", "email", "role"] })
      .exec();
    console.log(comments[0].gardenid._id);
    res.status(200).json({ comments });
  } catch (error) {
    console.log("error with getting comments", error);
  }
};

export { getComments };
