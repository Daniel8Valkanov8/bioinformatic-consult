import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Статичен експорт за Netlify (генерира статичен HTML/CSS/JS в out/)
  output: "export",
  // Netlify сервира статични файлове; Next image оптимизацията изисква сървър,
  // затова я изключваме.
  images: {
    unoptimized: true,
  },
  // По-стабилен routing при статичен хостинг (всяка страница е своя папка с index.html).
  trailingSlash: true,
};

export default nextConfig;
