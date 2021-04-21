import axios from "axios";
import Bugsnag from "@bugsnag/js";

export default async (req, res) => {
  // payment confirmation comes from stripe. After confirmation, we update user data on API
  try {
    res.status(200).json("payment OK");
  } catch (e) {
    Bugsnag.notify(new Error(e));
    res.status(500).send();
  }
};
