"use client"

import { useState, useEffect, useCallback } from "react"
import { Users, Building, Calendar, DollarSign, Search, Check, X, Ban, UserCheck, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useAuth } from "@/context/AuthContext"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

// ... (interfaces remain the same)
interface AdminKpis {
    totalUsers: number;
    facilityOwners: number;
    totalBookings: number;
}
interface PendingFacility {
    id: string;
    name: string;
    owner: string;
    sport: string;
    location: string;
    courts: number;
    submittedDate: string;
    status: string;
    pendingUpdates?: any;
}
interface User {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    userType: string;
    createdAt: string;
    status: string;
}
interface ChartData {
    bookingActivity: { _id: string, count: number }[];
    userRegistration: { _id: string, count: number }[];
    facilityApproval: { _id: string, count: number }[];
    mostActiveSports: { _id: string, count: number }[];
    earningsSimulation: { month: string, earnings: number }[];
}


export default function AdminDashboard() {
  const { token } = useAuth();
  const [adminKpis, setAdminKpis] = useState<AdminKpis | null>(null);
  const [pendingFacilities, setPendingFacilities] = useState<PendingFacility[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("")
  const [userFilter, setUserFilter] = useState("all")

  const fetchData = useCallback(async () => {
    if (!token) return;
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/dashboard`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to fetch data');
      }
      const { data } = await res.json();
      setAdminKpis(data.adminKpis);
      setPendingFacilities(data.pendingFacilities);
      setUsers(data.users);
      setChartData(data.charts);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleApiCall = async (url: string, method: string, successMessage: string, errorMessage: string) => {
    try {
      const res = await fetch(url, {
          method,
          headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || errorMessage);
      }
      alert(successMessage);
      fetchData();
    } catch (error: any) {
      console.error(errorMessage, error);
      alert(`Error: ${error.message}`);
    }
  };

  const handleApprovalAction = (facilityId: string, status: string) => {
    switch (status) {
        case 'pending':
            handleApiCall(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/facilities/${facilityId}/approve`, 'PUT', 'Facility approved!', 'Failed to approve facility');
            break;
        case 'pending_update':
            handleApiCall(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/venues/${facilityId}/approve-update`, 'PUT', 'Facility update approved!', 'Failed to approve facility update');
            break;
        case 'pending_deletion':
             if (window.confirm("Are you sure you want to approve the DELETION of this venue? This action is permanent.")) {
                handleApiCall(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/venues/${facilityId}/approve-delete`, 'DELETE', 'Facility deletion approved!', 'Failed to approve facility deletion');
            }
            break;
        default:
            alert("Invalid action.");
    }
  };


  const handleRejectFacility = (facilityId: string, status: string) => {
    const action = status === 'pending' ? 'reject and delete' : 'reject the change for';
    if (window.confirm(`Are you sure you want to ${action} this facility?`)) {
      handleApiCall(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/facilities/${facilityId}/reject`, 'DELETE', 'Action completed!', 'Failed to reject action');
    }
  };

  const handleToggleBanUser = (userId: string, currentStatus: string) => {
    const action = currentStatus === 'active' ? 'ban' : 'unban';
    if (window.confirm(`Are you sure you want to ${action} this user?`)) {
      handleApiCall(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/users/${userId}/toggle-ban`, 'PUT', `User ${action}ned!`, 'Failed to toggle user ban status');
    }
  };
  
  const filteredUsers = users.filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`;
    const matchesSearch =
      fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = userFilter === "all" || user.userType === userFilter
    return matchesSearch && matchesFilter
  })

  if (loading) return <div className="text-center p-10">Loading Admin Dashboard...</div>
  if (error) return <div className="text-center p-10 text-red-500">Error: {error}</div>

  const formatMonth = (dateStr: string) => {
    const [year, month] = dateStr.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleString('default', { month: 'short' });
  };

  const earningsSimulationData = chartData?.earningsSimulation.map(d => ({...d, month: formatMonth(d.month)}));

  const renderApprovalActions = (facility: PendingFacility) => {
    const status = facility.status;
    let approveIcon = <Check className="w-4 h-4" />;
    let approveText = "Approve";

    if (status === 'pending_update') {
        approveIcon = <Edit className="w-4 h-4" />;
        approveText = "Approve Update";
    } else if (status === 'pending_deletion') {
        approveIcon = <Trash2 className="w-4 h-4" />;
        approveText = "Approve Deletion";
    }

    return (
      <div className="flex gap-2">
        <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => handleApprovalAction(facility.id, facility.status)} title={approveText}>
            {approveIcon}
        </Button>
        <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50" onClick={() => handleRejectFacility(facility.id, facility.status)} title="Reject">
            <X className="w-4 h-4" />
        </Button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage users, facilities, and platform operations</p>
        </div>

        {adminKpis && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {/* KPI Cards */}
                <Card>
                  <CardHeader><CardTitle>Total Users</CardTitle></CardHeader>
                  <CardContent><p className="text-3xl font-bold">{adminKpis.totalUsers}</p></CardContent>
                </Card>
                <Card>
                  <CardHeader><CardTitle>Facility Owners</CardTitle></CardHeader>
                  <CardContent><p className="text-3xl font-bold">{adminKpis.facilityOwners}</p></CardContent>
                </Card>
                <Card>
                  <CardHeader><CardTitle>Total Bookings</CardTitle></CardHeader>
                  <CardContent><p className="text-3xl font-bold">{adminKpis.totalBookings}</p></CardContent>
                </Card>
            </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <Card>
                <CardHeader><CardTitle>Booking Activity Over Time</CardTitle></CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={chartData?.bookingActivity}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="_id" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="count" stroke="#8884d8" />
                        </LineChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
            <Card>
                <CardHeader><CardTitle>User Registration Trends</CardTitle></CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={chartData?.userRegistration}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="_id" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="count" stroke="#82ca9d" />
                        </LineChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
            <Card>
                <CardHeader><CardTitle>Facility Approval Trend</CardTitle></CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={chartData?.facilityApproval}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="_id" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="count" fill="#ffc658" />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
            <Card>
                <CardHeader><CardTitle>Most Active Sports</CardTitle></CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={chartData?.mostActiveSports}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="_id" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="count" fill="#ff8042" />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
            <Card className="lg:col-span-2">
                <CardHeader><CardTitle>Earnings Simulation Chart</CardTitle></CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={earningsSimulationData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="earnings" stroke="#8884d8" />
                        </LineChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>

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
                  <TableHead>Submitted</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingFacilities.length > 0 ? pendingFacilities.map((facility) => (
                  <TableRow key={facility.id}>
                    <TableCell className="font-medium">{facility.name}</TableCell>
                    <TableCell>{facility.owner}</TableCell>
                    <TableCell>{facility.sport}</TableCell>
                    <TableCell>{facility.submittedDate}</TableCell>
                    <TableCell>
                        <Badge className={ facility.status === "pending" ? "bg-yellow-100 text-yellow-800" : (facility.status === "pending_update" ? "bg-blue-100 text-blue-800" : "bg-red-100 text-red-800")}>
                            {facility.status.replace('_', ' ')}
                        </Badge>
                    </TableCell>
                    <TableCell>
                        {renderApprovalActions(facility)}
                    </TableCell>
                  </TableRow>
                )) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center">No pending approvals</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
             <CardTitle>User Management</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                    <Search className="w-5 h-5 text-gray-400" />
                    <Input
                        placeholder="Search by name or email"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="max-w-sm"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Button variant={userFilter === 'all' ? 'default' : 'outline'} onClick={() => setUserFilter('all')}>All</Button>
                    <Button variant={userFilter === 'customer' ? 'default' : 'outline'} onClick={() => setUserFilter('customer')}>Customers</Button>
                    <Button variant={userFilter === 'owner' ? 'default' : 'outline'} onClick={() => setUserFilter('owner')}>Owners</Button>
                </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell className="font-medium">{user.firstName} {user.lastName}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge className={user.userType === "owner" ? "bg-blue-100 text-blue-800" : (user.userType === "admin" ? "bg-purple-100 text-purple-800" : "bg-gray-100 text-gray-800")}>{user.userType}</Badge>
                    </TableCell>
                    <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge className={user.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>{user.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {user.userType !== 'admin' && (
                          user.status === "active" ? (
                            <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50" onClick={() => handleToggleBanUser(user._id, user.status)}>
                              <Ban className="w-4 h-4 mr-2" /> Ban
                            </Button>
                          ) : (
                            <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => handleToggleBanUser(user._id, user.status)}>
                              <UserCheck className="w-4 h-4 mr-2" /> Unban
                            </Button>
                          )
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