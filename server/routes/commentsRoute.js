import express from "express";
import { addcomments, postcomment } from "../controller/commentsController.js";

const router = express.Router();

router.get("/getcomments", addcomments);
router.post("/postcomment", jwtAuth, postcomment);

export default router;
