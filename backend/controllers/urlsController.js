import asyncHandler from "../middleware/asyncHandler.js";
import Url from "../models/urlModel.js";
import { validateUrl } from "../utils/validateUrl.js";
import { nanoid } from "nanoid";

// @desc    Create Short Url
// @route   POST /api/urls/
// @access  Public
const createUrl = asyncHandler(async (req, res) => {
  const { originalUrl } = req.body;
  const base = process.env.BASE_URL || "http://localhost:5000";

  const urlId = nanoid();
  if (validateUrl(originalUrl)) {
    try {
      let url = await Url.findOne({ originalUrl });
      if (url) {
        res.json(url);
      } else {
        const shortUrl = `${base}/${urlId}`;

        url = new Url({
          originalUrl,
          shortUrl,
          urlId,
          date: new Date(),
        });

        await url.save();
        res.status(201).json(url);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json("Server Error");
    }
  } else {
    res.status(400).json("Invalid Original Url");
  }
});

export { createUrl };
