"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-green-600 hover:text-green-700 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Privacy Policy</h1>
          <p className="text-gray-600">Last updated: January 15, 2024</p>
        </div>

        <Card>
          <CardContent className="p-8 prose prose-slate max-w-none">
            <h2>1. Information We Collect</h2>
            <p>
              We collect information you provide directly to us, such as when you create an account, make a booking, or
              contact us for support.
            </p>

            <h2>2. How We Use Your Information</h2>
            <p>
              We use the information we collect to provide, maintain, and improve our services, process transactions,
              and communicate with you.
            </p>

            <h2>3. Information Sharing</h2>
            <p>
              We do not sell, trade, or otherwise transfer your personal information to third parties without your
              consent, except as described in this policy.
            </p>

            <h2>4. Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information against unauthorized
              access, alteration, disclosure, or destruction.
            </p>

            <h2>5. Cookies</h2>
            <p>
              We use cookies to enhance your experience, gather general visitor information, and track visits to our
              website.
            </p>

            <h2>6. Your Rights</h2>
            <p>
              You have the right to access, update, or delete your personal information. You may also opt out of certain
              communications from us.
            </p>

            <h2>7. Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. We will notify you of any changes by posting the new
              policy on this page.
            </p>

            <h2>8. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at privacy@quickcourt.com.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
