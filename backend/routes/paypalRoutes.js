import express from "express";
import { subscriptionHook } from "../controllers/paypalController.js";

const router = express.Router();

router.route("/").post(subscriptionHook);

export default router;
