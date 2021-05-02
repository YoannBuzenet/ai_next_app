import axios from "axios";
import Bugsnag from "@bugsnag/js";
Bugsnag.start({ apiKey: process.env.BUGSNAG_KEY });
import { getHeader } from "../../../services/authHelper";

export default async (req, res) => {
  const apiResp = await axios.get(
    `${process.env.CENTRAL_API_URL}/api/numberOfWords/${req?.body?.session?.user?.id}/total-consumption`,
    getHeader()
  );
  try {
    res.status(200).json(apiResp.data);
  } catch (e) {
    Bugsnag.notify(new Error(e));
    res.status(500).send();
  }
};
