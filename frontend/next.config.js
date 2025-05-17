/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'], // per supportare immagini da backend
  },
  pageExtensions: ['jsx', 'js'], // permette uso di file .jsx e .js

  // Aggiungi qui la parte per il proxy
  async rewrites() {
    return [
      {
        source: '/api/mission/:path*',
        destination: 'http://localhost:5000/api/mission/:path*', // Cambia con l'URL del tuo backend
      },
    ];
  },
};

module.exports = nextConfig;
