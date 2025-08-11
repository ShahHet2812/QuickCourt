import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { AuthProvider } from "@/context/AuthContext" // Import the provider
import { Footer } from "@/components/Footer" // Import the new Footer component

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "QuickCourt - Sports Booking Platform",
  description: "Book your favorite sports venues instantly",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider> {/* Wrap with AuthProvider */}
          <Navigation />
          <main className="min-h-screen bg-gray-50">{children}</main>
          <Footer /> {/* Add the Footer component here */}
        </AuthProvider>
      </body>
    </html>
  )
}