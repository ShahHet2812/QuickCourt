"use client"

import { useState, useEffect } from "react"
import Link from 'next/link'
import { Plus, TrendingUp, Calendar, DollarSign, Users, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useAuth } from "@/context/AuthContext"

interface KpiData {
    totalBookings: number;
    activeCourts: number;
    monthlyEarnings: number;
    occupancyRate: number;
}
interface Facility {
    _id: string;
    name: string;
    sport: string;
    courts: number;
    status: string;
}
interface Booking {
    id: string;
    facility: string;
    court: string;
    customer: string;
    date: string;
    time: string;
    price: number;
    status: string;
}

export default function OwnerDashboard() {
  const { token } = useAuth();
  const [kpiData, setKpiData] = useState<KpiData | null>(null);
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [upcomingBookings, setUpcomingBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        setError("Not authenticated");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch('http://localhost:5000/api/owner/dashboard', {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!res.ok) throw new Error('Failed to fetch dashboard data');
        
        const { data } = await res.json();
        setKpiData(data.kpiData);
        setFacilities(data.facilities);
        setUpcomingBookings(data.upcomingBookings);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  if (loading) return <div className="text-center p-10">Loading Dashboard...</div>
  if (error) return <div className="text-center p-10 text-red-500">Error: {error}</div>

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Facility Owner Dashboard</h1>
            <p className="text-gray-600">Manage your sports facilities and track performance</p>
          </div>
          <Link href="/list-venue">
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="w-4 h-4 mr-2" />
              Add New Facility
            </Button>
          </Link>
        </div>

        {kpiData && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
                <CardContent className="p-6">
                <div className="flex items-center justify-between">
                    <div>
                    <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                    <p className="text-3xl font-bold text-slate-900">{kpiData.totalBookings}</p>
                    </div>
                    <div className="bg-blue-100 p-3 rounded-full"><Calendar className="w-6 h-6 text-blue-600" /></div>
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
                    <div className="bg-green-100 p-3 rounded-full"><Users className="w-6 h-6 text-green-600" /></div>
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
                    <div className="bg-yellow-100 p-3 rounded-full"><DollarSign className="w-6 h-6 text-yellow-600" /></div>
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
                    <div className="bg-purple-100 p-3 rounded-full"><TrendingUp className="w-6 h-6 text-purple-600" /></div>
                </div>
                </CardContent>
            </Card>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Booking Trends & Revenue Charts can be made dynamic later */}
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>My Facilities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {facilities.map((facility) => (
                <div key={facility._id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg">{facility.name}</h3>
                      <Badge className={ facility.status === "active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                        {facility.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                      <div><span className="font-medium">Sport:</span> {facility.sport}</div>
                      <div><span className="font-medium">Courts:</span> {facility.courts}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

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
                </TableRow>
              </TableHeader>
              <TableBody>
                {upcomingBookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell className="font-medium">{booking.facility}</TableCell>
                    <TableCell>{booking.court}</TableCell>
                    <TableCell>{booking.customer}</TableCell>
                    <TableCell>
                      <div>{booking.date}</div>
                      <div className="text-gray-600">{booking.time}</div>
                    </TableCell>
                    <TableCell className="font-medium text-green-600">${booking.price}</TableCell>
                    <TableCell>
                      <Badge className={ booking.status === "confirmed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                        {booking.status}
                      </Badge>
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