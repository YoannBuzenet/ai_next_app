import axios from "axios";
import Bugsnag from "@bugsnag/js";
Bugsnag.start({ apiKey: process.env.BUGSNAG_KEY });

export default async (req, res) => {
  // TODO check l'endpoint
  // Comparer les dates avec now en utc
  //   req?.body?.user?.isLoggedUntil
  //   req?.body?.user?.isSubscribedUntil;
  // Si pas logué ou pas abonné, return

  const objectToSend = {
    category: req?.body?.categoryID,
    lang: req?.body?.lang,
    userInput: req?.body?.userInputs,
    passphrase: process.env.FRONT_APP_PASSPHRASE,
    idUser: idUser,
    provider: req?.body?.user?.provider,
    numberOfOutputs: req?.body?.numberOfOutputs,
  };

  // TODO Ping le bon endpoint

  try {
    const APIresp = await axios.post(
      `${process.env.CENTRAL_API_URL}/`,
      objectToSend
    );

    res.status(200).json(APIresp.data);
  } catch (e) {
    Bugsnag.notify(new Error(e));
    res.status(500).send();
  }
};
