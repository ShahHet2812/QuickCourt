"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useParams } from "next/navigation"
import { ArrowLeft, MapPin, Trophy, IndianRupee, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useAuth } from "@/context/AuthContext"

const sports = ["Badminton", "Tennis", "Football", "Basketball", "Cricket", "Volleyball", "Table Tennis", "Squash"]
const amenitiesList = [
  "Free Parking", "Paid Parking", "Free WiFi", "Air Conditioning",
  "Changing Rooms", "Shower Facilities", "Equipment Rental", "Cafeteria/Snacks",
  "Pro Shop", "Coaching Available", "Floodlights", "CCTV Security",
  "First Aid", "Wheelchair Accessible",
]

export default function EditVenuePage() {
  const { token } = useAuth();
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [formData, setFormData] = useState({
    name: "",
    sport: "",
    location: "",
    price: "",
    courts: "1",
    amenities: [] as string[],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVenueData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/venues/${id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch venue data.");
        }
        const { data } = await res.json();
        setFormData({
            name: data.name,
            sport: data.sport,
            location: data.location,
            price: data.price.toString(),
            courts: data.courts.toString(),
            amenities: data.amenities || [],
        });
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchVenueData();
    }
  }, [id]);


  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      amenities: checked
        ? [...prev.amenities, amenity]
        : prev.amenities.filter((a) => a !== amenity),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/owner/venues/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            ...formData,
            price: Number(formData.price),
            courts: Number(formData.courts)
        })
      });
      
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit update request");
      }
      
      router.push("/list-venue/update-success");

    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (loading) return <div className="text-center p-10">Loading venue data...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <Link href="/owner-dashboard" className="inline-flex items-center text-green-600 hover:text-green-700 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Edit Your Venue</h1>
          <p className="text-gray-600">Update your facility details and submit for review.</p>
        </div>

        {error && <p className="text-red-500 bg-red-50 p-3 rounded-md mb-4">{error}</p>}
        
        <form onSubmit={handleSubmit} className="space-y-8">
          <Card>
            <CardHeader><CardTitle>Basic Information</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="venueName">Venue Name *</Label>
                  <Input id="venueName" value={formData.name} onChange={(e) => handleInputChange("name", e.target.value)} required />
                </div>
                 <div>
                  <Label htmlFor="sport">Primary Sport *</Label>
                  <Select value={formData.sport} onValueChange={(value) => handleInputChange("sport", value)}>
                    <SelectTrigger><SelectValue placeholder="Select sport" /></SelectTrigger>
                    <SelectContent>
                      {sports.map((sport) => ( <SelectItem key={sport} value={sport}>{sport}</SelectItem> ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="flex items-center"><MapPin className="mr-2"/>Location</CardTitle></CardHeader>
            <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="location">Full Address *</Label>
                  <Input id="location" value={formData.location} onChange={(e) => handleInputChange("location", e.target.value)} required placeholder="e.g., 123 Sports Lane, Ahmedabad, Gujarat 380001" />
                </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader><CardTitle className="flex items-center"><Trophy className="mr-2"/>Facility Details</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                      <Label htmlFor="price">Price per Hour (₹) *</Label>
                      <div className="relative">
                          <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input id="price" type="number" value={formData.price} onChange={(e) => handleInputChange("price", e.target.value)} required className="pl-10" />
                      </div>
                  </div>
                  <div>
                      <Label htmlFor="courts">Number of Courts *</Label>
                      <Input id="courts" type="number" value={formData.courts} onChange={(e) => handleInputChange("courts", e.target.value)} required min="1" />
                  </div>
              </div>
              <div>
                  <Label>Amenities</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-2">
                      {amenitiesList.map(amenity => (
                          <div key={amenity} className="flex items-center space-x-2">
                              <Checkbox 
                                id={amenity}
                                checked={formData.amenities.includes(amenity)}
                                onCheckedChange={(checked) => handleAmenityChange(amenity, !!checked)} 
                              />
                              <Label htmlFor={amenity} className="font-normal">{amenity}</Label>
                          </div>
                      ))}
                  </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-4">
            <Link href="/owner-dashboard"><Button type="button" variant="outline">Cancel</Button></Link>
            <Button type="submit" disabled={isSubmitting} className="bg-green-600 hover:bg-green-700">
              {isSubmitting ? 'Submitting for Review...' : "Submit for Review"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}