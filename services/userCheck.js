const { getNowInUTC } = require("./utils");

const isUserLogged = (userIsSubscribedUntil) => {
  // Creating an UTC timestamp
  const nowUTC = getNowInUTC();

  // Compare it with data from back-end
  return new Date(userIsSubscribedUntil).getTime() > nowUTC.getTime();
};

module.exports = { isUserLogged };
