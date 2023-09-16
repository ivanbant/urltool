import asyncHandler from "../middleware/asyncHandler.js";
import Url from "../models/urlModel.js";
import { validateUrl } from "../utils/validateUrl.js";
import { nanoid } from "nanoid";

// @desc    Create Short Url
// @route   POST /api/urls/
// @access  Public
const createUrl = asyncHandler(async (req, res) => {
  const { originalUrls } = req.body;
  const base = process.env.BASE_URL || "http://localhost:5000";
  let urlIdExists, url;
  let urlId, shortUrl;
  let responseUrls = [];
  for (const originalUrl of originalUrls) {
    if (!validateUrl(originalUrl)) {
      res.status(400).json("Invalid Url");
      return;
    }
  }

  for (const originalUrl of originalUrls) {
    try {
      url = await Url.findOne({ originalUrl });
      if (url) {
        responseUrls.push(url);
      } else {
        do {
          urlId = nanoid(6);
          urlIdExists = await Url.findOne({ urlId });
          if (!urlIdExists) break;
        } while (urlIdExists);

        shortUrl = `${base}/${urlId}`;

        url = new Url({
          originalUrl,
          shortUrl,
          urlId,
          date: new Date(),
        });

        await url.save();
        responseUrls.push(url);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json("Server Error");
    }
  }
  res.status(201).json(responseUrls);
});

export { createUrl };
