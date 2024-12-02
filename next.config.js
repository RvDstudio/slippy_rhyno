/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'avatars.githubusercontent.com',
          },
          {
            protocol: 'https',
            hostname: 'lh3.googleusercontent.com',
          },
          {
            protocol: 'https',
            hostname: 'qwtbhwcdesgkvomjvvay.supabase.co',
          },
          {
            protocol: 'https',
            hostname: 'images.unsplash.com',
          },
          {
            protocol: 'https',
            hostname: 'plus.unsplash.com',
          },
          {
            protocol: 'https',
            hostname: 'jdhltybpmwuijrxqhzjj.supabase.co',
          },
        ],
      },
}

module.exports = nextConfig
