import axios from "axios";

export default async (req, res) => {
  console.log("call received to call back end");

  let idUser;
  if (req?.body?.user?.provider === "google") {
    idUser = req.body.user.googleId;
  }

  const objectToSend = {
    passphrase: process.env.FRONT_APP_PASSPHRASE,
    user: req.body.user,
    provider: req?.body?.user?.provider,
  };

  try {
    const APIresp = await axios.post(
      `${process.env.CENTRAL_API_URL}/api/users/EnableFreeAccess`,
      objectToSend
    );

    res.status(200).json(APIresp.data);
  } catch (e) {
    res.status(500).json(e);
  }
};
