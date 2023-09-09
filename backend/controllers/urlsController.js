import asyncHandler from "../middleware/asyncHandler.js";
import Url from "../models/urlModel.js";
import { validateUrl } from "../utils/validateUrl.js";
import { nanoid } from "nanoid";

// @desc    Reroute Url
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

// @desc    Reroute Url
// @route   GET /api/urls/route/:urlId
// @access  Public
const routeUrl = asyncHandler(async (req, res) => {
  try {
    const url = await Url.findOne({ urlId: req.params.urlId });
    if (url) {
      await Url.updateOne(
        {
          urlId: req.params.urlId,
        },
        { $inc: { clicks: 1 } }
      );
      return res.redirect(url.originalUrl);
    } else res.status(404).json("Not found");
  } catch (err) {
    console.log(err);
    res.status(500).json("Server Error");
  }
});

export { routeUrl, createUrl };
