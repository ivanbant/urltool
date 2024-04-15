import express from "express";
import { getPlansConfig } from "../controllers/configController.js";
// import { protect,admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getPlansConfig);

export default router;
