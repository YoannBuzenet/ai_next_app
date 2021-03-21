import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import customAdapter from "./custom_adapter/custom_adapter";
import Adapters from "next-auth/adapters";

const callbacks = {};
callbacks.signIn = async function signIn(user, account, metadata) {
  console.log("user", user);
  console.log("account", account);
  console.log("metadata", metadata);
  if (account.provider === "google") {
    const googleUser = {
      id: metadata.id,
      login: metadata.login,
      name: metadata.name,
      avatar: user.image,
    };

    user.accessToken = console.log("google user", googleUser);
    return true;
  }

  return false;
};

callbacks.jwt = async function jwt(token, user) {
  if (user) {
    token = { accessToken: user.accessToken };
  }

  return token;
};

callbacks.session = async function session(session, token) {
  // we can fetch info from back end here to add it to the session
  session.accessToken = token.accessToken;
  return session;
};

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    // ...add more providers here
  ],
  callbacks,
});
