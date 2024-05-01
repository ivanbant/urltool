import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import config from "../config/config.js";
import { Request, Response } from "express";
import { PrivateRequest } from "../types/Auth.js";

// @desc    Login user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      tier: user.tier,
      urlsUsesLeft: user.urlsUsesLeft,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    Create Unregistered User
// @route   POST /api/users/unreg
// @access  Public
const createUnregUser = asyncHandler(async (req: Request, res: Response) => {
  const { fingerprint } = req.body;

  if (fingerprint !== 0) {
    const userExists = await User.findOne({ fingerprint });

    if (userExists) {
      return res.status(200).json({
        _id: userExists._id,
      });
    }
  }

  try {
    const user = await User.create({
      fingerprint,
      urlsUsesLeft: config.plan[0].useLimit,
      tier: config.plan[0].tier,
      uregUserEntryDate: new Date(),
    });
    res.status(201).json({
      _id: user._id,
      tier: user.tier,
      urlsUsesLeft: user.urlsUsesLeft,
    });
  } catch (error) {
    res.status(400);
    throw new Error("DB Error. Error: ", error);
  }
});

// @desc    Register user
// @route   POST /api/users/
// @access  Public
const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    urlsUsesLeft: config.plan[1].useLimit,
    tier: config.plan[1].tier,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      tier: user.tier,
      urlsUsesLeft: user.urlsUsesLeft,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Logout user
// @route   POST /api/users/logout
// @access  Private
const logoutUser = asyncHandler(async (req: PrivateRequest, res: Response) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expiresIn: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(
  async (req: PrivateRequest, res: Response) => {
    const user = await User.findById(req.user._id);
    if (user) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  }
);

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(
  async (req: PrivateRequest, res: Response) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        if (await user.matchPassword(req.body.password)) {
          user.password = req.body.newPassword || user.password;
        } else {
          res.status(401);
          throw new Error("Invalid password");
        }
      }

      const updatedUser = await user.save();

      res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  }
);

export {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  createUnregUser,
};
