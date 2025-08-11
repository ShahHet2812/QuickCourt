import { type NextRequest, NextResponse } from "next/server"
import { EmailService } from "@/lib/email-service"

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // In a real app, you would:
    // 1. Check if user exists and is not already verified
    // 2. Generate new verification code
    // 3. Update the code in database
    // 4. Send the email

    const verificationCode = EmailService.generateVerificationCode()
    const verificationUrl = EmailService.generateVerificationUrl(email, verificationCode)

    await EmailService.sendVerificationEmail({
      email,
      firstName: "User", // In real app, get from database
      verificationCode,
      verificationUrl,
    })

    return NextResponse.json({
      success: true,
      message: "Verification email sent successfully",
    })
  } catch (error) {
    console.error("Resend verification error:", error)
    return NextResponse.json({ error: "Failed to send verification email" }, { status: 500 })
  }
}
