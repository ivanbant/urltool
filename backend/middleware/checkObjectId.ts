import { isValidObjectId } from "mongoose";
import { Request, Response, NextFunction } from "express";

function checkObjectId(req: Request, res: Response, next: NextFunction) {
  if (!isValidObjectId(req.params.id)) {
    res.status(404);
    throw new Error("Invalid Object Id");
  }
  next();
}

export default checkObjectId;
