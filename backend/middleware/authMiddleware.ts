import jwt, { JwtPayload } from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/userModel.js";
import { Response, NextFunction } from "express";
import { PrivateRequest } from "../types/Auth.js";

const protect = asyncHandler(
  async (req: PrivateRequest, res: Response, next: NextFunction) => {
    let token;
    token = req.cookies.jwt;

    if (token) {
      if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET is not defined");

      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
        req.user = await User.findById(decoded.userId).select("-password");
        next();
      } catch (error) {
        res.status(401);
        throw new Error("Not authorized, token failed");
      }
    } else {
      res.status(401);
      throw new Error("Not authorized, no token");
    }
  }
);

const admin = asyncHandler(
  async (req: PrivateRequest, res: Response, next: NextFunction) => {
    if (req.user && req.user.isAdmin) {
      next();
    } else {
      res.status(401);
      throw new Error("Not authorized as admin");
    }
  }
);

export { protect, admin };
