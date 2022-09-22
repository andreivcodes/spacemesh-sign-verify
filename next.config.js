/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  webpack: (config, options) => {
    config.experiments = {
      layers: true,
      asyncWebAssembly: true,
    };
    return config;
  },
};
