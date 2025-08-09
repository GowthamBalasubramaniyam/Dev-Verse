// config-overrides.js
const webpack = require("webpack"); // <--- YOU NEED THIS LINE
const { override, addWebpackPlugin } = require("customize-cra"); // <-- add addWebpackPlugin here

module.exports = override(
  // ADD THIS SECTION:
  addWebpackPlugin(
    new webpack.ProvidePlugin({
      process: "process/browser.js", // This polyfills 'process'
      Buffer: ["buffer", "Buffer"], // This polyfills 'Buffer'
    })
  ),
  // Keep your existing resolve.fallback configuration
  (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      process: require.resolve("process/browser"),
      vm: require.resolve("vm-browserify"),
      async_hooks: false,
      crypto: require.resolve("crypto-browserify"),
      http: require.resolve("stream-http"),
      https: require.resolve("https-browserify"),
      path: require.resolve("path-browserify"),
      zlib: require.resolve("browserify-zlib"),
      stream: require.resolve("stream-browserify"),
      os: require.resolve("os-browserify/browser"), // Make sure you also installed 'os-browserify'
      net: false,
      tls: false,
      fs: false,
    };
    return config;
  }
);
// This file is used to override the default Create React App configuration
// to include polyfills for Node.js core modules in the browser.