"use client"

import { useState } from "react"
import { Calendar, MapPin, X, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

const bookings = [
  {
    id: 1,
    venueName: "SportZone Arena",
    courtName: "Court 1",
    sport: "Badminton",
    date: "2024-01-15",
    time: "18:00 - 20:00",
    duration: 2,
    price: 120,
    status: "confirmed",
    location: "Downtown, City Center",
    bookingDate: "2024-01-10",
  },
  {
    id: 2,
    venueName: "Elite Tennis Club",
    courtName: "Court A",
    sport: "Tennis",
    date: "2024-01-18",
    time: "16:00 - 17:00",
    duration: 1,
    price: 75,
    status: "confirmed",
    location: "Uptown, North District",
    bookingDate: "2024-01-12",
  },
  {
    id: 3,
    venueName: "Green Field Complex",
    courtName: "Field 1",
    sport: "Football",
    date: "2024-01-20",
    time: "19:00 - 21:00",
    duration: 2,
    price: 200,
    status: "pending",
    location: "Suburbs, East Side",
    bookingDate: "2024-01-13",
  },
  {
    id: 4,
    venueName: "City Sports Hub",
    courtName: "Court 3",
    sport: "Basketball",
    date: "2024-01-12",
    time: "14:00 - 15:00",
    duration: 1,
    price: 60,
    status: "completed",
    location: "Central Park Area",
    bookingDate: "2024-01-08",
  },
  {
    id: 5,
    venueName: "SportZone Arena",
    courtName: "Court 2",
    sport: "Badminton",
    date: "2024-01-10",
    time: "20:00 - 21:00",
    duration: 1,
    price: 60,
    status: "cancelled",
    location: "Downtown, City Center",
    bookingDate: "2024-01-05",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "confirmed":
      return "bg-green-100 text-green-800"
    case "pending":
      return "bg-yellow-100 text-yellow-800"
    case "completed":
      return "bg-blue-100 text-blue-800"
    case "cancelled":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function UserDashboard() {
  const [statusFilter, setStatusFilter] = useState("all")
  const [sportFilter, setSportFilter] = useState("all")

  const filteredBookings = bookings.filter((booking) => {
    const matchesStatus = statusFilter === "all" || booking.status === statusFilter
    const matchesSport = sportFilter === "all" || booking.sport.toLowerCase() === sportFilter
    return matchesStatus && matchesSport
  })

  const handleCancelBooking = (bookingId: number) => {
    // In a real app, this would make an API call
    console.log(`Cancelling booking ${bookingId}`)
  }

  const stats = {
    total: bookings.length,
    upcoming: bookings.filter((b) => b.status === "confirmed" || b.status === "pending").length,
    completed: bookings.filter((b) => b.status === "completed").length,
    cancelled: bookings.filter((b) => b.status === "cancelled").length,
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">My Bookings</h1>
          <p className="text-gray-600 text-sm sm:text-base">Manage your sports venue bookings</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-900 mb-1">{stats.total}</div>
                <div className="text-sm text-gray-600">Total Bookings</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-1">{stats.upcoming}</div>
                <div className="text-sm text-gray-600">Upcoming</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">{stats.completed}</div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600 mb-1">{stats.cancelled}</div>
                <div className="text-sm text-gray-600">Cancelled</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <span className="font-medium text-sm sm:text-base">Filters:</span>
            </div>
            <div className="grid grid-cols-2 sm:flex sm:gap-4">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sportFilter} onValueChange={setSportFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Sport" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sports</SelectItem>
                  <SelectItem value="badminton">Badminton</SelectItem>
                  <SelectItem value="tennis">Tennis</SelectItem>
                  <SelectItem value="football">Football</SelectItem>
                  <SelectItem value="basketball">Basketball</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Bookings List */}
        <div className="space-y-4">
          {filteredBookings.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <div className="text-gray-400 mb-4">
                  <Calendar className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No bookings found</h3>
                <p className="text-gray-500 mb-6">You don't have any bookings matching the selected filters.</p>
                <Link href="/venues">
                  <Button className="bg-green-600 hover:bg-green-700">Book a Venue</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            filteredBookings.map((booking) => (
              <Card key={booking.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col gap-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1 truncate">
                            {booking.venueName}
                          </h3>
                          <div className="flex items-center text-gray-600 mb-2">
                            <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                            <span className="text-sm truncate">{booking.location}</span>
                          </div>
                        </div>
                        <Badge className={`${getStatusColor(booking.status)} ml-2 flex-shrink-0`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-sm">
                        <div>
                          <span className="font-medium text-gray-700">Court:</span>
                          <p className="text-gray-600">
                            {booking.courtName} ({booking.sport})
                          </p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Date & Time:</span>
                          <p className="text-gray-600">{booking.date}</p>
                          <p className="text-gray-600">{booking.time}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Duration & Price:</span>
                          <p className="text-gray-600">{booking.duration} hour(s)</p>
                          <p className="text-green-600 font-semibold">${booking.price}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2 pt-3 border-t sm:border-t-0 sm:pt-0">
                      {booking.status === "confirmed" && (
                        <>
                          <Button variant="outline" size="sm">
                            Reschedule
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleCancelBooking(booking.id)}
                            className="text-red-600 border-red-200 hover:bg-red-50"
                          >
                            <X className="w-4 h-4 mr-1" />
                            Cancel
                          </Button>
                        </>
                      )}
                      {booking.status === "pending" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleCancelBooking(booking.id)}
                          className="text-red-600 border-red-200 hover:bg-red-50"
                        >
                          <X className="w-4 h-4 mr-1" />
                          Cancel
                        </Button>
                      )}
                      {booking.status === "completed" && (
                        <Button variant="outline" size="sm">
                          Book Again
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
