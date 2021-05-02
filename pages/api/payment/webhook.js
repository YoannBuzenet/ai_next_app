const axios = require("axios");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
import Bugsnag from "@bugsnag/js";
import { buffer } from "micro";
import Cors from "micro-cors";
Bugsnag.start({ apiKey: process.env.BUGSNAG_KEY });
import { getHeader } from "../../../services/authHelper";

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
        Bugsnag.notify(new Error(err));
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
            `${process.env.CENTRAL_API_URL}/api/stripePurchases/stripePurchase`,
            objectToSend,
            getHeader()
          )
          .catch((error) => {
            console.error(
              "error while registering stripe purchase to API",
              error
            );
            Bugsnag.notify(new Error(error));
          });

        break;
      case "invoice.paid":
        // Continue to provision the subscription as payments continue to be made.
        // Store the status in your database and check when a user accesses your service.
        // This approach helps you avoid hitting rate limits.
        console.log("event INVOICE PAID", event);
        const objectToSendBackEnd = {
          customerID: event.data.object.customer,
          amount: event.data.object.amount_due,
          billing_reason: event.data.object.billing_reason,
          date: event.created,
          account_country: event.data.object.account_country,
          status: event.data.object.status,
          total: event.data.object.total,
          subscription: event.data.object.subscription,
          customer_email: event.data.object.customer_email,
        };

        axios
          .post(
            `${process.env.CENTRAL_API_URL}/api/stripePurchases/updateSubscription`,
            objectToSendBackEnd,
            getHeader()
          )
          .catch((error) => {
            console.error(
              "error while registering stripe purchase to API",
              error
            );
            Bugsnag.notify(new Error(error));
          });
        break;
      case "invoice.payment_failed":
        // The payment failed or the customer does not have a valid payment method.
        // The subscription becomes past_due. Notify your customer and send them to the
        // customer portal to update their payment information.

        try {
          // call back end-route
          const custrom_stripe_id = event.data.object.customer;
          const subscriptionCanceledObject = {
            customer_id: custrom_stripe_id,
          };
          axios.post(
            `${process.env.CENTRAL_API_URL}/api/subscription/error`,
            subscriptionCanceledObject,
            getHeader()
          );
        } catch (error) {
          Bugsnag.notify(new Error(error));
        }
        console.log("event PAYMENT FAILED", event);
        break;
      case "customer.subscription.updated":
        console.log("user deleted subscription");
        // User canceled his subscription
        try {
          // call back end-route
          const custrom_stripe_id = event.data.object.customer;
          const subscriptionCanceledObject = {
            customer_id: custrom_stripe_id,
          };
          axios.post(
            `${process.env.CENTRAL_API_URL}/api/subscription/cancel`,
            subscriptionCanceledObject,
            getHeader()
          );
        } catch (error) {
          Bugsnag.notify(new Error(error));
        }
        console.log("event subscription canceled", event);
        break;
      default:
      // Unhandled event type
    }

    res.status(200).send();
  }
};
