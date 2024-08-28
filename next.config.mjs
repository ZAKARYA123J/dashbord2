/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/login',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://b7bf-196-115-75-116.ngrok-free.app/api/login/:path*',
      },
    ];
  },
};

export default nextConfig;
