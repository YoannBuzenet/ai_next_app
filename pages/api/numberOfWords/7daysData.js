import axios from "axios";
import Bugsnag from "@bugsnag/js";

export default async (req, res) => {
  let idUser;
  if (req?.body?.session?.user?.provider === "google") {
    idUser = req.body.session.user.googleId;
  }

  const objectToSend = {
    passphrase: process.env.FRONT_APP_PASSPHRASE,
    idUser: idUser,
    provider: req?.body?.session?.user?.provider,
  };

  const apiResp = await axios.post(
    `${process.env.CENTRAL_API_URL}/api/numberOfWords/userData7differentDays`,
    objectToSend
  );
  try {
    res.status(200).json(apiResp.data);
  } catch (e) {
    Bugsnag.notify(new Error(e));
    res.status(500).send();
  }
};
