import axios from "axios";
import Bugsnag from "@bugsnag/js";
import { isUserLogged, isUserSubscribed } from "../../../services/userCheck";
Bugsnag.start({ apiKey: process.env.BUGSNAG_KEY });

export default async (req, res) => {
  if (!isUserLogged(req?.body?.user?.isLoggedUntil)) {
    res.status(401).send();
    return;
  } else if (!isUserSubscribed(req?.body?.user?.isSubscribedUntil)) {
    res.status(401).send();
    return;
  }
  const objectToSend = {
    passphrase: process.env.FRONT_APP_PASSPHRASE,
    idUser: req?.body?.user?.id,
  };

  // TODO Ping le bon endpoint

  try {
    const APIresp = await axios.post(
      `${process.env.CENTRAL_API_URL}/customer_portal/get_stripe_user_id`,
      objectToSend
    );

    // API resp doit contenir le stripe user id

    res.status(200).json();
  } catch (e) {
    Bugsnag.notify(new Error(e));
    res.status(500).send();
  }
};
