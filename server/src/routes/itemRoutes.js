import express from "express";
import {
  getAllItems,
  getItem,
  addItem,
  addReview
} from "../controllers/itemController.js";

const router = express.Router();

router.get("/", getAllItems);
router.get("/:id", getItem);
router.post("/", addItem);
router.post("/:id/review", addReview);

export default router;
