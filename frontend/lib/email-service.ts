// Email service utilities for sending verification emails

interface SendVerificationEmailParams {
  email: string
  firstName: string
  verificationCode: string
  verificationUrl: string
}

interface SendReminderEmailParams {
  email: string
  firstName: string
  verificationUrl: string
  hoursLeft: number
}

export class EmailService {
  private static baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"

  static async sendVerificationEmail({
    email,
    firstName,
    verificationCode,
    verificationUrl,
  }: SendVerificationEmailParams) {
    try {
      // In a real app, this would call your email service (SendGrid, Resend, etc.)
      console.log("Sending verification email to:", email)
      console.log("Verification code:", verificationCode)
      console.log("Verification URL:", verificationUrl)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      return { success: true }
    } catch (error) {
      console.error("Failed to send verification email:", error)
      throw new Error("Failed to send verification email")
    }
  }

  static async sendReminderEmail({ email, firstName, verificationUrl, hoursLeft }: SendReminderEmailParams) {
    try {
      console.log("Sending reminder email to:", email)
      console.log("Hours left:", hoursLeft)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      return { success: true }
    } catch (error) {
      console.error("Failed to send reminder email:", error)
      throw new Error("Failed to send reminder email")
    }
  }

  static generateVerificationCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString()
  }

  static generateVerificationUrl(email: string, code: string): string {
    const params = new URLSearchParams({
      email,
      code,
      timestamp: Date.now().toString(),
    })
    return `${this.baseUrl}/verify-email?${params.toString()}`
  }

  static isCodeExpired(timestamp: number, expiryMinutes = 5): boolean {
    const now = Date.now()
    const expiryTime = timestamp + expiryMinutes * 60 * 1000
    return now > expiryTime
  }
}
