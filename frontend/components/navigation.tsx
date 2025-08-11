"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, User, LogOut, Settings, Calendar, Shield, Building } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/context/AuthContext"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  }

  const userInitial = user ? `${user.firstName[0]}${user.lastName[0]}` : "U";
  const avatarUrl = user?.avatar ? `http://localhost:5000${user.avatar}` : "";

  const renderDashboardLink = () => {
    if (!isLoggedIn || !user) return null;

    switch (user.userType) {
      case 'admin':
        return (
          <Link href="/admin-dashboard" className="hover:text-green-400 transition-colors text-sm lg:text-base">
            Admin Dashboard
          </Link>
        );
      case 'owner':
        return (
          <Link href="/owner-dashboard" className="hover:text-green-400 transition-colors text-sm lg:text-base">
            Owner Dashboard
          </Link>
        );
      case 'customer':
      default:
        return (
          <Link href="/dashboard" className="hover:text-green-400 transition-colors text-sm lg:text-base">
            My Bookings
          </Link>
        );
    }
  };
  
  const renderProfileDropdownLink = () => {
    if (!isLoggedIn || !user) return null;

    switch (user.userType) {
      case 'admin':
        return (
          <DropdownMenuItem asChild>
            <Link href="/admin-dashboard" className="flex items-center">
              <Shield className="w-4 h-4 mr-2" />
              Admin Dashboard
            </Link>
          </DropdownMenuItem>
        );
      case 'owner':
        return (
          <DropdownMenuItem asChild>
            <Link href="/owner-dashboard" className="flex items-center">
              <Building className="w-4 h-4 mr-2" />
              Owner Dashboard
            </Link>
          </DropdownMenuItem>
        );
      case 'customer':
      default:
        return (
          <DropdownMenuItem asChild>
            <Link href="/dashboard" className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              My Bookings
            </Link>
          </DropdownMenuItem>
        );
    }
  }

  return (
    <nav className="bg-slate-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2 flex-shrink-0">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">Q</span>
            </div>
            <span className="text-xl font-bold hidden sm:block">QuickCourt</span>
          </Link>

          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link href="/" className="hover:text-green-400 transition-colors text-sm lg:text-base">
              Home
            </Link>
            <Link href="/venues" className="hover:text-green-400 transition-colors text-sm lg:text-base">
              Venues
            </Link>
            {renderDashboardLink()}

            {isLoggedIn && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2 hover:bg-slate-800 rounded-full p-1">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={avatarUrl} alt={`${user.firstName}'s avatar`} />
                      <AvatarFallback>{userInitial}</AvatarFallback>
                    </Avatar>
                    <span className="hidden lg:block pr-2">{user.firstName} {user.lastName}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  {renderProfileDropdownLink()}
                  <DropdownMenuItem asChild>
                    <Link href="/settings" className="flex items-center">
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer">
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

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white hover:text-green-400">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-800">Home</Link>
              <Link href="/venues" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-800">Venues</Link>
              {isLoggedIn && user && (
                <>
                  <Link href={user.userType === 'admin' ? '/admin-dashboard' : user.userType === 'owner' ? '/owner-dashboard' : '/dashboard'} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-800">Dashboard</Link>
                  <Link href="/profile" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-800">Profile</Link>
                  <Link href="/settings" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-800">Settings</Link>
                  <button onClick={handleLogout} className="w-full text-left block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-800 text-red-500">Logout</button>
                </>
              )}
              {!isLoggedIn && (
                <>
                  <Link href="/login" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-800">Login</Link>
                  <Link href="/signup" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-800">Sign Up</Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}