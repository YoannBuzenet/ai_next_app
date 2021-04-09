const {
  getNowInUTC,
  getTodayFromMidnightInUTC,
  transformDateIntoUTC,
} = require("./utils");

const isUserLogged = (userIsLoggedUntil) => {
  if (userIsLoggedUntil === undefined) {
    return false;
  }
  // Creating an UTC timestamp
  const nowUTC = getNowInUTC();

  // Compare it with data from back-end
  return new Date(userIsLoggedUntil).getTime() > nowUTC.getTime();
};

const isUserSubscribed = (userIsSubscribedUntil) => {
  if (
    userIsSubscribedUntil === "" ||
    userIsSubscribedUntil === undefined ||
    userIsSubscribedUntil === null
  ) {
    return false;
  }

  const nowUTC = getTodayFromMidnightInUTC();
  const userSubscribeUTC = new Date(userIsSubscribedUntil);

  return userSubscribeUTC > nowUTC;
};

module.exports = { isUserLogged, isUserSubscribed };
