"use client"

import { useState, useEffect } from "react"

interface UseEmailVerificationProps {
  email: string
  onSuccess?: () => void
  onError?: (error: string) => void
}

interface EmailVerificationState {
  isVerifying: boolean
  isResending: boolean
  timeLeft: number
  canResend: boolean
  error: string | null
}

export function useEmailVerification({ email, onSuccess, onError }: UseEmailVerificationProps) {
  const [state, setState] = useState<EmailVerificationState>({
    isVerifying: false,
    isResending: false,
    timeLeft: 300, // 5 minutes
    canResend: false,
    error: null,
  })

  // Countdown timer
  useEffect(() => {
    if (state.timeLeft > 0) {
      const timer = setTimeout(() => {
        setState((prev) => ({
          ...prev,
          timeLeft: prev.timeLeft - 1,
          canResend: prev.timeLeft - 1 === 0,
        }))
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [state.timeLeft])

  const verifyCode = async (code: string) => {
    setState((prev) => ({ ...prev, isVerifying: true, error: null }))

    try {
      // Simulate API call
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (code === "123456") {
            resolve(true)
          } else {
            reject(new Error("Invalid verification code"))
          }
        }, 2000)
      })

      onSuccess?.()
    } catch (error) {
      const errorMessage = "Invalid verification code. Please try again."
      setState((prev) => ({ ...prev, error: errorMessage }))
      onError?.(errorMessage)
    } finally {
      setState((prev) => ({ ...prev, isVerifying: false }))
    }
  }

  const resendCode = async () => {
    setState((prev) => ({ ...prev, isResending: true, error: null }))

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setState((prev) => ({
        ...prev,
        timeLeft: 300,
        canResend: false,
        isResending: false,
      }))
    } catch (error) {
      const errorMessage = "Failed to resend verification email. Please try again."
      setState((prev) => ({ ...prev, error: errorMessage, isResending: false }))
      onError?.(errorMessage)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return {
    ...state,
    verifyCode,
    resendCode,
    formatTime: () => formatTime(state.timeLeft),
  }
}
