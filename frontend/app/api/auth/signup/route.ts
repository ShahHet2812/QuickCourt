import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/database"
import { User } from "@/models/User"
import bcrypt from "bcryptjs"

export async function POST(request: Request) {
  try {
    await connectToDatabase()

    const body = await request.json()
    const {
      firstName,
      lastName,
      email,
      phone,
      password,
      avatarBase64,
    }: {
      firstName: string
      lastName: string
      email: string
      phone: string
      password: string
      avatarBase64?: string
    } = body

    if (!firstName || !lastName || !email || !phone || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const existing = await User.findOne({ email: email.toLowerCase() }).lean()
    if (existing) {
      return NextResponse.json({ error: "Email already registered" }, { status: 409 })
    }

    const passwordHash = await bcrypt.hash(password, 10)

    // In a real app, upload avatarBase64 to storage (S3, Cloudinary) and save the URL
    const avatarUrl = avatarBase64 ? "data:image/*;base64," + avatarBase64 : undefined

    const user = await User.create({
      firstName,
      lastName,
      email: email.toLowerCase(),
      phone,
      passwordHash,
      avatarUrl,
    })

    return NextResponse.json({
      id: user._id.toString(),
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    })
  } catch (error: unknown) {
    console.error("/api/auth/signup error", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}


