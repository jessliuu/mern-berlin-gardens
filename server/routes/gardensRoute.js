import express from "express";
import {
  getAllGardens,
  getGardensByID,
} from "../controller/gardensController.js";

const router = express.Router();

router.get("/test", (req, res) => {
  res.send({ msg: "Test route." });
});

router.get("/browse", getAllGardens);

// URL parameter
router.get("/browse/:id", getGardensByID);

export default router;
