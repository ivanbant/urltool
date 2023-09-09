import express from "express";
import { createUrl } from "../controllers/urlsController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(createUrl);

export default router;
