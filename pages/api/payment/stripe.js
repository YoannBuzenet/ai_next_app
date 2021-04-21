const axios = require("axios");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
var Bugsnag = require("@bugsnag/js");

export default async (req, res) => {
  const { priceId } = req.body;

  const mode = req.body.mode === "payment" ? "payment" : "subscription";

  // See https://stripe.com/docs/api/checkout/sessions/create
  // for additional parameters to pass.

  const stripeObject = {
    payment_method_types: ["card"],
    mode: mode,
    line_items: [
      {
        price: priceId,
        // For metered billing, do not pass quantity
        quantity: 1,
      },
    ],
    // {CHECKOUT_SESSION_ID} is a string literal; do not change it!
    // the actual Session ID is returned in the query parameter when your customer
    // is redirected to the success page.

    success_url: `${process.env.NEXTAUTH_URL}/subscribesuccess?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXTAUTH_URL}/paymentfailed`,
  };

  try {
    const session = await stripe.checkout.sessions.create(stripeObject);

    res.send({
      sessionId: session.id,
    });
  } catch (e) {
    res.status(400);
    Bugsnag.notify(new Error(e));
    return res.send();
  }
};
