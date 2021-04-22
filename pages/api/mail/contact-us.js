import axios from "axios";

export default (req, res) => {
  let userData;
  if (req.method === "POST") {
    userData = req.body;
    console.log("back end next received a ping on mail endpoint", req.body);
    let config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
      },
    };
    axios
      .post(
        "https://www.google.com/recaptcha/api/siteverify?secret=" +
          process.env.SERVERSIDE_RECAPTCHA_KEY +
          "&response=" +
          req.body.token,
        {},
        config
      )
      .then((googleResp) => {
        if (googleResp.data.success) {
          //On envoie le mail ici
          // TO DO Yoann
          res.statusCode = 200;
          res.end();
        } else {
          console.log(googleResp);
          res.statusCode = 500;
          res.end("Message couldn't be posted.");
        }
      });
  } else {
    res.statusCode = 404;
    res.end("This endpoint doesn't exist.");
  }
};
