import mongoose from "mongoose";

export type TProduct = {
  _id?: mongoose.Types.ObjectId;
  title: string;
  shortDescription: string;
  fullDescription: string;
  price?: number;
  date?: Date;
  priority?: "low" | "medium" | "high";
  imageUrl?: string[];
  createdAt?: Date;
  updatedAt?: Date;
};
