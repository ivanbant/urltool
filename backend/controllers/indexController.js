import asyncHandler from "../middleware/asyncHandler.js";
import Url from "../models/urlModel.js";

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

export { routeUrl };
