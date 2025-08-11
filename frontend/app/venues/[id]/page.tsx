"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { MapPin, Star, Clock, Users, Wifi, Car, Coffee, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const venueData = {
  id: 1,
  name: "SportZone Arena",
  location: "123 Sports Street, Downtown, City Center",
  rating: 4.8,
  reviews: 124,
  price: 50,
  description:
    "Premier badminton facility with 8 professional courts, modern amenities, and excellent lighting. Perfect for both casual games and competitive matches.",
  images: [
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
  ],
  sports: ["Badminton"],
  amenities: [
    { icon: Car, name: "Free Parking", description: "50+ parking spaces" },
    { icon: Wifi, name: "Free WiFi", description: "High-speed internet" },
    { icon: Coffee, name: "Cafeteria", description: "Snacks and beverages" },
    { icon: Shield, name: "Security", description: "24/7 CCTV monitoring" },
    { icon: Users, name: "Changing Rooms", description: "Separate male/female facilities" },
    { icon: Clock, name: "Extended Hours", description: "Open 6 AM - 11 PM" },
  ],
  courts: [
    { id: 1, name: "Court 1", type: "Premium", features: ["AC", "Professional Lighting"] },
    { id: 2, name: "Court 2", type: "Premium", features: ["AC", "Professional Lighting"] },
    { id: 3, name: "Court 3", type: "Standard", features: ["Good Lighting"] },
    { id: 4, name: "Court 4", type: "Standard", features: ["Good Lighting"] },
  ],
  operatingHours: {
    weekdays: "6:00 AM - 11:00 PM",
    weekends: "6:00 AM - 12:00 AM",
  },
  contact: {
    phone: "+1 (555) 123-4567",
    email: "info@sportzonearena.com",
  },
}

export default function VenueDetailsPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isBookingFixed, setIsBookingFixed] = useState(false)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % venueData.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + venueData.images.length) % venueData.images.length)
  }

  return (
    <div className="min-h-screen">
      {/* Image Gallery */}
      <section className="relative h-96 md:h-[500px]">
        <div className="relative w-full h-full">
          <Image src={venueData.images[0] || "/placeholder.svg"} alt={venueData.name} fill className="object-cover" />
          <div className="absolute inset-0 bg-black bg-opacity-20" />
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Venue Header */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-2">
                {venueData.sports.map((sport, index) => (
                  <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    {sport}
                  </span>
                ))}
              </div>
              <h1 className="text-4xl font-bold text-slate-900 mb-2">{venueData.name}</h1>
              <div className="flex items-center gap-4 text-gray-600 mb-4">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-1" />
                  <span>{venueData.location}</span>
                </div>
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 mr-1" />
                  <span className="font-medium">{venueData.rating}</span>
                  <span className="ml-1">({venueData.reviews} reviews)</span>
                </div>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">{venueData.description}</p>
            </div>

            {/* Amenities */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Amenities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {venueData.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-xl">
                    <amenity.icon className="w-6 h-6 text-green-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-slate-900">{amenity.name}</h3>
                      <p className="text-gray-600 text-sm">{amenity.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Available Courts */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Available Courts</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {venueData.courts.map((court) => (
                  <Card key={court.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-lg">{court.name}</h3>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            court.type === "Premium" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {court.type}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {court.features.map((feature, index) => (
                          <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Operating Hours */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Operating Hours</h2>
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">Weekdays</h3>
                    <p className="text-gray-700">{venueData.operatingHours.weekdays}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">Weekends</h3>
                    <p className="text-gray-700">{venueData.operatingHours.weekends}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-green-600 mb-2">${venueData.price}/hour</div>
                    <p className="text-gray-600">Starting price per court</p>
                  </div>

                  <Link href={`/booking?venue=${venueData.id}&name=${encodeURIComponent(venueData.name)}`}>
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-lg py-3 mb-4">Book Now</Button>
                  </Link>

                  <div className="space-y-3 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Instant confirmation</span>
                      <span className="text-green-600">✓</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Free cancellation</span>
                      <span className="text-green-600">✓</span>
                    </div>
                    <div className="flex justify-between">
                      <span>24/7 support</span>
                      <span className="text-green-600">✓</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t">
                    <h3 className="font-semibold mb-3">Contact Information</h3>
                    <div className="space-y-2 text-sm">
                      <p className="text-gray-600">Phone: {venueData.contact.phone}</p>
                      <p className="text-gray-600">Email: {venueData.contact.email}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
