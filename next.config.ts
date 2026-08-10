import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 외부 사진 주소를 쓰려면 그 도메인을 여기에 추가해야 화면에 나옵니다.
    // (예: 아임웹 cdn.imweb.me, 네이버 modo 등)
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" }
    ]
  }
};

export default nextConfig;
