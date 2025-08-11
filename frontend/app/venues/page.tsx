"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Search, MapPin, Star, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const venues = [
  {
    id: 1,
    name: "SportZone Arena",
    location: "Downtown, City Center",
    price: 50,
    rating: 4.8,
    reviews: 124,
    image: "/sports-arena-badminton.png",
    sport: "Badminton",
    amenities: ["Parking", "AC", "Changing Room"],
  },
  {
    id: 2,
    name: "Elite Tennis Club",
    location: "Uptown, North District",
    price: 75,
    rating: 4.9,
    reviews: 89,
    image: "/tennis-club-court.png",
    sport: "Tennis",
    amenities: ["Parking", "Pro Shop", "Coaching"],
  },
  {
    id: 3,
    name: "Green Field Complex",
    location: "Suburbs, East Side",
    price: 100,
    rating: 4.7,
    reviews: 156,
    image: "/football-field-turf.png",
    sport: "Football",
    amenities: ["Floodlights", "Parking", "Cafeteria"],
  },
  {
    id: 4,
    name: "City Sports Hub",
    location: "Central Park Area",
    price: 60,
    rating: 4.6,
    reviews: 203,
    image: "/sports-hub-basketball.png",
    sport: "Basketball",
    amenities: ["Indoor", "AC", "Scoreboard"],
  },
  {
    id: 5,
    name: "Ace Badminton Center",
    location: "West End, Mall District",
    price: 45,
    rating: 4.5,
    reviews: 78,
    image: "/placeholder.svg?height=200&width=300",
    sport: "Badminton",
    amenities: ["Multiple Courts", "Equipment Rental", "Parking"],
  },
  {
    id: 6,
    name: "Premier Tennis Courts",
    location: "South Bay, Residential",
    price: 80,
    rating: 4.8,
    reviews: 92,
    image: "/placeholder.svg?height=200&width=300",
    sport: "Tennis",
    amenities: ["Clay Courts", "Lighting", "Pro Shop"],
  },
  // Cricket venues
  {
    id: 7,
    name: "Royal Cricket Arena",
    location: "Old Town, West Block",
    price: 65,
    rating: 4.6,
    reviews: 81,
    image: "/placeholder.jpg",
    sport: "Cricket",
    amenities: ["Practice Nets", "Parking", "Scoreboard"],
  },
  {
    id: 8,
    name: "Green Pitch Grounds",
    location: "Lakeside, South Park",
    price: 55,
    rating: 4.5,
    reviews: 64,
    image: "/placeholder.jpg",
    sport: "Cricket",
    amenities: ["Floodlights", "Changing Rooms", "Cafeteria"],
  },
  {
    id: 9,
    name: "Metro Cricket Complex",
    location: "Metro Center, Block A",
    price: 70,
    rating: 4.7,
    reviews: 102,
    image: "/placeholder.jpg",
    sport: "Cricket",
    amenities: ["Multiple Pitches", "Equipment Rental", "Parking"],
  },
]

export default function VenuesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sportFilter, setSportFilter] = useState("all")
  const [priceFilter, setPriceFilter] = useState("all")
  const [ratingFilter, setRatingFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  // Read sport from URL and react to client-side navigation changes
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const sportParam = searchParams.get("sport")
    setSportFilter(sportParam ? sportParam.toLowerCase() : "all")
  }, [searchParams])

  const filteredVenues = venues.filter((venue) => {
    const matchesSearch =
      venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      venue.location.toLowerCase().includes(searchTerm.toLowerCase())
    
    // Fix case sensitivity issue - normalize both sides to lowercase
    const venueSportLower = venue.sport.toLowerCase()
    const sportFilterLower = sportFilter.toLowerCase()
    const matchesSport = sportFilter === "all" || venueSportLower === sportFilterLower
    
    const matchesPrice =
      priceFilter === "all" ||
      (priceFilter === "low" && venue.price < 60) ||
      (priceFilter === "medium" && venue.price >= 60 && venue.price < 80) ||
      (priceFilter === "high" && venue.price >= 80)
    const matchesRating = ratingFilter === "all" || venue.rating >= Number.parseFloat(ratingFilter)

    return matchesSearch && matchesSport && matchesPrice && matchesRating
  })

  const totalPages = Math.ceil(filteredVenues.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedVenues = filteredVenues.slice(startIndex, startIndex + itemsPerPage)

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">Find Your Perfect Venue</h1>
          <p className="text-gray-600 text-sm sm:text-base">Discover and book amazing sports venues near you</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="flex flex-col gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search venues or locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 rounded-xl border-gray-200"
              />
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              <div className="flex gap-2">
                <Select
                  value={sportFilter}
                  onValueChange={(value) => {
                    setSportFilter(value)
                    const params = new URLSearchParams(searchParams.toString())
                    if (value === "all") {
                      params.delete("sport")
                    } else {
                      params.set("sport", value)
                    }
                    const query = params.toString()
                    router.push(query ? `${pathname}?${query}` : pathname)
                  }}
                >
                  <SelectTrigger className="w-full sm:w-40 h-12 rounded-xl">
                    <SelectValue placeholder="Sport Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">🏟️ All Sports</SelectItem>
                  <SelectItem value="badminton">🏸 Badminton</SelectItem>
                  <SelectItem value="tennis">🎾 Tennis</SelectItem>
                  <SelectItem value="football">⚽ Football</SelectItem>
                  <SelectItem value="basketball">🏀 Basketball</SelectItem>
                    <SelectItem value="cricket">🏏 Cricket</SelectItem>
                  </SelectContent>
                </Select>
                {sportFilter !== "all" && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSportFilter("all")
                      const params = new URLSearchParams(searchParams.toString())
                      params.delete("sport")
                      const query = params.toString()
                      router.push(query ? `${pathname}?${query}` : pathname)
                    }}
                    className="h-12 px-4 text-sm"
                  >
                    Clear Filter
                  </Button>
                )}
              </div>

              <Select value={priceFilter} onValueChange={setPriceFilter}>
                <SelectTrigger className="w-full sm:w-40 h-12 rounded-xl">
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="low">Under $60</SelectItem>
                  <SelectItem value="medium">$60 - $80</SelectItem>
                  <SelectItem value="high">$80+</SelectItem>
                </SelectContent>
              </Select>

              <Select value={ratingFilter} onValueChange={setRatingFilter}>
                <SelectTrigger className="w-full sm:w-40 h-12 rounded-xl">
                  <SelectValue placeholder="Rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ratings</SelectItem>
                  <SelectItem value="4.5">4.5+ Stars</SelectItem>
                  <SelectItem value="4.0">4.0+ Stars</SelectItem>
                  <SelectItem value="3.5">3.5+ Stars</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {paginatedVenues.length} of {filteredVenues.length} venues
            {sportFilter !== "all" && (
              <span className="ml-2 inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                Filtered by: {sportFilter.charAt(0).toUpperCase() + sportFilter.slice(1)}
              </span>
            )}
          </p>
        </div>

        {/* Venues Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {paginatedVenues.map((venue) => (
            <Card key={venue.id} className="hover:shadow-lg transition-all hover:scale-105">
              <CardContent className="p-0">
                <div className="relative h-48">
                  <Image
                    src={venue.image || "/placeholder.svg"}
                    alt={venue.name}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                  <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-sm font-medium">
                    {venue.sport}
                  </div>
                  <div className="absolute top-3 left-3 bg-green-600 text-white px-2 py-1 rounded-full text-sm font-bold">
                    ${venue.price}/hr
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">{venue.name}</h3>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">{venue.location}</span>
                  </div>
                  <div className="flex items-center mb-3">
                    <Star className="w-4 h-4 text-yellow-400 mr-1" />
                    <span className="text-sm font-medium mr-1">{venue.rating}</span>
                    <span className="text-sm text-gray-500">({venue.reviews} reviews)</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {venue.amenities.slice(0, 3).map((amenity, index) => (
                      <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                        {amenity}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/venues/${venue.id}`} className="flex-1">
                      <Button variant="outline" className="w-full bg-transparent">
                        View Details
                      </Button>
                    </Link>
                    <Link href={`/booking?venue=${venue.id}&name=${encodeURIComponent(venue.name)}`}>
                      <Button className="bg-green-600 hover:bg-green-700">Book Now</Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-1 sm:space-x-2 overflow-x-auto pb-2">
            <Button
              variant="outline"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="rounded-xl flex-shrink-0"
              size="sm"
            >
              <ChevronLeft className="w-4 h-4 sm:mr-1" />
              <span className="hidden sm:inline">Previous</span>
            </Button>

            <div className="flex space-x-1 mx-2">
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let page
                if (totalPages <= 5) {
                  page = i + 1
                } else if (currentPage <= 3) {
                  page = i + 1
                } else if (currentPage >= totalPages - 2) {
                  page = totalPages - 4 + i
                } else {
                  page = currentPage - 2 + i
                }

                return (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl text-xs sm:text-sm ${
                      currentPage === page ? "bg-green-600 hover:bg-green-700" : ""
                    }`}
                    size="sm"
                  >
                    {page}
                  </Button>
                )
              })}
            </div>

            <Button
              variant="outline"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="rounded-xl flex-shrink-0"
              size="sm"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="w-4 h-4 sm:ml-1" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
