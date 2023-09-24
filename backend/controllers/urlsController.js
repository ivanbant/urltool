import asyncHandler from "../middleware/asyncHandler.js";
import Url from "../models/urlModel.js";
import User from "../models/userModel.js";
import { validateUrl } from "../utils/validateUrl.js";
import { nanoid } from "nanoid";
import QRCode from "qrcode";
import constants from "../constants.json" assert { type: "json" };

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
  try {
    let user = req.user ? req.user : await User.findById(userId);
    if (!user) {
      res.status(404).json("User not found");
      return;
    } else {
      if (
        user.resetDate < new Date() &&
        user.resetDate.getMonth() !== new Date().getMonth() &&
        user.resetDate.getDay() <= new Date().getDay()
      ) {
        user.urlsCreated = 0;
        user.resetDate = new Date();
        await user.save();
      }
      if (user.urlsCreated >= constants.tier.tierUseLimit[user.tier]) {
        res.status(403);

        throw new Error("User has reached their limit of urls created");
      }
    }
    for (const originalUrl of originalUrls) {
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

        url = new Url({
          user: user._id,
          originalUrl,
          shortUrl,
          urlId,
        });
        user.urlsCreated++;

        await url.save();
        await user.save();

        responseUrls.push(url);
      }
    }
  } catch (err) {
    console.log(err);
    res.status(res.statusCode || 500);
    throw new Error(err.message || "Server Error");
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
