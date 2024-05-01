import asyncHandler from "../middleware/asyncHandler";
import config from "../config/config";
import { Request, Response } from "express";

// @desc    Get Plans
// @route   GET /api/config
// @access  Public
const getPlansConfig = asyncHandler(async (_: Request, res: Response) => {
  const configs = await config();
  const plan = configs ? configs : null;
  res.status(200).json({ plan });
});

export { getPlansConfig };
