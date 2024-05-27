/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['three'],
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
  // 이미지 최적화
  images: {    
    deviceSizes: [640, 800, 1920],
    imageSizes: [300, 220, 250],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "tong.visitkorea.or.kr",
        pathname: "/cms/resource/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
