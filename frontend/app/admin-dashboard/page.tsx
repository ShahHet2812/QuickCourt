"use client"

import { useState } from "react"
import { Users, Building, Calendar, DollarSign, Search, Check, X, Ban, UserCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const adminKpis = {
  totalUsers: 2847,
  facilityOwners: 156,
  totalBookings: 8934,
  totalRevenue: 245600,
}

const pendingFacilities = [
  {
    id: 1,
    name: "Elite Sports Complex",
    owner: "John Smith",
    sport: "Tennis",
    location: "Downtown District",
    courts: 6,
    submittedDate: "2024-01-10",
    status: "pending",
  },
  {
    id: 2,
    name: "Champions Arena",
    owner: "Sarah Johnson",
    sport: "Badminton",
    location: "North Side",
    courts: 8,
    submittedDate: "2024-01-12",
    status: "pending",
  },
  {
    id: 3,
    name: "Victory Courts",
    owner: "Mike Wilson",
    sport: "Basketball",
    location: "East End",
    courts: 4,
    submittedDate: "2024-01-13",
    status: "under_review",
  },
]

const users = [
  {
    id: 1,
    name: "Alice Cooper",
    email: "alice@example.com",
    type: "customer",
    joinDate: "2024-01-05",
    bookings: 12,
    status: "active",
  },
  {
    id: 2,
    name: "Bob Martinez",
    email: "bob@example.com",
    type: "owner",
    joinDate: "2023-12-15",
    facilities: 2,
    status: "active",
  },
  {
    id: 3,
    name: "Carol Davis",
    email: "carol@example.com",
    type: "customer",
    joinDate: "2024-01-08",
    bookings: 5,
    status: "banned",
  },
  {
    id: 4,
    name: "David Brown",
    email: "david@example.com",
    type: "customer",
    joinDate: "2024-01-01",
    bookings: 8,
    status: "active",
  },
]

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [userFilter, setUserFilter] = useState("all")

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = userFilter === "all" || user.type === userFilter
    return matchesSearch && matchesFilter
  })

  const handleApproveFacility = (facilityId: number) => {
    console.log(`Approving facility ${facilityId}`)
  }

  const handleRejectFacility = (facilityId: number) => {
    console.log(`Rejecting facility ${facilityId}`)
  }

  const handleBanUser = (userId: number) => {
    console.log(`Banning user ${userId}`)
  }

  const handleUnbanUser = (userId: number) => {
    console.log(`Unbanning user ${userId}`)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage users, facilities, and platform operations</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-3xl font-bold text-slate-900">{adminKpis.totalUsers.toLocaleString()}</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div className="flex items-center mt-4 text-sm">
                <span className="text-green-600 font-medium">+15%</span>
                <span className="text-gray-600 ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Facility Owners</p>
                  <p className="text-3xl font-bold text-slate-900">{adminKpis.facilityOwners}</p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <Building className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <div className="flex items-center mt-4 text-sm">
                <span className="text-green-600 font-medium">+8%</span>
                <span className="text-gray-600 ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                  <p className="text-3xl font-bold text-slate-900">{adminKpis.totalBookings.toLocaleString()}</p>
                </div>
                <div className="bg-yellow-100 p-3 rounded-full">
                  <Calendar className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
              <div className="flex items-center mt-4 text-sm">
                <span className="text-green-600 font-medium">+22%</span>
                <span className="text-gray-600 ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Platform Revenue</p>
                  <p className="text-3xl font-bold text-slate-900">${adminKpis.totalRevenue.toLocaleString()}</p>
                </div>
                <div className="bg-purple-100 p-3 rounded-full">
                  <DollarSign className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <div className="flex items-center mt-4 text-sm">
                <span className="text-green-600 font-medium">+18%</span>
                <span className="text-gray-600 ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Facility Approvals */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Pending Facility Approvals</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Facility Name</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Sport</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Courts</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingFacilities.map((facility) => (
                  <TableRow key={facility.id}>
                    <TableCell className="font-medium">{facility.name}</TableCell>
                    <TableCell>{facility.owner}</TableCell>
                    <TableCell>{facility.sport}</TableCell>
                    <TableCell>{facility.location}</TableCell>
                    <TableCell>{facility.courts}</TableCell>
                    <TableCell>{facility.submittedDate}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          facility.status === "pending" ? "bg-yellow-100 text-yellow-800" : "bg-blue-100 text-blue-800"
                        }
                      >
                        {facility.status.replace("_", " ")}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => handleApproveFacility(facility.id)}
                        >
                          <Check className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
                          onClick={() => handleRejectFacility(facility.id)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* User Management */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>User Management</CardTitle>
              <div className="flex gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <select
                  value={userFilter}
                  onChange={(e) => setUserFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-200 rounded-md text-sm"
                >
                  <option value="all">All Users</option>
                  <option value="customer">Customers</option>
                  <option value="owner">Owners</option>
                </select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>Activity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge
                        className={user.type === "owner" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"}
                      >
                        {user.type}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.joinDate}</TableCell>
                    <TableCell>
                      {user.type === "customer" ? `${user.bookings} bookings` : `${user.facilities} facilities`}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={user.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                      >
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                        {user.status === "active" ? (
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
                            onClick={() => handleBanUser(user.id)}
                          >
                            <Ban className="w-4 h-4" />
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => handleUnbanUser(user.id)}
                          >
                            <UserCheck className="w-4 h-4" />
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
