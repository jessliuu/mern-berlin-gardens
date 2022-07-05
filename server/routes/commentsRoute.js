import express from "express";
import { getComments } from "../controller/commentsController.js";

const router = express.Router();

router.get("/getcomments", getComments);

// router.post("/postcomment", jwtAuth, postComment);

export default router;
