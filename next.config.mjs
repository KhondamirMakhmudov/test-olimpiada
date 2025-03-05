/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXTAUTH_URL: "https://iq.iq-math.uz/",

    NEXTAUTH_SECRET:
      "0bb43cd9f73216be2a5676af4f6b4de5efdcb40443e84b962c6b07267a108f7c",
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
