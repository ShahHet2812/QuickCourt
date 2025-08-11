"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { MapPin, Star, Clock, Users, Wifi, Car, Coffee, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

// Define a comprehensive type for a single venue
interface Venue {
  _id: string;
  name: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  image?: string;
  sport: string;
  amenities: string[];
  courts: number;
  // Add other fields you might have, like description or operating hours
  description?: string;
}

export default function VenueDetailsPage() {
  const [venue, setVenue] = useState<Venue | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    if (id) {
      const fetchVenueDetails = async () => {
        try {
          setLoading(true);
          const res = await fetch(`http://localhost:5000/api/venues/${id}`);
          if (!res.ok) {
            throw new Error('Failed to fetch venue details');
          }
          const { data } = await res.json();
          setVenue(data);
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchVenueDetails();
    }
  }, [id]);

  if (loading) {
    return <div className="text-center p-10">Loading venue details...</div>;
  }

  if (error || !venue) {
    return <div className="text-center p-10 text-red-500">Error: {error || "Venue not found"}</div>;
  }

  return (
    <div className="min-h-screen">
      {/* Image Gallery */}
      <section className="relative h-96 md:h-[500px]">
        <div className="relative w-full h-full">
          <Image src={venue.image || "/placeholder.svg"} alt={venue.name} fill className="object-cover" />
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
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  {venue.sport}
                </span>
              </div>
              <h1 className="text-4xl font-bold text-slate-900 mb-2">{venue.name}</h1>
              <div className="flex items-center gap-4 text-gray-600 mb-4">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-1" />
                  <span>{venue.location}</span>
                </div>
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 mr-1" />
                  <span className="font-medium">{venue.rating}</span>
                  <span className="ml-1">({venue.reviews} reviews)</span>
                </div>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">{venue.description || "No description available."}</p>
            </div>

            {/* Amenities */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Amenities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {venue.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-xl">
                    <Shield className="w-6 h-6 text-green-600 mt-1" /> {/* Generic icon */}
                    <div>
                      <h3 className="font-semibold text-slate-900">{amenity}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Available Courts */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Available Courts</h2>
              <p className="text-gray-700">{venue.courts} court(s) available.</p>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-green-600 mb-2">₹{venue.price}/hour</div>
                    <p className="text-gray-600">Starting price per court</p>
                  </div>

                  <Link href={`/booking?venue=${venue._id}&name=${encodeURIComponent(venue.name)}`}>
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-lg py-3 mb-4">Book Now</Button>
                  </Link>

                  <div className="space-y-3 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Instant confirmation</span>
                      <span className="text-green-600">✓</span>
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