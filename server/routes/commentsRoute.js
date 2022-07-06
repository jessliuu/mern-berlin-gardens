import express from "express";
import {
  getComments,
  deleteComment,
  postComment,
} from "../controller/commentsController.js";
import jwtAuth from "../middlewares/jwtAuth.js";

const router = express.Router();

router.get("/getcomments", getComments);
router.delete("/deletecomment/:commentID", deleteComment);
router.post("/postcomment", jwtAuth, postComment);

export default router;
