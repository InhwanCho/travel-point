/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {    
    remotePatterns: [
      {
        protocol: "http",
        hostname: "tong.visitkorea.or.kr",
        pathname: "/cms/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
