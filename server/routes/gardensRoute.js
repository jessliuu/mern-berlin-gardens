import express from "express";
import { getAllGardens } from "../controller/gardensController.js";

const router = express.Router();

router.get("/test", (req, res) => {
  res.send({ msg: "Test route." });
});

router.get("/all", getAllGardens);

export default router;
