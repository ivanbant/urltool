import express from "express";
import {
  createUrl,
  createQRfromId,
  getUserUrls,
  getUrlClicks,
} from "../controllers/urlsController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(createUrl);
router.route("/user/:id").get(protect, getUserUrls);
router.route("/clicks/:urlId").get(protect, getUrlClicks);
router.route("/qr").post(createQRfromId);

export default router;
