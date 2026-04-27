/* eslint-disable no-var */
"use server";

import mongoose from "mongoose";

const mongodb_uri = process.env.MONGODB_URI;

if (!mongodb_uri) {
  throw new Error("MONGODB_URI is not defined");
}

interface IMongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var _mongoose: IMongooseCache | undefined;
}

const cached = global._mongoose ?? { conn: null, promise: null };

export const dbConnect = async () => {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const opts: mongoose.ConnectOptions = {
      dbName: "nex-cart",
      maxPoolSize: 10,
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      retryWrites: true,
    };

    cached.promise = mongoose.connect(mongodb_uri, opts).then((mongoose) => {
      console.log("MongoDB connected successfully");
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error("Error connecting to MongoDB:", e);
    throw e;
  }

  return cached.conn;
};
