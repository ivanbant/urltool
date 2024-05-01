import { Types, Document } from "mongoose";

export interface SubscriptionMongoType extends Document, SubscriptionType {}
export type SubscriptionType = {
  _id?: Document["_id"];
  user?: Types.ObjectId;
  config?: Types.ObjectId;
  email?: string;
  payerId?: string;
  payerName?: string;
  payerSurname?: string;
  tier?: string;
  status?: string;
  subscriptionId?: string;
  planId?: string;
  paymentMethod?: string;
  startTime?: Date;
  nextBillingDate?: Date;
  cancelLink?: string;
  createdAt?: Date;
  updatedAt?: Date;
};
