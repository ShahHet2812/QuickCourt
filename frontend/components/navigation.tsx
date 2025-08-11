"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, User, LogOut, Settings, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false) // This would come from auth context in real app
  const [userType, setUserType] = useState("customer") // customer, owner, admin

  const handleLogout = () => {
    setIsLoggedIn(false)
    // Handle logout logic
  }

  return (
    <nav className="bg-slate-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 flex-shrink-0">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">Q</span>
            </div>
            <span className="text-xl font-bold hidden sm:block">QuickCourt</span>
            <span className="text-lg font-bold sm:hidden">QC</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link href="/" className="hover:text-green-400 transition-colors text-sm lg:text-base">
              Home
            </Link>
            <Link href="/venues" className="hover:text-green-400 transition-colors text-sm lg:text-base">
              Venues
            </Link>
            {isLoggedIn && (
              <>
                <Link href="/dashboard" className="hover:text-green-400 transition-colors text-sm lg:text-base">
                  My Bookings
                </Link>
                {userType === "owner" && (
                  <Link href="/owner-dashboard" className="hover:text-green-400 transition-colors text-sm lg:text-base">
                    Owner
                  </Link>
                )}
                {userType === "admin" && (
                  <Link href="/admin-dashboard" className="hover:text-green-400 transition-colors text-sm lg:text-base">
                    Admin
                  </Link>
                )}
              </>
            )}

            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2 hover:bg-slate-800">
                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4" />
                    </div>
                    <span className="hidden lg:block">John Doe</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      My Bookings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings" className="flex items-center">
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-3">
                <Link href="/login">
                  <Button variant="ghost" className="hover:bg-slate-800 text-sm lg:text-base">
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button className="bg-green-600 hover:bg-green-700 text-sm lg:text-base">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white hover:text-green-400">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-slate-800 rounded-lg mt-2 mb-2">
              <Link
                href="/"
                className="block px-3 py-2 text-white hover:text-green-400 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/venues"
                className="block px-3 py-2 text-white hover:text-green-400 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Venues
              </Link>

              {isLoggedIn ? (
                <>
                  <Link
                    href="/dashboard"
                    className="block px-3 py-2 text-white hover:text-green-400 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    My Bookings
                  </Link>
                  {userType === "owner" && (
                    <Link
                      href="/owner-dashboard"
                      className="block px-3 py-2 text-white hover:text-green-400 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Owner Dashboard
                    </Link>
                  )}
                  {userType === "admin" && (
                    <Link
                      href="/admin-dashboard"
                      className="block px-3 py-2 text-white hover:text-green-400 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <div className="border-t border-slate-700 mt-2 pt-2">
                    <Link
                      href="/profile"
                      className="block px-3 py-2 text-white hover:text-green-400 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      href="/settings"
                      className="block px-3 py-2 text-white hover:text-green-400 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Settings
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout()
                        setIsOpen(false)
                      }}
                      className="block w-full text-left px-3 py-2 text-red-400 hover:text-red-300 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <div className="border-t border-slate-700 mt-2 pt-2 space-y-2">
                  <Link
                    href="/login"
                    className="block px-3 py-2 text-white hover:text-green-400 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <div className="px-3">
                    <Link href="/signup" onClick={() => setIsOpen(false)}>
                      <Button className="w-full bg-green-600 hover:bg-green-700">Sign Up</Button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
