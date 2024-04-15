import asyncHandler from "../middleware/asyncHandler.js";
import config from "../config/config.js";

// @desc    Get Plans
// @route   GET /api/config
// @access  Public
const getPlansConfig = asyncHandler(async (req, res) => {
  const plan = config().plan;
  res.status(200).json({ plan });
});

export { getPlansConfig };
