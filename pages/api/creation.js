import axios from "axios";

export default async (req, res) => {
  const objectToSend = {
    category: req.body.categoryID,
    lang: "",
    userInput: req.body.userInputs,
    passphrase: process.env.FRONT_APP_PASSPHRASE,
  };

  const APIresp = await axios.post(
    `${process.env.CENTRAL_API_URL}/api/service`,
    objectToSend
  );

  res.status(200).json(APIresp.data);
};
