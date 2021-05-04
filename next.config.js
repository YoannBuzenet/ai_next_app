module.exports = {
  distDir: "build",
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            // // https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
            key: "Content-Security-Policy",
            value: "default-src [*] 'self' data: 'unsafe-inline'",
          },
        ],
      },
    ];
  },
};
