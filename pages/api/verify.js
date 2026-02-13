import { authenticator } from "otplib";

export default function handler(req, res) {
  try {
    if (req.method !== "POST") {
      res.setHeader("Allow", ["POST"]);
      return res.status(405).json({ error: "Only POST allowed" });
    }

    const { secret, token } = req.body || {};

    if (!secret || !token) {
      return res
        .status(400)
        .json({ error: "Missing secret or token" });
    }

    const isValid = authenticator.verify({ token, secret });

    return res.status(200).json({ verified: isValid });

  } catch (err) {
    return res.status(500).json({ error: err.message, stack: err.stack });
  }
}
