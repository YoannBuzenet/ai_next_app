const { getNowInUTC } = require("./utils");

const isUserLogged = (userIsSubscribedUntil) => {
  if (userIsSubscribedUntil === undefined) {
    return false;
  }
  // Creating an UTC timestamp
  const nowUTC = getNowInUTC();

  // Compare it with data from back-end
  return new Date(userIsSubscribedUntil).getTime() > nowUTC.getTime();
};

module.exports = { isUserLogged };
