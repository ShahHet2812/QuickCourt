"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { MapPin, Star, Clock, Users, Wifi, Car, Coffee, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useAuth } from "@/context/AuthContext";
import ReviewForm from "@/components/review-form";
import ReviewList from "@/components/review-list";

// Define a comprehensive type for a single venue
interface Venue {
  _id: string;
  name: string;
  location: string;
  price: number;
  rating: number; // This will now be dynamic
  reviews: number; // This will also be dynamic
  image?: string;
  sport: string;
  amenities: string[];
  courts: number;
  description?: string;
}

export default function VenueDetailsPage() {
  const [venue, setVenue] = useState<Venue | null>(null);
  const [reviews, setReviews] = useState<any[]>([]); // New state for reviews
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userHasReviewed, setUserHasReviewed] = useState(false); // New state
  const [refreshReviews, setRefreshReviews] = useState(false); // New state to trigger re-fetch
  
  const { user, isLoggedIn } = useAuth(); // Get user info from auth context
  const params = useParams();
  const { id } = params;

  const fetchVenueDetails = async () => {
    if (!id) return;
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/venues/${id}`);
      if (!res.ok) throw new Error('Failed to fetch venue details');
      const { data } = await res.json();
      setVenue(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    if (!id) return;
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/venues/${id}/reviews`);
        if (!res.ok) throw new Error('Failed to fetch reviews');
        const { data } = await res.json();
        setReviews(data);
        if (user) {
            const hasReviewed = data.some((review: any) => review.user._id === user._id);
            setUserHasReviewed(hasReviewed);
        }
    } catch (err: any) {
        console.error("Error fetching reviews:", err);
    }
  };

  useEffect(() => {
    fetchVenueDetails();
    fetchReviews();
  }, [id, refreshReviews]); // Added refreshReviews to dependency array

  if (loading) {
    return <div className="text-center p-10">Loading venue details...</div>;
  }

  if (error || !venue) {
    return <div className="text-center p-10 text-red-500">Error: {error || "Venue not found"}</div>;
  }
  
  const handleReviewSubmitted = () => {
      // Toggle the state to trigger a re-fetch of both venue and reviews
      setRefreshReviews(prev => !prev);
  }

  return (
    <div className="min-h-screen">
      {/* ... (existing image gallery and venue details section) */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
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
                  {/* Dynamic rating display */}
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < Math.round(venue.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                  <span className="font-medium ml-2">{venue.rating.toFixed(1)}</span>
                  <span className="ml-1">({venue.reviews} reviews)</span>
                </div>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">{venue.description || "No description available."}</p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Amenities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {venue.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-xl">
                    <Shield className="w-6 h-6 text-green-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-slate-900">{amenity}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Reviews ({venue.reviews})</h2>
              {isLoggedIn && !userHasReviewed ? (
                <ReviewForm venueId={venue._id} onReviewSubmitted={handleReviewSubmitted} />
              ) : isLoggedIn && userHasReviewed ? (
                <div className="bg-blue-50 text-blue-900 p-4 rounded-lg text-sm text-center">
                  You have already reviewed this venue. You can edit or delete your review below.
                </div>
              ) : (
                <div className="bg-gray-100 text-gray-600 p-4 rounded-lg text-sm text-center">
                  <Link href="/login" className="text-green-600 hover:underline font-medium">Log in</Link> to leave a review.
                </div>
              )}
              <div className="mt-8">
                <ReviewList venueId={venue._id} onReviewsUpdated={handleReviewSubmitted} />
              </div>
            </div>
          </div>
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