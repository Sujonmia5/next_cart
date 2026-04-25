import { TProduct } from "@/types/product.interface";
import mongoose, { Schema, Model, models } from "mongoose";

const ProductSchema = new Schema<TProduct>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    shortDescription: {
      type: String,
      required: true,
    },
    fullDescription: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
    },
    date: {
      type: Date,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
    },
    imageUrl: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  },
);

const ProductModel: Model<TProduct> =
  models.Product || mongoose.model<TProduct>("Product", ProductSchema);

export default ProductModel;
