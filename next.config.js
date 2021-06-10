const withPlugins = require("next-compose-plugins");
const withGraphql = require("next-plugin-mini-graphql");

const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: "javascript/auto",
    });

    return config;
  },
};

module.exports = withPlugins([withGraphql], nextConfig);
