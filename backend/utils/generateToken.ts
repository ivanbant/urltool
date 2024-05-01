import jwt from "jsonwebtoken";
import { Response } from "express";

const generateToken = async (res: Response, userId: number) => {
  if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET is not defined");
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  //Set jwt as http only cookie
  await res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};

export default generateToken;
