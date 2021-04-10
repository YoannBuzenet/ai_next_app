const axios = require("axios");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// REPRENDRE LA :
// stripe.com/docs/billing/subscriptions/checkout

export default async (req, res) => {
  let data;
  let eventType;
  // Check if webhook signing is configured.

  // THIS SHOULD BE A VARIABLE
  const webhookSecret = process.env.STRIPE_WEBHOOK;

  console.log("ça marche ?", webhookSecret);

  if (webhookSecret) {
    // Retrieve the event by verifying the signature using the raw body and secret.
    let event;
    let signature = req.headers["stripe-signature"];

    try {
      event = stripe.webhooks.constructEvent(
        req.body || req.rawBody,
        signature,
        webhookSecret
      );
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`);
      return res.status(400);
    }
    // Extract the object from the event.
    data = event.data;
    eventType = event.type;
  } else {
    // Webhook signing is recommended, but if the secret is not configured in `config.js`,
    // retrieve the event data directly from the request body.
    data = req.body.data;
    eventType = req.body.type;
  }

  console.log("--------------------------------------------------------");
  console.log("data from stripe", data);

  switch (event.type) {
    case "checkout.session.completed":
      // Payment is successful and the subscription is created.
      // You should provision the subscription and save the customer ID to your database.
      break;
    case "invoice.paid":
      // Continue to provision the subscription as payments continue to be made.
      // Store the status in your database and check when a user accesses your service.
      // This approach helps you avoid hitting rate limits.
      break;
    case "invoice.payment_failed":
      // The payment failed or the customer does not have a valid payment method.
      // The subscription becomes past_due. Notify your customer and send them to the
      // customer portal to update their payment information.
      break;
    default:
    // Unhandled event type
  }

  res.status(200);
};
