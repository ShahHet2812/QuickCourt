"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Upload, MapPin, DollarSign, Camera, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useAuth } from "@/context/AuthContext"

const sports = ["Badminton", "Tennis", "Football", "Basketball", "Cricket", "Volleyball", "Table Tennis", "Squash"]
const amenities = [
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
    description: "",
    sport: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
    email: "",
    website: "",
    price: "", // Changed from pricePerHour
    courts: "1",
    openTime: "",
    closeTime: "",
    amenities: [] as string[],
  });

  const [images, setImages] = useState<File[]>([]); // Store files instead of data URLs
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
    if (e.target.files) {
      setImages((prev) => [...prev, ...Array.from(e.target.files!)]);
    }
  }

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    // Combine address fields for the backend
    const location = `${formData.address}, ${formData.city}, ${formData.state} ${formData.zipCode}`;

    try {
      // NOTE: Image upload is not implemented in this snippet for simplicity,
      // but you would typically upload images first, get their URLs, and then save those URLs with the venue data.
      
      const venueData = {
        name: formData.name,
        description: formData.description,
        sport: formData.sport,
        location: location,
        price: Number(formData.price),
        courts: Number(formData.courts),
        amenities: formData.amenities,
        // You would add other fields like operating hours here
      };

      const res = await fetch('http://localhost:5000/api/owner/venues', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(venueData)
      });
      
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit venue");
      }
      
      router.push("/list-venue/success");

    } catch (error: any) {
      setError(error.message);
      console.error("Error submitting venue:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-green-600 hover:text-green-700 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">List Your Venue</h1>
          <p className="text-gray-600">Join QuickCourt and start earning from your sports facility</p>
        </div>

        {error && <p className="text-red-500 bg-red-50 p-3 rounded-md mb-4">{error}</p>}
        
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Form fields remain the same */}
          {/* ... Card for Basic Info ... */}
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
              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea id="description" value={formData.description} onChange={(e) => handleInputChange("description", e.target.value)} rows={4} required />
              </div>
            </CardContent>
          </Card>
          
          {/* ... other form cards ... */}
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