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
              "default-src 'self' * 'unsafe-inline' 'unsafe-eval'; script-src 'unsafe-inline'; child-src 'unsafe-inline'; frame-src 'unsafe-inline'",
          },
        ],
      },
    ];
  },
};
