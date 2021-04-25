const getNowInUTC = () => {
  var date = new Date();
  var now_utc = Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds()
  );
  return new Date(now_utc);
};
const getTodayFromMidnightInUTC = () => {
  var date = new Date();
  var now_utc = Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate()
  );
  return new Date(now_utc);
};

const formatNumberToTwoDigit = (number) => {
  let finalNumber = number;
  const stringifiedNumber = number + "";
  if (stringifiedNumber.length === 1) {
    finalNumber = "0" + stringifiedNumber;
  }
  return finalNumber;
};

const getOneDayinDATEONLYInUTC = (day) => {
  var date = new Date(day);

  var now_DATEONLY =
    "" +
    date.getUTCFullYear() +
    "-" +
    formatNumberToTwoDigit(date.getUTCMonth() + 1) +
    "-" +
    formatNumberToTwoDigit(date.getUTCDate());

  return now_DATEONLY;
};

const transformDateIntoUTC = (date) => {
  var date = new Date(date);
  var now_utc = Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds()
  );
  return new Date(now_utc);
};

const generateObjectWithdates = (numberOfDaysToCreate) => {
  let objectToReturn = [];
  for (let i = 1; i <= numberOfDaysToCreate; i++) {
    var date = new Date();
    date.setDate(date.getDate() - (numberOfDaysToCreate - i));

    var date7daysFromNowUTC = getOneDayinDATEONLYInUTC(date);
    objectToReturn = [...objectToReturn, { date: date7daysFromNowUTC }];
  }

  return objectToReturn;
};

function createId(length) {
  var result = [];
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result.push(
      characters.charAt(Math.floor(Math.random() * charactersLength))
    );
  }
  return result.join("");
}

module.exports = {
  getNowInUTC,
  generateObjectWithdates,
  getTodayFromMidnightInUTC,
  transformDateIntoUTC,
  createId,
};
