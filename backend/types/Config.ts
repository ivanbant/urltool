import { Document } from "mongoose";

export interface ConfigMongoType extends Document, ConfigType {}

export type PlanType = {
  paypal_id: string;
  price: string;
  tier: string;
  useLimit: number;
};

export type ConfigType = {
  _id?: Document["_id"];
  plan: PlanType[];
};
