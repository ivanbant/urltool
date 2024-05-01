import express from "express";
import { paypalWebhook } from "../controllers/paypalController.js";

const router = express.Router();

router.route("/hook").post(paypalWebhook);

export default router;
