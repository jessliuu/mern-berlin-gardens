import express from "express";
import {
  // getOneUser,
  uploadUserPicture,
  signUp,
  logIn,
  // getProfile,
  addGarden,
  getProfileByUserId,
} from "../controller/usersController.js";
import jwtAuth from "../middlewares/jwtAuth.js";
import { multerUploads } from "../middlewares/multer.js";

const router = express.Router();

// router.get("/:user", getOneUser);
router.post("/imageUpload", multerUploads.single("image"), uploadUserPicture);

router.post("/signup", signUp);
router.post("/login", logIn);
router.get("/profile", jwtAuth, getProfileByUserId);

router.post("/addgarden", jwtAuth, addGarden);
router.get("/getgardens", jwtAuth, getProfileByUserId);

export default router;
