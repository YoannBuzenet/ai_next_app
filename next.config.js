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
              "default-src 'self' * 'unsafe-inline' 'unsafe-eval'; script-src 'self' * 'unsafe-inline' 'unsafe-eval'; child-src 'self' * 'unsafe-inline' 'unsafe-eval';frame-src 'self' * 'unsafe-inline' 'unsafe-eval'",
          },
        ],
      },
    ];
  },
};
