import express from "express";
import { createUrl, createQRfromId } from "../controllers/urlsController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(createUrl);
router.route("/qr").post(createQRfromId);

export default router;
