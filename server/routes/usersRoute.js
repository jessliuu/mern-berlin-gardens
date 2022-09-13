import express from "express";
import {
  // getOneUser,
  uploadUserPicture,
  signUp,
  logIn,
  // getProfile,
  addGarden,
  getProfileByUserId,
  volunteerForGarden,
  unvolunteerForGarden,
  deleteGarden,
  likeGarden,
  unlikeGarden,
} from "../controller/usersController.js";
import jwtAuth from "../middlewares/jwtAuth.js";
import { multerUploads } from "../middlewares/multer.js";

const router = express.Router();

// router.get("/:user", getOneUser);
// router.post("/imageUpload", multerUploads.single("image"), uploadUserPicture);

router.post("/signup", signUp);
router.post("/login", logIn);
router.get("/profile", jwtAuth, getProfileByUserId);

router.post("/addgarden", jwtAuth, multerUploads.single("image"), addGarden);
router.delete("/deletegarden", jwtAuth, deleteGarden);
router.get("/getpostedgardens", jwtAuth, getProfileByUserId);
router.post("/volunteerforgarden", jwtAuth, volunteerForGarden);
router.post("/unvolunteerforgarden", jwtAuth, unvolunteerForGarden);
router.get("/getvolunteeredgardens", jwtAuth, getProfileByUserId);
router.post("/likegarden", jwtAuth, likeGarden);
router.post("/unlikegarden", jwtAuth, likeGarden);

export default router;
