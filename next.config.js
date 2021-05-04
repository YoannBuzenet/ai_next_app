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
              "default-src * 'self' data: 'unsafe-inline' 'unsafe-eval' *; child-src * 'self' data: 'unsafe-inline' 'unsafe-eval' *; script-src 'unsafe-inline' 'self' https://js.stripe.com/v3",
          },
        ],
      },
    ];
  },
};
