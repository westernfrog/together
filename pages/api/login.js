import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import Flutter from "@/model/User";
import connectToDatabase from "@/utils/dbConnect";

connectToDatabase();

export default async function login(req, res) {
  if (req.method !== "POST") {
    return res.status(400).json({ success: false, error: "Bad request!" });
  }

  const user = await Flutter.findOne({ username: req.body.username });
  if (!user) {
    return res
      .status(200)
      .json({ success: false, error: "No user found. Create an account!" });
  }

  const cipher = CryptoJS.AES.decrypt(user.password, "secret123");
  const decryptedPass = cipher.toString(CryptoJS.enc.Utf8);

  if (
    req.body.username !== user.username ||
    req.body.password !== decryptedPass
  ) {
    return res.status(200).json({ success: false, error: "Wrong password!" });
  }

  const token = jwt.sign(
    {
      username: user.username,
      name: user.name,
      email: user.email,
    },
    "jwtsecret"
  );

  return res.status(200).json({ success: true, token });
}
