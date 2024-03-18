/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {key: 'referrer-policy', value: 'no-referrer'}
        ]
      }
    ]
  },
  compiler: {
    styledComponents: {
      displayName: false,
    },
  },
}

module.exports = nextConfig
