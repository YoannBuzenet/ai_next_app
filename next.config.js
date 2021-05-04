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
              "default-src 'self' *.stripe.com stripe.com google.com *.google.com data: 'unsafe-inline' 'unsafe-eval' *",
          },
        ],
      },
    ];
  },
};
