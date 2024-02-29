import asyncHandler from "../middleware/asyncHandler.js";
import Url from "../models/urlModel.js";
import Clicks from "../models/clickModel.js";
import User from "../models/userModel.js";
import { validateUrl } from "../utils/validateUrl.js";
import { nanoid } from "nanoid";
import QRCode from "qrcode";
import constants from "../constants.json" assert { type: "json" };

// @desc    Get Url Clicks
// @route   GET /api/urls/clicks
// @access  Private
const getUrlClicks = asyncHandler(async (req, res) => {
  const urlId = req.params.urlId;
  const startDate = new Date(req.query.startDate);
  const endDate = new Date(req.query.endDate);
  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(23, 59, 59, 999);

  try {
    const clicks = await Clicks.find({
      url: urlId,
      createdAt: {
        $gte: startDate,
        $lte: endDate,
      },
    });
    res.status(200).json(clicks);
  } catch (err) {
    res.status(500);
    throw new Error("Server Error: " + err);
  }
});

// @desc    Get User Urls
// @route   GET /api/urls/
// @access  Private
const getUserUrls = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  try {
    const urls = await Url.find({ user: userId });
    res.status(200).json(urls);
  } catch (err) {
    res.status(500);
    throw new Error("Server Error: " + err);
  }
});

// @desc    Create Short Url
// @route   POST /api/urls/
// @access  Public
const createUrl = asyncHandler(async (req, res) => {
  const { originalUrls, userId } = req.body;
  const base = process.env.BASE_URL || "http://localhost:5000";

  // Validate urls
  for (const originalUrl of originalUrls) {
    if (!validateUrl(originalUrl)) {
      res.status(400);
      throw new Error("Your urls are in invalid format");
    }
  }

  try {
    let user = await User.findById(userId);
    if (!user) {
      res.status(404);
      throw new Error("Something went wrong. Refresh and try again");
    }

    // Check if its a month since last update then reset uses
    if (new Date(user.nextResetDate) >= new Date()) {
      if (user.urlsUsesLeft <= 0) {
        res.status(400);
        throw new Error("You have no uses of service left");
      }

      if (user.urlsUsesLeft < originalUrls.length) {
        res.status(400);
        throw new Error("You try to create more urls than you have uses left");
      }
    } else {
      // Reset uses and reset date
      user.nextResetDate = new Date().setMonth(new Date().getMonth() + 1);
      user.urlsUsesLeft =
        user.tier === constants.plan[0].tier
          ? constants.plan[0].useLimit
          : constants.plan[1].useLimit;
    }

    let responseUrls = [];
    for (const originalUrl of originalUrls) {
      // check if url already used by user to not create a copy
      let url = await Url.findOne({ originalUrl, user });
      if (url) {
        responseUrls.push(url);
      } else {
        // check if shortened url code already exist. Needs to be unique.
        let urlId;
        let urlIdExists;

        do {
          urlIdExists = null;
          urlId = nanoid(6);
          urlIdExists = await Url.findOne({ urlId });
          if (!urlIdExists) break;
        } while (true);
        // create shorten url
        let shortUrl = `${base}/${urlId}`;

        url = new Url({
          user: user._id,
          originalUrl,
          shortUrl,
          urlId,
        });

        user.urlsUsesLeft--;

        await url.save();
        await user.save();

        responseUrls.push(url);
      }
    }
  } catch (err) {
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

export { createUrl, createQRfromId, getUserUrls, getUrlClicks };
