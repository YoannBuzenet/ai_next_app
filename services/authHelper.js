const getHeader = () => {
  const header = `Bearer ${process.env.FRONT_APP_PASSPHRASE}`;

  return {
    headers: {
      Authorization: header,
    },
  };
};

module.exports = { getHeader };
