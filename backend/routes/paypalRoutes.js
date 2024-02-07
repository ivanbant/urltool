import express from "express";
import {
  subscriptionHook,
  createSubscription,
} from "../controllers/paypalController.js";

const router = express.Router();

router.route("/subscription/hook").post(subscriptionHook);
router.route("/subscription/create").post(createSubscription);

export default router;
