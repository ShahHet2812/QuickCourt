import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { email, code } = await request.json()

    if (!email || !code) {
      return NextResponse.json({ error: "Email and verification code are required" }, { status: 400 })
    }

    // In a real app, you would:
    // 1. Look up the user by email
    // 2. Check if the verification code matches and hasn't expired
    // 3. Mark the user as verified in the database
    // 4. Generate a JWT token or session

    // Simulate verification logic
    if (code === "123456") {
      return NextResponse.json({
        success: true,
        message: "Email verified successfully",
      })
    } else {
      return NextResponse.json({ error: "Invalid verification code" }, { status: 400 })
    }
  } catch (error) {
    console.error("Email verification error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
