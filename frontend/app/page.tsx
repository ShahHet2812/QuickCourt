"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, MapPin, Star, Play, Pause } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { useAuth } from "@/context/AuthContext"

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

// Static mapping for sport images and colors, can be moved to a config file
const sportVisuals: { [key: string]: { image: string; color: string } } = {
  badminton: { image: "/modern-badminton-court.png", color: "bg-blue-500" },
  tennis: { image: "/tennis-racket-ball.png", color: "bg-green-500" },
  football: { image: "/football-soccer-ball.png", color: "bg-orange-500" },
  basketball: { image: "/basketball-hoop-court.png", color: "bg-purple-500" },
  "box cricket": { image: "/cricketbox.jpg", color: "bg-red-500" },
  default: { image: "/placeholder.svg", color: "bg-gray-500" },
};


interface Court {
  _id: string;
  name: string;
  sport: string;
  price: number;
}

interface Venue {
  _id: string;
  name: string;
  location: string;
  rating: number;
  reviews: number;
  image?: string;
  amenities: string[];
  courts: Court[];
  sport: string; // Added sport to venue interface for simplicity
}

interface PopularSport {
    name: string;
    venues: number;
    image: string;
    color: string;
}


export default function HomePage() {
  const { user } = useAuth();
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [popularVenues, setPopularVenues] = useState<Venue[]>([]);
  const [popularSports, setPopularSports] = useState<PopularSport[]>([]);


  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/venues`);
        if (!res.ok) {
          throw new Error('Failed to fetch venues');
        }
        const { data } = await res.json();
        
        // Set popular venues for the carousel
        setPopularVenues(data.sort((a: Venue, b: Venue) => b.rating - a.rating).slice(0, 8));

        // Calculate popular sports from all venues
        const sportCounts = data.reduce((acc: { [key: string]: number }, venue: Venue) => {
            const sportName = venue.sport.toLowerCase();
            acc[sportName] = (acc[sportName] || 0) + 1;
            return acc;
        }, {});
        
        const sportsData: PopularSport[] = Object.entries(sportCounts).map(([name, count]) => {
            const visual = sportVisuals[name] || sportVisuals.default;
            return {
                name: name.charAt(0).toUpperCase() + name.slice(1),
                venues: count,
                image: visual.image,
                color: visual.color,
            };
        });
        
        setPopularSports(sportsData);

      } catch (err: any) {
        console.error(err.message);
      }
    };
    fetchVenues();
  }, []);

  const nextSlide = useCallback(() => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    setTimeout(() => setIsTransitioning(false), 1000)
  }, [isTransitioning])

  const prevSlide = useCallback(() => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length)
    setTimeout(() => setIsTransitioning(false), 1000)
  }, [isTransitioning])

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning || index === currentSlide) return
    setIsTransitioning(true)
    setCurrentSlide(index)
    setTimeout(() => setIsTransitioning(false), 1000)
  }, [isTransitioning, currentSlide])

  const togglePlayPause = useCallback(() => {
    setIsPlaying(!isPlaying)
  }, [isPlaying])

  useEffect(() => {
    if (!isPlaying || isHovered || isTransitioning) return
    const timer = setInterval(() => {
      nextSlide()
    }, 4000)
    return () => clearInterval(timer)
  }, [isPlaying, isHovered, isTransitioning, nextSlide])

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') prevSlide()
      else if (event.key === 'ArrowRight') nextSlide()
      else if (event.key === ' ') {
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
          
          {/* Carousel Controls */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-4 -translate-y-1/2 z-10 p-2 bg-black/30 text-white rounded-full hover:bg-black/50 transition-colors"
            aria-label="Previous Slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-4 -translate-y-1/2 z-10 p-2 bg-black/30 text-white rounded-full hover:bg-black/50 transition-colors"
            aria-label="Next Slide"
          >
            <ChevronRight size={24} />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center space-x-3">
            <button 
              onClick={togglePlayPause} 
              className="p-2 bg-black/30 text-white rounded-full hover:bg-black/50 transition-colors"
              aria-label={isPlaying ? "Pause Slideshow" : "Play Slideshow"}
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            </button>
            <div className="flex space-x-2">
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentSlide === index ? 'bg-white w-4' : 'bg-white/50 hover:bg-white/75'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
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
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {popularVenues.map((venue) => (
              <CarouselItem key={venue._id} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-0">
                      <div className="relative h-48">
                        <Image
                          src={venue.image ? `${process.env.NEXT_PUBLIC_API_URL}${venue.image}` : "/placeholder.svg"}
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
                            <span className="text-sm font-medium">{venue.rating.toFixed(1)}</span>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-green-600">₹{Array.isArray(venue.courts) ? Math.min(...venue.courts.map(c => c.price)) : 0}/hr</div>
                            <Link href={`/booking?venue=${venue._id}&name=${encodeURIComponent(venue.name)}`}>
                              <Button size="sm" className="bg-green-600 hover:bg-green-700 mt-2">
                                Book Now
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 z-10" />
          <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 z-10" />
        </Carousel>
      </section>

      {/* Popular Sports Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto bg-white rounded-2xl mx-4 shadow-sm">
        <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Popular Sports</h2>
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent>
            {popularSports.map((sport, index) => (
              <CarouselItem key={index} className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                <div className="p-1">
                  <Card className="hover:shadow-lg transition-all hover:scale-105">
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
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 z-10" />
          <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 z-10" />
        </Carousel>
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
            {user?.userType === 'owner' && (
              <Link href="/list-venue">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-slate-900 bg-transparent w-full sm:w-auto"
                >
                  List Your Venue
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}