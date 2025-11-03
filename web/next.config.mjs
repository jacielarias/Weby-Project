/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      protocol: "https",
      hostname: "safe-actor-a3f0efe503.media.strapiapp.com"
    ]
  }
};

export default nextConfig;
