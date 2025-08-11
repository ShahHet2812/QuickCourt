"use client"

import type React from "react"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Mail, CheckCircle, RefreshCw, ArrowLeft, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

function VerifyEmailContent() {
  const searchParams = useSearchParams()
  const email = searchParams.get("email") || ""

  const [verificationCode, setVerificationCode] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [error, setError] = useState("")
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes in seconds
  const [canResend, setCanResend] = useState(false)

  // Countdown timer
  useEffect(() => {
    if (timeLeft > 0 && !isVerified) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0) {
      setCanResend(true)
    }
  }, [timeLeft, isVerified])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsVerifying(true)
    setError("")

    if (!verificationCode || verificationCode.length !== 6) {
      setError("Please enter a valid 6-digit verification code")
      setIsVerifying(false)
      return
    }

    try {
      // Simulate API call for verification
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate success/failure
          if (verificationCode === "123456") {
            resolve(true)
          } else {
            reject(new Error("Invalid verification code"))
          }
        }, 2000)
      })

      setIsVerified(true)
    } catch (error) {
      setError("Invalid verification code. Please try again.")
    } finally {
      setIsVerifying(false)
    }
  }

  const handleResendCode = async () => {
    setIsResending(true)
    setError("")

    try {
      // Simulate API call to resend verification email
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Reset timer and disable resend button
      setTimeLeft(300)
      setCanResend(false)

      console.log("Verification email resent to:", email)
    } catch (error) {
      setError("Failed to resend verification email. Please try again.")
    } finally {
      setIsResending(false)
    }
  }

  if (isVerified) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-green-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card className="shadow-2xl border-0">
            <CardContent className="text-center p-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h1 className="text-2xl font-bold text-slate-900 mb-2">Email Verified!</h1>
              <p className="text-gray-600 mb-6">
                Your email has been successfully verified. You can now access all features of QuickCourt.
              </p>
              <div className="space-y-3">
                <Link href="/login">
                  <Button className="w-full bg-green-600 hover:bg-green-700">Continue to Login</Button>
                </Link>
                <Link href="/">
                  <Button variant="outline" className="w-full bg-transparent">
                    Go to Homepage
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-green-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2">
            <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-2xl">Q</span>
            </div>
            <span className="text-2xl font-bold text-white">QuickCourt</span>
          </Link>
        </div>

        <Card className="shadow-2xl border-0">
          <CardHeader className="text-center pb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-blue-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-slate-900">Verify Your Email</CardTitle>
            <CardDescription className="text-gray-600">
              We've sent a 6-digit verification code to
              <br />
              <span className="font-medium text-slate-900">{email}</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleVerifyCode} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="code" className="text-sm font-medium text-slate-700">
                  Verification Code
                </Label>
                <Input
                  id="code"
                  type="text"
                  placeholder="Enter 6-digit code"
                  value={verificationCode}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "").slice(0, 6)
                    setVerificationCode(value)
                    setError("")
                  }}
                  className="h-12 rounded-xl border-gray-200 focus:border-green-500 focus:ring-green-500 text-center text-lg font-mono tracking-widest"
                  maxLength={6}
                />
              </div>

              <Button
                type="submit"
                disabled={isVerifying || verificationCode.length !== 6}
                className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl transition-all duration-200"
              >
                {isVerifying ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Verifying...</span>
                  </div>
                ) : (
                  "Verify Email"
                )}
              </Button>
            </form>

            {/* Timer and Resend */}
            <div className="text-center space-y-3">
              {!canResend ? (
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>Code expires in {formatTime(timeLeft)}</span>
                </div>
              ) : (
                <p className="text-sm text-red-600">Verification code has expired</p>
              )}

              <div className="flex items-center justify-center space-x-1 text-sm">
                <span className="text-gray-600">Didn't receive the code?</span>
                <button
                  onClick={handleResendCode}
                  disabled={!canResend || isResending}
                  className={`font-medium transition-colors ${
                    canResend && !isResending
                      ? "text-green-600 hover:text-green-700 cursor-pointer"
                      : "text-gray-400 cursor-not-allowed"
                  }`}
                >
                  {isResending ? (
                    <span className="flex items-center space-x-1">
                      <RefreshCw className="w-3 h-3 animate-spin" />
                      <span>Sending...</span>
                    </span>
                  ) : (
                    "Resend code"
                  )}
                </button>
              </div>
            </div>

            {/* Help Text */}
            <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
              <p className="mb-2">
                <strong>Can't find the email?</strong>
              </p>
              <ul className="space-y-1 text-xs">
                <li>• Check your spam or junk folder</li>
                <li>• Make sure you entered the correct email address</li>
                <li>• Wait a few minutes for the email to arrive</li>
              </ul>
            </div>

            {/* Back to Signup */}
            <div className="text-center">
              <Link
                href="/signup"
                className="inline-flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Sign Up</span>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-400">
            Need help?{" "}
            <Link href="/support" className="text-green-400 hover:text-green-300">
              Contact Support
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-green-900 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  )
}
