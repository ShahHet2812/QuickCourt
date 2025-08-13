/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your existing configuration
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },

  // --- ADD THIS FUNCTION ---
  // This will proxy requests from /api/... to your backend server
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:5000/api/:path*",
      },
    ]
  },
}

export default nextConfig