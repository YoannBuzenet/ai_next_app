import axios from "axios";

export default async (req, res) => {
  // payment confirmation comes from stripe. After confirmation, we update user data on API
  try {
    res.status(200).json("payment OK");
  } catch (e) {
    res.status(500).json(e);
  }
};
