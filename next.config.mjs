/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https", // Assuming your Vercel Blob storage uses HTTPS
        hostname: "hebbkx1anhila5yf.public.blob.vercel-storage.com",
        pathname: "**", // Allows any path under this hostname
      },
      {
        protocol: "https", // Assuming your Vercel Blob storage uses HTTPS
        hostname: "res.cloudinary.com",
        pathname: "**", // Allows any path under this hostname
      },
    ],
  },
};

export default nextConfig;
