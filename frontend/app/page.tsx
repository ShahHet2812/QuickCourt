"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, MapPin, Star, Play, Pause } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const heroImages = [
  {
    src: "/modern-badminton-court.png",
    alt: "Badminton Court",
    title: "Premium Badminton Courts",
    subtitle: "Book your game today",
    description: "Professional-grade courts with premium equipment",
    sport: "badminton",
  },
  {
    src: "/outdoor-tennis-court.png",
    alt: "Tennis Court",
    title: "Professional Tennis Courts",
    subtitle: "Play like a pro",
    description: "Clay, hard, and grass courts available",
    sport: "tennis",
  },
  {
    src: "/football-turf-field.png",
    alt: "Football Turf",
    title: "Football Turf Fields",
    subtitle: "Gather your team",
    description: "FIFA-approved artificial turf fields",
    sport: "football",
  },
  {
    src: "/boxcricket.jpg",
    alt: "Cricket Ground",
    title: "Cricket Grounds",
    subtitle: "Perfect pitches for your match",
    description: "Well-maintained cricket grounds with practice nets",
    sport: "cricket",
  },
  {
    src: "/basketball-hoop-court.png",
    alt: "Basketball Court",
    title: "Indoor Basketball Courts",
    subtitle: "Dunk your way to victory",
    description: "Professional basketball courts with proper lighting",
    sport: "basketball",
  },
  {
    src: "/sports-arena-badminton.png",
    alt: "Sports Arena",
    title: "Multi-Sport Arena",
    subtitle: "All sports under one roof",
    description: "Versatile venue for multiple sports activities",
    sport: "multi-sport",
  },
]

const popularVenues = [
  {
    id: 1,
    name: "SportZone Arena",
    location: "Downtown, City Center",
    price: 50,
    rating: 4.8,
    image: "/sports-arena-badminton.png",
    sport: "Badminton",
  },
  {
    id: 2,
    name: "Elite Tennis Club",
    location: "Uptown, North District",
    price: 75,
    rating: 4.9,
    image: "/tennis-club-court.png",
    sport: "Tennis",
  },
  {
    id: 3,
    name: "Green Field Complex",
    location: "Suburbs, East Side",
    price: 100,
    rating: 4.7,
    image: "/football-field-turf.png",
    sport: "Football",
  },
  {
    id: 4,
    name: "City Sports Hub",
    location: "Central Park Area",
    price: 60,
    rating: 4.6,
    image: "/sports-hub-basketball.png",
    sport: "Basketball",
  },
]

const popularSports = [
  {
    name: "Badminton",
    venues: 45,
    image: "/placeholder-opshk.png",
    color: "bg-blue-500",
  },
  {
    name: "Tennis",
    venues: 32,
    image: "/tennis-racket-ball.png",
    color: "bg-green-500",
  },
  {
    name: "Football",
    venues: 28,
    image: "/football-soccer-ball.png",
    color: "bg-orange-500",
  },
  {
    name: "Basketball",
    venues: 25,
    image: "/basketball-hoop-court.png",
    color: "bg-purple-500",
  },
  {
    name: "Cricket",
    venues: 18,
    image: "/placeholder.svg?height=150&width=200",
    color: "bg-red-500",
  },
]

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const nextSlide = useCallback(() => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    // Reset transition state after animation completes
    setTimeout(() => setIsTransitioning(false), 1000)
  }, [isTransitioning])

  const prevSlide = useCallback(() => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length)
    // Reset transition state after animation completes
    setTimeout(() => setIsTransitioning(false), 1000)
  }, [isTransitioning])

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning || index === currentSlide) return
    setIsTransitioning(true)
    setCurrentSlide(index)
    // Reset transition state after animation completes
    setTimeout(() => setIsTransitioning(false), 1000)
  }, [isTransitioning, currentSlide])

  const togglePlayPause = useCallback(() => {
    setIsPlaying(!isPlaying)
  }, [isPlaying])

  // Auto-play functionality with smoother timing
  useEffect(() => {
    if (!isPlaying || isHovered || isTransitioning) return

    const timer = setInterval(() => {
      nextSlide()
    }, 4000) // 4 seconds for better engagement

    return () => clearInterval(timer)
  }, [isPlaying, isHovered, isTransitioning, nextSlide])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        prevSlide()
      } else if (event.key === 'ArrowRight') {
        nextSlide()
      } else if (event.key === ' ') {
        event.preventDefault()
        togglePlayPause()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [prevSlide, nextSlide, togglePlayPause])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative h-[400px] sm:h-[500px] lg:h-[600px] overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative w-full h-full">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105"
              }`}
            >
              <Image src={image.src || "/placeholder.svg"} alt={image.alt} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60" />
              <div className="absolute inset-0 flex items-center justify-center text-center text-white">
                <div className="max-w-4xl mx-auto px-4">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in">
                    {image.title}
                  </h1>
                  <p className="text-lg sm:text-xl md:text-2xl mb-2 animate-fade-in-delay">
                    {image.subtitle}
                  </p>
                  <p className="text-base sm:text-lg mb-6 sm:mb-8 text-gray-200 animate-fade-in-delay-2">
                    {image.description}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-delay-3">
                    <Link href="/venues">
                      <Button
                        size="lg"
                        className="bg-green-600 hover:bg-green-700 text-base sm:text-lg px-6 sm:px-8 py-3 transition-all duration-300 hover:scale-105"
                      >
                        Book Now
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Navigation Arrows */}
        <button
          onClick={prevSlide}
          disabled={isTransitioning}
          className={`absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-white/20 ${
            isTransitioning ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          disabled={isTransitioning}
          className={`absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-white/20 ${
            isTransitioning ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Play/Pause Button */}
        <button
          onClick={togglePlayPause}
          className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all duration-300 backdrop-blur-sm border border-white/20"
          aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </button>

        {/* Enhanced Dots Indicator */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              disabled={isTransitioning}
              className={`w-4 h-4 rounded-full transition-all duration-300 hover:scale-125 ${
                index === currentSlide 
                  ? "bg-white shadow-lg" 
                  : "bg-white/50 hover:bg-white/70"
              } ${isTransitioning ? 'cursor-not-allowed' : ''}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Slide Counter */}
        <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
          {currentSlide + 1} / {heroImages.length}
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
          <div 
            className="h-full bg-green-500 transition-all duration-1000 ease-linear"
            style={{ width: `${((currentSlide + 1) / heroImages.length) * 100}%` }}
          />
        </div>
      </section>

      {/* Popular Venues Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-slate-900">Popular Venues</h2>
          <Link href="/venues" className="text-green-600 hover:text-green-700 font-medium">
            View All →
          </Link>
        </div>

        <div className="flex overflow-x-auto space-x-4 sm:space-x-6 pb-4 scrollbar-hide">
          {popularVenues.map((venue) => (
            <Card key={venue.id} className="flex-shrink-0 w-72 sm:w-80 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="relative h-48">
                  <Image
                    src={venue.image || "/placeholder.svg"}
                    alt={venue.name}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                  <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-sm font-medium">
                    {venue.sport}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">{venue.name}</h3>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">{venue.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      <span className="text-sm font-medium">{venue.rating}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">${venue.price}/hr</div>
                      <Link href={`/booking?venue=${venue.id}`}>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700 mt-2">
                          Book Now
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Popular Sports Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto bg-white rounded-2xl mx-4 shadow-sm">
        <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Popular Sports</h2>

        <div className="flex overflow-x-auto space-x-4 sm:space-x-6 pb-4 scrollbar-hide">
          {popularSports.map((sport, index) => (
            <Card key={index} className="flex-shrink-0 w-56 sm:w-64 hover:shadow-lg transition-all hover:scale-105">
              <CardContent className="p-0">
                <div className="relative h-32">
                  <Image
                    src={sport.image || "/placeholder.svg"}
                    alt={sport.name}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                  <div className={`absolute inset-0 ${sport.color} opacity-20 rounded-t-lg`} />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-bold text-lg mb-1">{sport.name}</h3>
                  <p className="text-gray-600 text-sm">{sport.venues} venues available</p>
                  <Link href={`/venues?sport=${sport.name.toLowerCase()}`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-3 border-green-600 text-green-600 hover:bg-green-50 bg-transparent"
                    >
                      Explore
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Play?</h2>
          <p className="text-xl mb-8 text-gray-300">
            Join thousands of sports enthusiasts who trust QuickCourt for their booking needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/venues">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 w-full sm:w-auto">
                Find Venues Near You
              </Button>
            </Link>
            <Link href="/list-venue">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-slate-900 bg-transparent w-full sm:w-auto"
              >
                List Your Venue
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
