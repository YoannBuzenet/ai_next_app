module.exports = {
  distDir: "build",
  async headers() {
    return [
      {
        source: "/",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "default-src * 'self' 'unsafe-inline' data: 'unsafe-inline' 'unsafe-eval' *",
          },
        ],
      },
    ];
  },
};
