"use client"

import Link from "next/link"
import { CheckCircle, Clock, Mail, Home, Building } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function ListVenueSuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <Card className="shadow-lg">
          <CardContent className="text-center p-8">
            {/* Success Icon */}
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>

            {/* Success Message */}
            <h1 className="text-3xl font-bold text-slate-900 mb-3">Venue Submitted Successfully!</h1>
            <p className="text-gray-600 mb-8">
              Thank you for listing your venue with QuickCourt. Your submission is now under review by our team.
            </p>

            {/* What's Next */}
            <div className="bg-blue-50 rounded-lg p-6 mb-8 text-left">
              <h2 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                What happens next?
              </h2>
              <ul className="space-y-3 text-blue-800">
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-xs font-bold">1</span>
                  </div>
                  <div>
                    <strong>Review Process (24-48 hours)</strong>
                    <p className="text-sm text-blue-700">
                      Our team will review your venue details and verify the information.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-xs font-bold">2</span>
                  </div>
                  <div>
                    <strong>Email Notification</strong>
                    <p className="text-sm text-blue-700">
                      You'll receive an email once your venue is approved and live.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-xs font-bold">3</span>
                  </div>
                  <div>
                    <strong>Start Receiving Bookings</strong>
                    <p className="text-sm text-blue-700">
                      Your venue will be visible to customers and you can start earning!
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h3 className="font-semibold text-slate-900 mb-3 flex items-center justify-center">
                <Mail className="w-5 h-5 mr-2" />
                Need Help?
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                If you have any questions about your submission or need assistance, our team is here to help.
              </p>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>Email:</strong> venues@quickcourt.com
                </p>
                <p>
                  <strong>Phone:</strong> +1 (555) 123-4567
                </p>
                <p>
                  <strong>Hours:</strong> Monday - Friday, 9 AM - 6 PM
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Link href="/owner-dashboard">
                <Button className="w-full bg-green-600 hover:bg-green-700 h-12 text-lg font-medium flex items-center justify-center">
                  <Building className="w-5 h-5 mr-2" />
                  Go to Owner Dashboard
                </Button>
              </Link>

              <Link href="/">
                <Button
                  variant="outline"
                  className="w-full h-12 text-lg font-medium flex items-center justify-center bg-transparent"
                >
                  <Home className="w-5 h-5 mr-2" />
                  Back to Homepage
                </Button>
              </Link>
            </div>

            {/* Reference Number */}
            <div className="mt-8 pt-6 border-t">
              <p className="text-sm text-gray-500">
                Reference ID: <span className="font-mono font-medium">#VEN-{Date.now().toString().slice(-6)}</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
