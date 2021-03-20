const Adapter = (config, options = {}) => {
  async function getAdapter(appOptions) {
    async function createUser(profile) {
      return null;
    }

    async function getUser(id) {
      console.log("bro");
      return null;
    }

    async function getUserByEmail(email) {
      console.log("bro");
      return null;
    }

    async function getUserByProviderAccountId(providerId, providerAccountId) {
      console.log("bro");
      return null;
    }

    async function getUserByCredentials(credentials) {
      console.log("bro");
      return null;
    }

    async function updateUser(user) {
      console.log("bro");
      return null;
    }

    async function deleteUser(userId) {
      console.log("bro");
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
      console.log("bro");
      return null;
    }

    async function unlinkAccount(userId, providerId, providerAccountId) {
      console.log("bro");
      return null;
    }

    async function createSession(user) {
      console.log("bro");
      return null;
    }

    async function getSession(sessionToken) {
      console.log("bro");
      return null;
    }

    async function updateSession(session, force) {
      console.log("bro");
      return null;
    }

    async function deleteSession(sessionToken) {
      console.log("bro");
      return null;
    }

    async function createVerificationRequest(
      identifier,
      url,
      token,
      secret,
      provider
    ) {
      console.log("bro");
      return null;
    }

    async function getVerificationRequest(identifier, token, secret, provider) {
      console.log("bro");
      return null;
    }

    async function deleteVerificationRequest(
      identifier,
      token,
      secret,
      provider
    ) {
      console.log("bro");
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
