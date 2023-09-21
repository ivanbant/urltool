import asyncHandler from "../middleware/asyncHandler.js";
import Url from "../models/urlModel.js";
import User from "../models/userModel.js";
import { validateUrl } from "../utils/validateUrl.js";
import { nanoid } from "nanoid";
import QRCode from "qrcode";

// @desc    Create Short Url
// @route   POST /api/urls/
// @access  Public
const createUrl = asyncHandler(async (req, res) => {
  const { originalUrls, userId } = req.body;
  const base = process.env.BASE_URL || "http://localhost:5000";

  let responseUrls = [];
  for (const originalUrl of originalUrls) {
    if (!validateUrl(originalUrl)) {
      res.status(400).json("Invalid Url");
      return;
    }
  }

  for (const originalUrl of originalUrls) {
    try {
      let url = await Url.findOne({ originalUrl });
      if (url) {
        responseUrls.push(url);
      } else {
        let urlId;
        do {
          urlId = nanoid(6);
          let urlIdExists = await Url.findOne({ urlId });
          if (!urlIdExists) break;
        } while (urlIdExists);

        let shortUrl = `${base}/${urlId}`;

        let user = req.user ? req.user : await User.findById(userId);
        url = new Url({
          user: user._id,
          originalUrl,
          shortUrl,
          urlId,
        });

        await url.save();
        responseUrls.push(url);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json("Server Error: " + err);
      return;
    }
  }
  res.status(201).json(responseUrls);
});

const createQRfromId = asyncHandler(async (req, res) => {
  const { urlIds } = req.body;
  let responseUrls = [];
  for (const urlId of urlIds) {
    try {
      const url = await Url.findById(urlId);
      if (url) {
        if (!url.qrImage) {
          url.qrImage = await QRCode.toDataURL(`${url.shortUrl}?qrcode=true`);
          await url.save();
          responseUrls.push(url);
        }
      } else res.status(404).json("Not found");
    } catch (err) {
      res.status(500);
      throw new Error("Server Error: " + err);
    }
  }
  res.status(201).json(responseUrls);
});

export { createUrl, createQRfromId };
