import commentsModel from "../models/commentsModel.js";

const postComment = async (req, res) => {
  const newComment = new commentsModel({
    authorid: req.user._id,
    gardenid: req.body.gardenid,
    commentText: req.body.commentText,
    commentDate: req.body.commentDate,
  });
  console.log("newComment", newComment);
  try {
    const savedComment = await newComment.save();
    console.log("savedComment", savedComment);
    res.status(201).json({
      authorid: savedComment.authorid,
      gardenid: savedComment.gardenid,
      commentText: savedComment.commentText,
      commentDate: savedComment.commentDate,
      _id: savedComment._id,
    });
  } catch (error) {
    console.log("Error saving the comment");
    res
      .status(400)
      .json({ error: error, message: "Comment successfully added" });
  }
};

const getComments = async (req, res) => {
  // console.log("req...", req.query);
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
    res.status(400).json({
      error: error,
      message: "error with getting comments",
    });
  }
};

const deleteComment = async (req, res) => {
  console.log("req in delete comment");
  try {
    const commentToDelete = await commentsModel
      .findByIdAndDelete({ _id: req.params.commentID })
      .exec();
    console.log(commentToDelete);
    res.status(200).json({ commentToDelete });
  } catch (error) {
    console.log("error with deleting this comment", error);
    res.status(400).json({
      error: error,
      message: "error with deleting this comment",
    });
  }
};

export { getComments, deleteComment, postComment };
