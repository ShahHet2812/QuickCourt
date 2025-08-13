"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Upload, MapPin, DollarSign, Camera, X, Trophy, IndianRupee } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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

export default function ListVenuePage() {
  const { token } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    sport: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    price: "",
    courts: "1",
    amenities: [] as string[],
  });

  const [image, setImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const data = new FormData();
    data.append('name', formData.name);
    data.append('sport', formData.sport);
    data.append('location', `${formData.address}, ${formData.city}, ${formData.state}, ${formData.zipCode}`);
    data.append('price', formData.price);
    data.append('courts', formData.courts);
    formData.amenities.forEach(amenity => data.append('amenities[]', amenity));
    if (image) {
      data.append('image', image);
    }

    try {
      const res = await fetch('http://localhost:5000/api/owner/venues', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: data
      });
      
      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.error || "Failed to submit venue");
      }
      
      router.push("/list-venue/success");

    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-green-600 hover:text-green-700 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">List Your Venue</h1>
          <p className="text-gray-600">Join QuickCourt and start earning from your sports facility.</p>
        </div>

        {error && <p className="text-red-500 bg-red-50 p-3 rounded-md mb-4">{error}</p>}
        
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Cards for form sections */}
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
                  <Select value={formData.sport} onValueChange={(value) => handleInputChange("sport", value)} required>
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
                  <Label htmlFor="address">Address *</Label>
                  <Input id="address" value={formData.address} onChange={(e) => handleInputChange("address", e.target.value)} required />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <Label htmlFor="city">City *</Label>
                        <Input id="city" value={formData.city} onChange={(e) => handleInputChange("city", e.target.value)} required />
                    </div>
                    <div>
                        <Label htmlFor="state">State *</Label>
                        <Input id="state" value={formData.state} onChange={(e) => handleInputChange("state", e.target.value)} required />
                    </div>
                    <div>
                        <Label htmlFor="zipCode">Zip Code *</Label>
                        <Input id="zipCode" value={formData.zipCode} onChange={(e) => handleInputChange("zipCode", e.target.value)} required />
                    </div>
                </div>
            </CardContent>
          </Card>
          
          <Card>
            {/* Corrected JSX: Replaced Badminton with Trophy */}
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
                              <Checkbox id={amenity} onCheckedChange={(checked) => handleAmenityChange(amenity, !!checked)} />
                              <Label htmlFor={amenity} className="font-normal">{amenity}</Label>
                          </div>
                      ))}
                  </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="flex items-center"><Camera className="mr-2" />Venue Image</CardTitle></CardHeader>
            <CardContent>
              <Input id="image" type="file" onChange={handleImageUpload} accept="image/*" />
              {image && <p className="text-sm text-gray-500 mt-2">Selected: {image.name}</p>}
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-4">
            <Link href="/"><Button type="button" variant="outline">Cancel</Button></Link>
            <Button type="submit" disabled={isSubmitting} className="bg-green-600 hover:bg-green-700">
              {isSubmitting ? 'Submitting...' : "Submit for Review"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}