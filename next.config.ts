import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },

  // Permanent redirects from the old Wix URLs, so existing Google rankings and links carry over.
  async redirects() {
    return [
      { source: "/private-plates", destination: "/plates", permanent: true },
      { source: "/product-page/:slug", destination: "/plates/:slug", permanent: true },
      { source: "/contact-4", destination: "/plate-request", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/cart-page", destination: "/plates", permanent: true },
      { source: "/account/:path*", destination: "/", permanent: true },
    ];
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
