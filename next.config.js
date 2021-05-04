module.exports = {
  distDir: "build",
  async headers() {
    return [
      {
        source: "/",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "default-src * 'self' data: 'unsafe-inline' 'unsafe-eval' *",
          },
        ],
      },
    ];
  },
};
