import express from "express";
import { routeUrl } from "../controllers/indexController.js";

const router = express.Router();

router.route("/").get((req, res) => {
  res.send("Welcome to the URL shortener API!");
});
router.route("/:urlId").get(routeUrl);

export default router;
