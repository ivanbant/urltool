import express from "express";
import { paypal } from "../controllers/subscriptionController.js";

const router = express.Router();

router.route("/").get(paypal);

export default router;
