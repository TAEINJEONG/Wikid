// eslint-disable-next-line @typescript-eslint/no-require-imports
const removeImports = require('next-remove-imports')();

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.pixabay.com'],
  },
};

module.exports = removeImports(nextConfig);

export default nextConfig;
