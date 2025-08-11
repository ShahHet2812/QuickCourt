"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-green-600 hover:text-green-700 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Terms of Service</h1>
          <p className="text-gray-600">Last updated: January 15, 2024</p>
        </div>

        <Card>
          <CardContent className="p-8 prose prose-slate max-w-none">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using QuickCourt, you accept and agree to be bound by the terms and provision of this
              agreement.
            </p>

            <h2>2. Use License</h2>
            <p>
              Permission is granted to temporarily download one copy of QuickCourt for personal, non-commercial
              transitory viewing only.
            </p>

            <h2>3. Booking and Payment</h2>
            <p>
              All bookings are subject to availability and confirmation. Payment is required at the time of booking.
              Cancellations must be made at least 2 hours before the scheduled time for a full refund.
            </p>

            <h2>4. User Accounts</h2>
            <p>
              You are responsible for safeguarding the password and for maintaining the confidentiality of your account.
            </p>

            <h2>5. Venue Listings</h2>
            <p>
              Venue owners are responsible for the accuracy of their listings and must comply with all local
              regulations.
            </p>

            <h2>6. Prohibited Uses</h2>
            <p>You may not use our service for any unlawful purpose or to solicit others to perform unlawful acts.</p>

            <h2>7. Limitation of Liability</h2>
            <p>
              QuickCourt shall not be liable for any indirect, incidental, special, consequential, or punitive damages.
            </p>

            <h2>8. Contact Information</h2>
            <p>If you have any questions about these Terms of Service, please contact us at legal@quickcourt.com.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
