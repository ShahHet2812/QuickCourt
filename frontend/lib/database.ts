import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI || ""

if (!MONGODB_URI) {
  // This helps surface a clear error in server logs
  console.warn("[database] Missing MONGODB_URI. Set it in your .env.local")
}

interface GlobalWithMongoose {
  mongoose: {
    conn: typeof mongoose | null
    promise: Promise<typeof mongoose> | null
  }
}

declare const global: GlobalWithMongoose & typeof globalThis

let cached = global.mongoose
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

export async function connectToDatabase(): Promise<typeof mongoose> {
  if (cached.conn) return cached.conn

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: process.env.MONGODB_DB || undefined,
    })
  }

  cached.conn = await cached.promise
  return cached.conn
}


