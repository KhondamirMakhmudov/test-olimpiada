/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXTAUTH_URL: "https://www.iq-math.uz/",
    // NEXTAUTH_URL: "http://localhost:3000",
    NEXTAUTH_SECRET:
      "a1d808591edf4ecda7262ad750234b7c5d777f05f76dca55123dd50b1e65568c",
  },
  // permanently

  // async redirects() {
  //   return [
  //     {
  //       source: "/",
  //       destination: "/auth/login",
  //       permanent: true,
  //       basePath: false,
  //     },
  //   ];
  // },
};

export default nextConfig;
