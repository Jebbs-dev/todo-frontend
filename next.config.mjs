/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/tasks',
        permanent: false,
      },
    ]
  },
  transpilePackages: ["geist"],
};

export default nextConfig;
