"use client"

import { useState, useEffect } from "react"
import Link from 'next/link'
import { Plus, TrendingUp, Calendar, DollarSign, Users, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useAuth } from "@/context/AuthContext"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

interface KpiData {
    totalBookings: number;
    activeCourts: number;
    monthlyEarnings: number;}
interface Court {
  name: string;
  sport: string;
  price: number;
}
interface Facility {
    _id: string;
    name: string;
    courts: Court[] | number; // Allow courts to be a number for old data
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
interface ChartData {
    bookingTrends: { [key: string]: number };
    earningsSummary: { [key: string]: number };
    peakBookingHours: { [key: string]: number };
}

export default function OwnerDashboard() {
  const { token } = useAuth();
  const [kpiData, setKpiData] = useState<KpiData | null>(null);
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [upcomingBookings, setUpcomingBookings] = useState<Booking[]>([]);
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = async () => {
    if (!token) {
      setError("Not authenticated");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/owner/dashboard`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to fetch dashboard data');
      }
      
      const { data } = await res.json();
      setKpiData(data.kpiData);
      setFacilities(data.facilities);
      setUpcomingBookings(data.upcomingBookings);
      setChartData(data.charts);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, [token]);

  const handleDelete = async (venueId: string) => {
    if (window.confirm("Are you sure you want to request deletion of this venue? This action cannot be undone.")) {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/owner/venues/${venueId}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error || "Failed to request deletion");
        }
        alert("Deletion request sent for admin approval.");
        fetchData(); // Refresh data to show updated status
      } catch (error: any) {
        console.error(error);
        alert(`Error: ${error.message}`);
      }
    }
  };

  if (loading) return <div className="text-center p-10">Loading Dashboard...</div>
  if (error) return <div className="text-center p-10 text-red-500">Error: {error}</div>

  const bookingTrendsData = chartData ? Object.entries(chartData.bookingTrends).map(([date, count]) => ({ date, count })) : [];
  const earningsSummaryData = chartData ? Object.entries(chartData.earningsSummary).map(([name, earnings]) => ({ name, earnings })) : [];
  const peakBookingHoursData = chartData ? Object.entries(chartData.peakBookingHours).map(([hour, count]) => ({ hour: `${hour}:00`, count })) : [];
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

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
                    <p className="text-3xl font-bold text-slate-900">₹{kpiData.monthlyEarnings.toLocaleString()}</p>
                    </div>
                    <div className="bg-yellow-100 p-3 rounded-full"><DollarSign className="w-6 h-6 text-yellow-600" /></div>
                </div>
                </CardContent>
            </Card>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader><CardTitle>Booking Trends</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={bookingTrendsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="count" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Earnings Summary</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={earningsSummaryData} dataKey="earnings" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
                    {earningsSummaryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card className="lg:col-span-2">
            <CardHeader><CardTitle>Peak Booking Hours</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={peakBookingHoursData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
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
                      <Badge className={ facility.status === "approved" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                        {facility.status.replace('_', ' ')}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Sports:</span>{' '}
                        {Array.isArray(facility.courts) ? facility.courts.map(c => c.sport).join(', ') : 'N/A'}
                      </div>
                      <div>
                        <span className="font-medium">Courts:</span>{' '}
                        {Array.isArray(facility.courts) ? facility.courts.length : facility.courts || 0}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/list-venue/edit/${facility._id}`}>
                      <Button variant="outline" size="sm"><Edit className="w-4 h-4 mr-2" />Edit</Button>
                    </Link>
                    <Button variant="outline" size="sm" onClick={() => handleDelete(facility._id)} className="text-red-500 hover:bg-red-50 hover:text-red-600">
                        <Trash2 className="w-4 h-4 mr-2" />Delete
                    </Button>
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
                    <TableCell className="font-medium text-green-600">₹{booking.price}</TableCell>
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