/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    domains: ['media.kitsu.io'],
  },
  transpilePackages: ['antd']
};

module.exports = nextConfig;
