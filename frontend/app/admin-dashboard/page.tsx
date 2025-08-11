"use client"

import { useState, useEffect } from "react"
import { Users, Building, Calendar, DollarSign, Search, Check, X, Ban, UserCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useAuth } from "@/context/AuthContext"

interface AdminKpis {
    totalUsers: number;
    facilityOwners: number;
    totalBookings: number;
    totalRevenue: number;
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

export default function AdminDashboard() {
  const { token } = useAuth();
  const [adminKpis, setAdminKpis] = useState<AdminKpis | null>(null);
  const [pendingFacilities, setPendingFacilities] = useState<PendingFacility[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("")
  const [userFilter, setUserFilter] = useState("all")

  const fetchData = async () => {
    if (!token) return;
    try {
      setLoading(true);
      const res = await fetch('http://localhost:5000/api/admin/dashboard', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to fetch data');
      const { data } = await res.json();
      setAdminKpis(data.adminKpis);
      setPendingFacilities(data.pendingFacilities);
      setUsers(data.users);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  const handleApproveFacility = async (facilityId: string) => {
    try {
        await fetch(`http://localhost:5000/api/admin/facilities/${facilityId}/approve`, {
            method: 'PUT',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        fetchData();
    } catch (error) {
        console.error("Failed to approve facility", error);
    }
  };

  const handleRejectFacility = async (facilityId: string) => {
    if (window.confirm("Are you sure you want to reject and delete this facility?")) {
        try {
            await fetch(`http://localhost:5000/api/admin/facilities/${facilityId}/reject`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            fetchData();
        } catch (error) {
            console.error("Failed to reject facility", error);
        }
    }
  };

  const handleToggleBanUser = async (userId: string) => {
    try {
        await fetch(`http://localhost:5000/api/admin/users/${userId}/toggle-ban`, {
            method: 'PUT',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        fetchData();
    } catch (error) {
        console.error("Failed to ban/unban user", error);
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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage users, facilities, and platform operations</p>
        </div>

        {adminKpis && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/* KPI Cards */}
            </div>
        )}

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
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingFacilities.map((facility) => (
                  <TableRow key={facility.id}>
                    <TableCell className="font-medium">{facility.name}</TableCell>
                    <TableCell>{facility.owner}</TableCell>
                    <TableCell>{facility.sport}</TableCell>
                    <TableCell>{facility.submittedDate}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => handleApproveFacility(facility.id)}><Check className="w-4 h-4" /></Button>
                        <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50" onClick={() => handleRejectFacility(facility.id)}><X className="w-4 h-4" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
             {/* User Management Title and Filters */}
          </CardHeader>
          <CardContent>
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
                      <Badge className={user.userType === "owner" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"}>{user.userType}</Badge>
                    </TableCell>
                    <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge className={user.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>{user.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {user.status === "active" ? (
                          <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50" onClick={() => handleToggleBanUser(user._id)}>
                            <Ban className="w-4 h-4" />
                          </Button>
                        ) : (
                          <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => handleToggleBanUser(user._id)}>
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