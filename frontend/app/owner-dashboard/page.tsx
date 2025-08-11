"use client"

import { useState } from "react"
import { Plus, TrendingUp, Calendar, DollarSign, Users, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const kpiData = {
  totalBookings: 156,
  activeCourts: 8,
  monthlyEarnings: 12450,
  occupancyRate: 78,
}

const facilities = [
  {
    id: 1,
    name: "SportZone Arena",
    sport: "Badminton",
    courts: 4,
    status: "active",
    monthlyRevenue: 8500,
    occupancyRate: 85,
  },
  {
    id: 2,
    name: "Tennis Pro Center",
    sport: "Tennis",
    courts: 3,
    status: "active",
    monthlyRevenue: 6200,
    occupancyRate: 72,
  },
  {
    id: 3,
    name: "Basketball Hub",
    sport: "Basketball",
    courts: 2,
    status: "maintenance",
    monthlyRevenue: 3800,
    occupancyRate: 45,
  },
]

const upcomingBookings = [
  {
    id: 1,
    facility: "SportZone Arena",
    court: "Court 1",
    customer: "John Doe",
    date: "2024-01-15",
    time: "18:00 - 20:00",
    price: 120,
    status: "confirmed",
  },
  {
    id: 2,
    facility: "Tennis Pro Center",
    court: "Court A",
    customer: "Jane Smith",
    date: "2024-01-15",
    time: "16:00 - 17:00",
    price: 75,
    status: "confirmed",
  },
  {
    id: 3,
    facility: "SportZone Arena",
    court: "Court 2",
    customer: "Mike Johnson",
    date: "2024-01-15",
    time: "19:00 - 21:00",
    price: 120,
    status: "pending",
  },
  {
    id: 4,
    facility: "Basketball Hub",
    court: "Court 1",
    customer: "Sarah Wilson",
    date: "2024-01-16",
    time: "14:00 - 15:00",
    price: 60,
    status: "confirmed",
  },
]

// Mock chart data
const chartData = [
  { month: "Jan", bookings: 45, revenue: 3200 },
  { month: "Feb", bookings: 52, revenue: 3800 },
  { month: "Mar", bookings: 48, revenue: 3500 },
  { month: "Apr", bookings: 61, revenue: 4200 },
  { month: "May", bookings: 55, revenue: 3900 },
  { month: "Jun", bookings: 67, revenue: 4800 },
]

export default function OwnerDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("month")

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Facility Owner Dashboard</h1>
            <p className="text-gray-600">Manage your sports facilities and track performance</p>
          </div>
          <Button className="bg-green-600 hover:bg-green-700">
            <Plus className="w-4 h-4 mr-2" />
            Add New Facility
          </Button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                  <p className="text-3xl font-bold text-slate-900">{kpiData.totalBookings}</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div className="flex items-center mt-4 text-sm">
                <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                <span className="text-green-600 font-medium">+12%</span>
                <span className="text-gray-600 ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Courts</p>
                  <p className="text-3xl font-bold text-slate-900">{kpiData.activeCourts}</p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <div className="flex items-center mt-4 text-sm">
                <span className="text-gray-600">Across 3 facilities</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Monthly Earnings</p>
                  <p className="text-3xl font-bold text-slate-900">${kpiData.monthlyEarnings.toLocaleString()}</p>
                </div>
                <div className="bg-yellow-100 p-3 rounded-full">
                  <DollarSign className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
              <div className="flex items-center mt-4 text-sm">
                <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                <span className="text-green-600 font-medium">+8%</span>
                <span className="text-gray-600 ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Occupancy Rate</p>
                  <p className="text-3xl font-bold text-slate-900">{kpiData.occupancyRate}%</p>
                </div>
                <div className="bg-purple-100 p-3 rounded-full">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <div className="flex items-center mt-4 text-sm">
                <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                <span className="text-green-600 font-medium">+5%</span>
                <span className="text-gray-600 ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Booking Trends Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Booking Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-end justify-between space-x-2">
                {chartData.map((data, index) => (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div
                      className="bg-green-600 rounded-t w-full transition-all hover:bg-green-700"
                      style={{ height: `${(data.bookings / 70) * 200}px` }}
                    />
                    <span className="text-xs text-gray-600 mt-2">{data.month}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center text-sm text-gray-600">Monthly Bookings</div>
            </CardContent>
          </Card>

          {/* Revenue Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Revenue Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-end justify-between space-x-2">
                {chartData.map((data, index) => (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div
                      className="bg-blue-600 rounded-t w-full transition-all hover:bg-blue-700"
                      style={{ height: `${(data.revenue / 5000) * 200}px` }}
                    />
                    <span className="text-xs text-gray-600 mt-2">{data.month}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center text-sm text-gray-600">Monthly Revenue ($)</div>
            </CardContent>
          </Card>
        </div>

        {/* Facilities Management */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>My Facilities</CardTitle>
              <Button variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Add Court
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {facilities.map((facility) => (
                <div
                  key={facility.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg">{facility.name}</h3>
                      <Badge
                        className={
                          facility.status === "active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                        }
                      >
                        {facility.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Sport:</span> {facility.sport}
                      </div>
                      <div>
                        <span className="font-medium">Courts:</span> {facility.courts}
                      </div>
                      <div>
                        <span className="font-medium">Monthly Revenue:</span> $
                        {facility.monthlyRevenue.toLocaleString()}
                      </div>
                      <div>
                        <span className="font-medium">Occupancy:</span> {facility.occupancyRate}%
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Bookings */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Facility</TableHead>
                  <TableHead>Court</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {upcomingBookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell className="font-medium">{booking.facility}</TableCell>
                    <TableCell>{booking.court}</TableCell>
                    <TableCell>{booking.customer}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{booking.date}</div>
                        <div className="text-gray-600">{booking.time}</div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-green-600">${booking.price}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          booking.status === "confirmed"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }
                      >
                        {booking.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                        {booking.status === "pending" && (
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            Confirm
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
