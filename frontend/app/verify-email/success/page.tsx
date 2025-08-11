"use client"

import Link from "next/link"
import { CheckCircle, ArrowRight, Home, LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function VerificationSuccessPage() {
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
          <CardContent className="text-center p-8">
            {/* Success Icon */}
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>

            {/* Success Message */}
            <h1 className="text-3xl font-bold text-slate-900 mb-3">Welcome to QuickCourt!</h1>
            <p className="text-gray-600 mb-2">Your email has been successfully verified.</p>
            <p className="text-gray-600 mb-8">
              You can now access all features and start booking your favorite sports venues.
            </p>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Link href="/login">
                <Button className="w-full bg-green-600 hover:bg-green-700 h-12 text-lg font-medium rounded-xl flex items-center justify-center space-x-2">
                  <LogIn className="w-5 h-5" />
                  <span>Sign In to Your Account</span>
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>

              <Link href="/">
                <Button
                  variant="outline"
                  className="w-full h-12 text-lg font-medium rounded-xl flex items-center justify-center space-x-2 bg-transparent border-gray-300 hover:bg-gray-50"
                >
                  <Home className="w-5 h-5" />
                  <span>Explore Venues</span>
                </Button>
              </Link>
            </div>

            {/* Additional Info */}
            <div className="mt-8 p-4 bg-green-50 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">What's Next?</h3>
              <ul className="text-sm text-green-700 space-y-1 text-left">
                <li>• Complete your profile setup</li>
                <li>• Browse and book sports venues</li>
                <li>• Manage your bookings in the dashboard</li>
                <li>• Enjoy exclusive member benefits</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-400">
            Questions?{" "}
            <Link href="/support" className="text-green-400 hover:text-green-300">
              Contact our support team
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
