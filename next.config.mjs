import withBundleAnalyzer from '@next/bundle-analyzer';

const config = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})({
  reactStrictMode: true,
  images: {
    domains: ['lh3.googleusercontent.com'], // Add allowed domains here
  },
});

// Export the config
export default config;
