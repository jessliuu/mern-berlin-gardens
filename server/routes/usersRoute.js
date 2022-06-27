import express from "express";
import {
  getOneUser,
  uploadUserPicture,
  signUp,
  logIn,
} from "../controller/usersController.js";
import { multerUploads } from "../middlewares/multer.js";

const router = express.Router();

router.get("/:user", getOneUser);
router.post("/imageUpload", multerUploads.single("image"), uploadUserPicture);

router.post("/signup", signUp);
router.post("/login", logIn);
export default router;
