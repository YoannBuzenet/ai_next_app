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

module.exports = { getNowInUTC, generateObjectWithdates };
