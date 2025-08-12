"use client"

import Link from "next/link"
import { CheckCircle, Clock, Home, Building } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function UpdateVenueSuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <Card className="shadow-lg">
          <CardContent className="text-center p-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-3">Update Submitted!</h1>
            <p className="text-gray-600 mb-8">
              Your changes have been submitted for review. You'll be notified once they are approved by an admin.
            </p>
            <div className="bg-blue-50 rounded-lg p-6 mb-8 text-left">
              <h2 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                What happens next?
              </h2>
              <ul className="space-y-3 text-blue-800">
                <li className="flex items-start">
                    <p className="text-sm text-blue-700">
                      Our team will review your requested changes, typically within 24-48 hours. Your venue remains active with its current details during the review.
                    </p>
                </li>
                 <li className="flex items-start">
                    <p className="text-sm text-blue-700">
                      You will receive an email notification once the changes are approved.
                    </p>
                </li>
              </ul>
            </div>
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
          </CardContent>
        </Card>
      </div>
    </div>
  )
}