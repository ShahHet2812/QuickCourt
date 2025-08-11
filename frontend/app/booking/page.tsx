"use client"

import { useState, useEffect } from "react"
import { CreditCard, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const venueData = {
  id: 1,
  name: "SportZone Arena",
  location: "Downtown, City Center",
  sport: "Badminton",
  pricePerHour: 50,
}

const courts = [
  { id: 1, name: "Court 1", type: "Premium", price: 60 },
  { id: 2, name: "Court 2", type: "Premium", price: 60 },
  { id: 3, name: "Court 3", type: "Standard", price: 50 },
  { id: 4, name: "Court 4", type: "Standard", price: 50 },
]

const timeSlots = [
  "06:00",
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
]

export default function BookingPage() {
  const [step, setStep] = useState(1)
  const [selectedCourt, setSelectedCourt] = useState("")
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>([])
  const [playerName, setPlayerName] = useState("")
  const [playerEmail, setPlayerEmail] = useState("")
  const [playerPhone, setPlayerPhone] = useState("")

  const selectedCourtData = courts.find((court) => court.id.toString() === selectedCourt)
  const totalHours = selectedTimeSlots.length
  const subtotal = selectedCourtData ? selectedCourtData.price * totalHours : 0
  const tax = subtotal * 0.1
  const total = subtotal + tax

  const handleTimeSlotToggle = (timeSlot: string) => {
    setSelectedTimeSlots((prev) =>
      prev.includes(timeSlot) ? prev.filter((slot) => slot !== timeSlot) : [...prev, timeSlot].sort(),
    )
  }

  const handleBookingSubmit = () => {
    // Simulate payment processing
    setTimeout(() => {
      setStep(4) // Go to confirmation
    }, 2000)
  }

  // Add useEffect to get venue name from URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const venueName = urlParams.get("name")
    if (venueName) {
      // Update venueData with the actual name
      venueData.name = decodeURIComponent(venueName)
    }
  }, [])

  if (step === 4) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="text-center p-8">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Booking Confirmed!</h1>
            <p className="text-gray-600 mb-6">
              Your booking has been successfully confirmed. You'll receive a confirmation email shortly.
            </p>
            <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
              <h3 className="font-semibold mb-2">Booking Details</h3>
              <p className="text-sm text-gray-600">Venue: {venueData.name}</p>
              <p className="text-sm text-gray-600">Court: {selectedCourtData?.name}</p>
              <p className="text-sm text-gray-600">Date: {selectedDate}</p>
              <p className="text-sm text-gray-600">Time: {selectedTimeSlots.join(", ")}</p>
              <p className="text-sm text-gray-600">Total: ${total.toFixed(2)}</p>
            </div>
            <div className="space-y-2">
              <Button className="w-full bg-green-600 hover:bg-green-700">View My Bookings</Button>
              <Button variant="outline" className="w-full bg-transparent">
                Book Another Court
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= stepNumber ? "bg-green-600 text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {stepNumber}
                </div>
                {stepNumber < 3 && (
                  <div className={`w-16 h-1 mx-2 ${step > stepNumber ? "bg-green-600" : "bg-gray-200"}`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Step {step} of 3: {step === 1 ? "Select Court & Time" : step === 2 ? "Player Information" : "Payment"}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Booking Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">
                  {step === 1 && "Select Court & Time"}
                  {step === 2 && "Player Information"}
                  {step === 3 && "Payment Details"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {step === 1 && (
                  <>
                    {/* Court Selection */}
                    <div>
                      <Label className="text-base font-medium mb-3 block">Select Court</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {courts.map((court) => (
                          <div
                            key={court.id}
                            onClick={() => setSelectedCourt(court.id.toString())}
                            className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                              selectedCourt === court.id.toString()
                                ? "border-green-600 bg-green-50"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-semibold">{court.name}</h3>
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  court.type === "Premium" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                                }`}
                              >
                                {court.type}
                              </span>
                            </div>
                            <p className="text-lg font-bold text-green-600">${court.price}/hour</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Date Selection */}
                    <div>
                      <Label htmlFor="date" className="text-base font-medium mb-3 block">
                        Select Date
                      </Label>
                      <Input
                        id="date"
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        min={new Date().toISOString().split("T")[0]}
                        className="h-12 rounded-xl"
                      />
                    </div>

                    {/* Time Slots */}
                    <div>
                      <Label className="text-base font-medium mb-3 block">Select Time Slots</Label>
                      <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                        {timeSlots.map((timeSlot) => (
                          <button
                            key={timeSlot}
                            onClick={() => handleTimeSlotToggle(timeSlot)}
                            className={`p-3 text-sm font-medium rounded-lg border-2 transition-all ${
                              selectedTimeSlots.includes(timeSlot)
                                ? "border-green-600 bg-green-600 text-white"
                                : "border-gray-200 hover:border-gray-300 text-gray-700"
                            }`}
                          >
                            {timeSlot}
                          </button>
                        ))}
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        Select multiple consecutive slots for longer sessions
                      </p>
                    </div>
                  </>
                )}

                {step === 2 && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={playerName}
                        onChange={(e) => setPlayerName(e.target.value)}
                        placeholder="Enter your full name"
                        className="h-12 rounded-xl"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={playerEmail}
                        onChange={(e) => setPlayerEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="h-12 rounded-xl"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={playerPhone}
                        onChange={(e) => setPlayerPhone(e.target.value)}
                        placeholder="Enter your phone number"
                        className="h-12 rounded-xl"
                      />
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input id="cardNumber" placeholder="1234 5678 9012 3456" className="h-12 rounded-xl" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input id="expiry" placeholder="MM/YY" className="h-12 rounded-xl" />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" className="h-12 rounded-xl" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="cardName">Name on Card</Label>
                      <Input id="cardName" placeholder="John Doe" className="h-12 rounded-xl" />
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-6">
                  {step > 1 && (
                    <Button variant="outline" onClick={() => setStep(step - 1)} className="px-8">
                      Back
                    </Button>
                  )}
                  <div className="ml-auto">
                    {step < 3 ? (
                      <Button
                        onClick={() => setStep(step + 1)}
                        disabled={
                          (step === 1 && (!selectedCourt || !selectedDate || selectedTimeSlots.length === 0)) ||
                          (step === 2 && (!playerName || !playerEmail || !playerPhone))
                        }
                        className="bg-green-600 hover:bg-green-700 px-8"
                      >
                        Continue
                      </Button>
                    ) : (
                      <Button onClick={handleBookingSubmit} className="bg-green-600 hover:bg-green-700 px-8">
                        <CreditCard className="w-4 h-4 mr-2" />
                        Pay Now
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-slate-900">{venueData.name}</h3>
                  <p className="text-sm text-gray-600">{venueData.location}</p>
                  <p className="text-sm text-gray-600">{venueData.sport}</p>
                </div>

                {selectedCourtData && (
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Court:</span>
                      <span>{selectedCourtData.name}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Type:</span>
                      <span>{selectedCourtData.type}</span>
                    </div>
                  </div>
                )}

                {selectedDate && (
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Date:</span>
                    <span>{selectedDate}</span>
                  </div>
                )}

                {selectedTimeSlots.length > 0 && (
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Time Slots:</span>
                      <span>{selectedTimeSlots.length} hour(s)</span>
                    </div>
                    <div className="text-sm text-gray-600">{selectedTimeSlots.join(", ")}</div>
                  </div>
                )}

                {subtotal > 0 && (
                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax (10%):</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg border-t pt-2">
                      <span>Total:</span>
                      <span className="text-green-600">${total.toFixed(2)}</span>
                    </div>
                  </div>
                )}

                <div className="bg-green-50 p-3 rounded-lg text-sm">
                  <p className="text-green-800 font-medium mb-1">Free Cancellation</p>
                  <p className="text-green-700">Cancel up to 2 hours before your booking</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
