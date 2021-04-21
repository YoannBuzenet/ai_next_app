import axios from "axios";
import Bugsnag from "@bugsnag/js";
Bugsnag.start({ apiKey: process.env.BUGSNAG_KEY });

export default async (req, res) => {
  let idUser;
  if (req?.body?.user?.provider === "google") {
    idUser = req.body.user.googleId;
  }

  const objectToSend = {
    category: req?.body?.categoryID,
    lang: req?.body?.lang,
    userInput: req?.body?.userInputs,
    passphrase: process.env.FRONT_APP_PASSPHRASE,
    idUser: idUser,
    provider: req?.body?.user?.provider,
    numberOfOutputs: req?.body?.numberOfOutputs,
  };

  try {
    const APIresp = await axios.post(
      `${process.env.CENTRAL_API_URL}/api/service`,
      objectToSend
    );

    res.status(200).json(APIresp.data);
  } catch (e) {
    Bugsnag.notify(new Error(e));
    res.status(500).send();
  }
};
