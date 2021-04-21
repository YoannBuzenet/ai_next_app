const axios = require("axios");

export default async (req, res) => {
  const { session_id, user } = req.body;

  console.log("session_id", session_id);
  console.log("user", user);
  console.log("req.body", req.body);

  const objectToSend = {
    passphrase: process.env.FRONT_APP_PASSPHRASE,
    session: session_id,
    userID: user.id,
  };

  try {
    // ping generic API
    const axiosCall = await axios.post(
      `${process.env.CENTRAL_API_URL}/api/stripePurchases/sessionLink`,
      objectToSend
    );
    console.log("axios call", axiosCall);
    res.status(200).send();
  } catch (e) {
    res.status(500);
    console.log("error while saving", e);
    return res.send();
  }
};
