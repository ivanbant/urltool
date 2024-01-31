import express from "express";
import {
  subscriptionHook,
  subscriptionHandeler,
} from "../controllers/paypalController.js";

const router = express.Router();

router.route("/subscription/hook").post(subscriptionHook);
router.route("/subscription").post(subscriptionHandeler);

export default router;
