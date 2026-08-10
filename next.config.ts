import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  /**
   * 이 폴더가 프로젝트의 최상위임을 못박아 둡니다.
   * 상위 폴더(C:\Users\qkdgh)에 다른 Next.js 프로젝트가 있어서,
   * 이 설정이 없으면 빌드할 때 그 폴더를 최상위로 잘못 인식합니다.
   * 폴더를 복사해서 새 병원 사이트를 만들어도 그대로 두면 됩니다.
   */
  turbopack: {
    root: path.join(__dirname)
  },
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
