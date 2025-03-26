// eslint-disable-next-line @typescript-eslint/no-require-imports
const removeImports = require('next-remove-imports')();
import type { Configuration } from 'webpack';

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.pixabay.com'],
  },
  webpack(config: Configuration) {
    config.module?.rules?.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

module.exports = removeImports(nextConfig);
