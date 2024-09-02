/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/Index',
        destination: '/login',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.API_URL + '/api/:path*',
      },
    ];
  },

};

export default nextConfig;
