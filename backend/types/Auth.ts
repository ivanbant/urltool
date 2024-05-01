import { Request as ExpressRequest } from "express";
import { Types, Document } from "mongoose";

export interface UserMongoType extends Document, UserType {}

export type UserType = {
  _id?: Document["_id"];
  createdAt?: Date;
  updatedAt?: Date;
  tier?: string;
  urlsUsesLeft?: number;
  nextResetDate?: Date;
  isAdmin?: boolean;
  name?: string;
  email?: string;
  password?: string;
  subscription?: Types.ObjectId;
  fingerprint?: string;
  uregUserEntryDate?: Date;
};

export interface PrivateRequest extends ExpressRequest {
  user?: UserType;
}
