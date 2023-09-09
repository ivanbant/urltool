import express from "express";
import { routeUrl } from "../controllers/indexController.js";

const router = express.Router();

router.route("/:urlId").get(routeUrl);

export default router;
