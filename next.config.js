/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  output: "standalone",
  webpack: (config, options) => {
    config.experiments = {
      layers: true,
      asyncWebAssembly: true,
    };
    return config;
  },
};
