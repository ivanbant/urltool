import express from "express";
import { routeUrl, createUrl } from "../controllers/urlsController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(createUrl);
router.route("/route/:urlId").get(routeUrl);

export default router;
