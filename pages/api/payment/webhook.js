const axios = require("axios");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
import { buffer } from "micro";
import Cors from "micro-cors";

export const config = {
  api: {
    bodyParser: false,
  },
};

const cors = Cors({
  allowMethods: ["POST", "HEAD"],
});

export default async (req, res) => {
  if (req.method === "POST") {
    let data;
    let eventType;
    // Check if webhook signing is configured.

    // THIS SHOULD BE A VARIABLE
    const webhookSecret = process.env.STRIPE_WEBHOOK;

    let event;
    if (webhookSecret) {
      // Retrieve the event by verifying the signature using the raw body and secret.
      let signature = req.headers["stripe-signature"];

      const buf = await buffer(req);

      try {
        event = await stripe.webhooks.constructEvent(
          buf,
          signature,
          webhookSecret
        );
      } catch (err) {
        console.log(`⚠️  Webhook signature verification failed.`, err);
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

    switch (event.type) {
      case "checkout.session.completed":
        // Payment is successful and the subscription is created.
        // You should provision the subscription and save the customer ID to your database.
        const objectToSend = {
          passphrase: process.env.FRONT_APP_PASSPHRASE,
          stripePurchaseObject: {
            session_id: event.data.object.id,
            customer_email: event.data.object.customer_email,
            customerStripeId: event.data.object.customer,
            mode: event.data.object.mode,
            paymentStatus: event.data.object.payment_status,
            subscription: event.data.object.subscription,
            date: event.created,
            amount: event.data.object.amount_total,
          },
        };

        axios
          .post(
            `${process.env.CENTRAL_API_URL}/api/stripePurchases/createStripePurchase`,
            objectToSend
          )
          .catch((error) =>
            console.error(
              "error while registering stripe purchase to API",
              error
            )
          );

        break;
      case "invoice.paid":
        // Continue to provision the subscription as payments continue to be made.
        // Store the status in your database and check when a user accesses your service.
        // This approach helps you avoid hitting rate limits.
        console.log("event INVOICE PAID", event);
        break;
      case "invoice.payment_failed":
        // The payment failed or the customer does not have a valid payment method.
        // The subscription becomes past_due. Notify your customer and send them to the
        // customer portal to update their payment information.
        // TO DO when we have nodemailer working : mail customer
        console.log("event PAYMENT FAILED", event);
        break;
      default:
      // Unhandled event type
    }

    res.status(200).send();
  }
};
