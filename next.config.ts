/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  api: {
    bodyParser: {
      sizeLimit: '10mb', // Increase the body size limit for file uploads
    },
  },
};

export default nextConfig;
