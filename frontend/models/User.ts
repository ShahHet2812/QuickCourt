import mongoose, { Schema, Document, Model } from "mongoose"

export interface IUser extends Document {
  firstName: string
  lastName: string
  email: string
  phone: string
  passwordHash: string
  avatarUrl?: string
  createdAt: Date
  updatedAt: Date
}

const UserSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },
    passwordHash: { type: String, required: true },
    avatarUrl: { type: String },
  },
  { timestamps: true }
)

export const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema)


