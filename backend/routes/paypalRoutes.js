import express from "express";
import {
  subscriptionHook,
  createSubscription,
} from "../controllers/paypalController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/subscription/hook").post(subscriptionHook);
router.route("/subscription/create").post(protect, createSubscription);

export default router;
