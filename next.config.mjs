/** @type {import('next').NextConfig} */
const nextConfig = {
  // 프록시할 외부 API의 주소를 /api/로 변경
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://pingulion.shop/:path*", // 프록시할 외부 API의 주소
      },
    ];
  },
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000", // 개발 서버의 기본 URL을 설정
  },
  productionBrowserSourceMaps: true,
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
