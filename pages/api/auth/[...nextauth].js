import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import customAdapter from "./custom_adapter/custom_adapter";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    // ...add more providers here
  ],
  adapter: customAdapter,
});
