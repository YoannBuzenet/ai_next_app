import axios from "axios";
import Bugsnag from "@bugsnag/js";
Bugsnag.start({ apiKey: process.env.BUGSNAG_KEY });
import { getHeader } from "../../../services/authHelper";

export default (req, res) => {
  let userData;
  if (req.method === "POST") {
    userData = req.body;
    // console.log("back end next received a ping on mail endpoint", req.body);
    let config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
      },
    };
    axios
      .post(
        "https://www.google.com/recaptcha/api/siteverify?secret=" +
          process.env.SERVERSIDE_GOOGLE_RECAPTCHA_KEY +
          "&response=" +
          req.body.token,
        {},
        config
      )
      .then(async (googleResp) => {
        if (googleResp.data.success) {
          const objectToSend = {
            fullName: req.body.fullName,
            company: req.body.company,
            telephone: req.body.telephone,
            mail: req.body.mail,
            message: req.body.message,
          };
          try {
            axios.post(
              `${process.env.CENTRAL_API_URL}/api/mail/contact-us`,
              objectToSend,
              getHeader()
            );
            res.statusCode = 200;
          } catch (e) {
            Bugsnag.notify(new Error(e));
            res.statusCode = 500;
          }

          res.end();
        } else {
          console.log("google auth didnt work", googleResp);
          Bugsnag.notify(new Error(googleResp));
          res.statusCode = 500;
          res.end("Message couldn't be posted.");
        }
      });
  } else {
    res.statusCode = 404;
    res.end("This endpoint doesn't exist.");
  }
};
