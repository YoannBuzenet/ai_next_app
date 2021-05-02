const axios = require("axios");
var Bugsnag = require("@bugsnag/js");
Bugsnag.start({ apiKey: process.env.BUGSNAG_KEY });
import { getHeader } from "../../../services/authHelper";

export default async (req, res) => {
  const { session_id, user } = req.body;

  console.log("session_id", session_id);
  console.log("user", user);
  console.log("req.body", req.body);

  const objectToSend = {
    session: session_id,
    userID: user.id,
  };

  try {
    // ping generic API
    const axiosCall = await axios.patch(
      `${process.env.CENTRAL_API_URL}/api/stripePurchases/stripePurchase`,
      objectToSend,
      getHeader()
    );
    console.log("axios call", axiosCall);
    res.status(200).send();
  } catch (e) {
    res.status(500);
    Bugsnag.notify(new Error(e));
    console.log("error while saving", e);
    return res.send();
  }
};
