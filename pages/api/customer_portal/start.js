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

  try {
    const APIresp = await axios.post(
      `${process.env.CENTRAL_API_URL}/customer_portal/get_stripe_user_id`,
      objectToSend
    );

    const userStripeId = APIresp.data;

    // Creating a stripe session to access a customized cutomer portal
    const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

    // Authenticate your user.
    const session = await stripe.billingPortal.sessions.create({
      customer: userStripeId,
      return_url: process.env.NEXTAUTH_URL,
    });

    console.log("log debug", session);
    console.log("log debug session URL", session.url);

    res.redirect(session.url);
  } catch (e) {
    Bugsnag.notify(new Error(e));
    res.status(500).send();
  }
};
