import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow phone to access dev server without being blocked
  allowedDevOrigins: ["10.132.99.125"],
  // Proxy API requests to FastAPI to avoid Windows Firewall and CORS issues
  async rewrites() {
    return [
      {
        source: '/api/auth/:path*',
        destination: 'http://127.0.0.1:8000/api/auth/:path*'
      },
      {
        source: '/api/receipts/:path*',
        destination: 'http://127.0.0.1:8000/api/receipts/:path*'
      }
    ];
  }
};

export default nextConfig;
