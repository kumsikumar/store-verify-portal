import { verify } from "otplib";

export default function handler(req, res) {
  try {
    if (req.method !== "POST") {
      res.setHeader("Allow", ["POST"]);
      return res.status(405).json({ error: "Only POST allowed" });
    }

    const { secret, token } = req.body || {};
    if (!secret || !token) {
      return res.status(400).json({ error: "Missing secret or token" });
    }

    // verify the token
    const isValid = verify({ secret, token });

    return res.status(200).json({ verified: isValid });
  } catch (err) {
    console.error("API verify error:", err);
    return res.status(500).json({ error: err.message });
  }
}
