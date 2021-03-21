const Adapter = (config, options = {}) => {
  async function getAdapter(appOptions) {
    console.log("bro-7");
    async function createUser(profile) {
      console.log("bro-6");
      return null;
    }

    async function getUser(id) {
      console.log("bro-5");
      return null;
    }

    async function getUserByEmail(email) {
      console.log("bro-4");
      return null;
    }

    async function getUserByProviderAccountId(providerId, providerAccountId) {
      console.log("bro-3");
      return null;
    }

    async function getUserByCredentials(credentials) {
      console.log("bro-2");
      return null;
    }

    async function updateUser(user) {
      console.log("bro-1");
      return null;
    }

    async function deleteUser(userId) {
      console.log("bro0");
      return null;
    }

    async function linkAccount(
      userId,
      providerId,
      providerType,
      providerAccountId,
      refreshToken,
      accessToken,
      accessTokenExpires
    ) {
      console.log("bro1");
      return null;
    }

    async function unlinkAccount(userId, providerId, providerAccountId) {
      console.log("bro2");
      return null;
    }

    async function createSession(user) {
      console.log("bro3");
      return null;
    }

    async function getSession(sessionToken) {
      console.log("bro4");
      return null;
    }

    async function updateSession(session, force) {
      console.log("bro5");
      return null;
    }

    async function deleteSession(sessionToken) {
      console.log("bro6");
      return null;
    }

    async function createVerificationRequest(
      identifier,
      url,
      token,
      secret,
      provider
    ) {
      console.log("bro7");
      return null;
    }

    async function getVerificationRequest(identifier, token, secret, provider) {
      console.log("bro8");
      return null;
    }

    async function deleteVerificationRequest(
      identifier,
      token,
      secret,
      provider
    ) {
      console.log("bro9");
      return null;
    }

    return {
      createUser,
      getUser,
      getUserByEmail,
      getUserByProviderAccountId,
      getUserByCredentials,
      updateUser,
      deleteUser,
      linkAccount,
      unlinkAccount,
      createSession,
      getSession,
      updateSession,
      deleteSession,
      createVerificationRequest,
      getVerificationRequest,
      deleteVerificationRequest,
    };
  }

  return {
    getAdapter,
  };
};

export default {
  Adapter,
};
