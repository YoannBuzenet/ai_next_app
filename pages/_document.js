import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
          <script
            type="text/javascript"
            src="https://js.stripe.com/v3/"
          ></script>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
