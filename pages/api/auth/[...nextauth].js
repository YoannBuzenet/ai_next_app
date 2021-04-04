import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import axios from "axios";

const callbacks = {};
let userData;
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
      passphrase: process.env.FRONT_APP_PASSPHRASE,
      provider: "google",
    };

    const userDataFromAPI = await axios
      .post(
        `${process.env.CENTRAL_API_URL}/api/users/loginAndRegisterIfNeeded`,
        finalUserObject
      )
      .catch((err) => console.log("error while pinging API : ", err));

    // console.log("data from API", userData.data);

    // fetch data from back end and add it here in user object
    user = { user, ...userDataFromAPI.data };

    userData = userDataFromAPI.data;
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

  if (userData?.email) {
    //get user monthly words
    let idUser;
    if (userData?.provider === "google") {
      idUser = userData?.googleId;
    }

    const objectToSend = {
      passphrase: process.env.FRONT_APP_PASSPHRASE,
      idUser: idUser,
      provider: userData?.provider,
    };

    const apiResp = await axios.post(
      `${process.env.CENTRAL_API_URL}/api/numberOfWords/userTotalConsumption`,
      objectToSend
    );

    session.wordsTotalConsumption = apiResp.data;

    const apiRespThisMonth = await axios.post(
      `${process.env.CENTRAL_API_URL}/api/numberOfWords/getWordsConsumptionForCurrentMonth`,
      objectToSend
    );

    session.MonthConsumption =
      apiRespThisMonth.data?.dataForCurrentMonth?.[0]?.totalAmount;
  }

  //get user total words

  session.user = userData;
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
