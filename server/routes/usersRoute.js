import express from "express";
import {
  getOneUser,
  uploadUserPicture,
  signUp,
  logIn,
  getProfile,
  addGarden,
  getGardensByUserId,
} from "../controller/usersController.js";
import jwtAuth from "../middlewares/jwtAuth.js";
import { multerUploads } from "../middlewares/multer.js";

const router = express.Router();

// router.get("/:user", getOneUser);
router.post("/imageUpload", multerUploads.single("image"), uploadUserPicture);

router.post("/signup", signUp);
router.post("/login", logIn);
router.get("/profile", jwtAuth, getProfile);

router.post("/addgarden", jwtAuth, addGarden);
router.get("/getgardens", jwtAuth, getGardensByUserId);

export default router;
