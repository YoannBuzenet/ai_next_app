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
              "default-src * 'unsafe-inline'; script-src * 'unsafe-inline'",
          },
        ],
      },
    ];
  },
};
