module.exports = {
    experimental: {
      turbo: true, // Turbopack 활성화
    },
    webpack: (config) => {
      config.resolve.fallback = { fs: false };
      return config;
    },
  };
  