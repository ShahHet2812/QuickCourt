"use client"

import Link from "next/link"
import { ArrowLeft, Search, Book, CreditCard, Building, User, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const helpCategories = [
  {
    icon: Book,
    title: "Booking Help",
    description: "Learn how to book venues, manage reservations, and cancellation policies",
    articles: [
      "How to book a venue",
      "Cancellation and refund policy",
      "Modifying your booking",
      "Booking confirmation emails",
    ],
  },
  {
    icon: CreditCard,
    title: "Payment & Billing",
    description: "Payment methods, billing issues, and refund information",
    articles: [
      "Accepted payment methods",
      "Understanding charges and fees",
      "Refund processing times",
      "Payment security",
    ],
  },
  {
    icon: Building,
    title: "Venue Owners",
    description: "Information for venue owners and facility managers",
    articles: [
      "How to list your venue",
      "Managing bookings and availability",
      "Payout and earnings",
      "Venue approval process",
    ],
  },
  {
    icon: User,
    title: "Account Management",
    description: "Profile settings, password reset, and account security",
    articles: [
      "Creating and verifying your account",
      "Updating profile information",
      "Password and security settings",
      "Email preferences",
    ],
  },
]

const popularArticles = [
  "How do I book a sports venue?",
  "What is your cancellation policy?",
  "How do I list my venue on QuickCourt?",
  "What payment methods do you accept?",
  "How do I contact customer support?",
  "Can I modify my booking after confirmation?",
  "How long does venue approval take?",
  "What fees does QuickCourt charge?",
]

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-green-600 hover:text-green-700 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Help Center</h1>
          <p className="text-gray-600">Find answers to common questions and get help with QuickCourt</p>
        </div>

        {/* Search */}
        <div className="mb-12">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search for help articles..."
              className="pl-12 h-14 text-lg rounded-xl border-gray-200"
            />
          </div>
        </div>

        {/* Help Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {helpCategories.map((category, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <category.icon className="w-5 h-5 text-green-600" />
                  </div>
                  {category.title}
                </CardTitle>
                <p className="text-gray-600 text-sm">{category.description}</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {category.articles.map((article, articleIndex) => (
                    <li key={articleIndex}>
                      <Link
                        href={`/help/article/${article.toLowerCase().replace(/\s+/g, "-").replace(/[?]/g, "")}`}
                        className="text-green-600 hover:text-green-700 text-sm hover:underline"
                      >
                        {article}
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Popular Articles */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Popular Articles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {popularArticles.map((article, index) => (
                <Link
                  key={index}
                  href={`/help/article/${article.toLowerCase().replace(/\s+/g, "-").replace(/[?]/g, "")}`}
                  className="text-green-600 hover:text-green-700 hover:underline p-2 rounded hover:bg-green-50 transition-colors"
                >
                  {article}
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Contact Support */}
        <Card>
          <CardHeader>
            <CardTitle>Still need help?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-6">
              Can't find what you're looking for? Our support team is here to help you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/support">
                <Button className="bg-green-600 hover:bg-green-700 flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  Contact Support
                </Button>
              </Link>
              <Button variant="outline" className="flex items-center bg-transparent">
                <Phone className="w-4 h-4 mr-2" />
                Call +1 (555) 123-4567
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
