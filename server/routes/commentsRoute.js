import express from "express";
import {
  getComments,
  deleteComment,
} from "../controller/commentsController.js";

const router = express.Router();

router.get("/getcomments", getComments);
router.delete("/deletecomment/:commentID", deleteComment);

// router.post("/postcomment", jwtAuth, postComment);

export default router;
