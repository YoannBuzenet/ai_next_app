import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import axios from "axios";
import { getHeader } from "../../../services/authHelper";

const callbacks = {};

callbacks.signIn = async function signIn(user, account, metadata) {
  console.log("user", user);
  console.log("account", account);
  console.log("metadata", metadata);
  if (account.provider === "google") {
    const googleUser = {
      email: metadata.email,
      googleId: metadata.id,
      login: metadata.login,
      fullName: metadata.name,
      firstName: metadata.given_name,
      lastName: metadata.family_name,
      avatar: user.image,
      userLocale: metadata.locale,
      accessToken: account.accessToken,
      refreshToken: account.refreshToken,
      expiresIn: account.expires_in,
    };

    const finalUserObject = {
      user: googleUser,
      provider: "google",
    };

    const userDataFromAPI = await axios
      .post(
        `${process.env.CENTRAL_API_URL}/api/users/login-and-register-if-needed`,
        finalUserObject,
        getHeader()
      )
      .catch((err) => console.log("error while pinging API : ", err));

    // console.log("data from API", userData.data);

    // fetch data from back end and add it here in user object
    user = { user, ...userDataFromAPI.data };
    return true;
  }

  return false;
};

callbacks.redirect = async function redirect(url, baseUrl) {
  // console.log("redirection has been called");
  // console.log("redirection", url);
  // console.log("redirection", baseUrl);
  return url.startsWith(baseUrl) ? url : baseUrl;
};

callbacks.jwt = async function jwt(token, user, account, profile, isNewUser) {
  console.log("jwt did trigger");
  console.log("jwt token", token);
  console.log("jwt user", user);
  console.log("jwt account", account);
  console.log("jwt profile", profile);
  console.log("jwt isNewUser", isNewUser);
  if (user) {
    token = { idUser: account.id };
  }

  return token;
};

callbacks.session = async function session(session, token) {
  // we can fetch info from back end here to add it to the session
  console.log("session in session callback", session);
  console.log("token in session callback", token);
  // token in session callback { iat: 1620653204, exp: 1623245204, idUser }

  // refresh user Data
  if (token.hasOwnProperty("idUser")) {
    let apiResp = await axios.get(
      `${process.env.CENTRAL_API_URL}/api/users/googleId/${token.idUser}`,
      getHeader()
    );

    console.log("our new data", apiResp.data);
    session.user = apiResp.data;
  }

  session.idUser = token.idUser;

  return session;
};

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      state: false,
    }),
    // ...add more providers here
  ],
  callbacks,
});
