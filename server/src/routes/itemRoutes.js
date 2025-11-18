import express from "express";
import {
  getAllItems,
  getItem,
  addItem,
  rateItem
} from "../controllers/itemController.js";

const router = express.Router();

router.get("/", getAllItems);
router.get("/:id", getItem);
router.post("/", addItem);
router.post("/:id/rate", rateItem);

export default router;
