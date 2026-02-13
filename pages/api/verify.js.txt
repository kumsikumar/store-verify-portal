import speakeasy from "speakeasy";

export default async function handler(req, res) {
  const { token, secret } = req.body;

  if (!token || !secret) {
    res.status(400).json({ error: "Invalid request" });
    return;
  }

  const verified = speakeasy.totp.verify({
    secret,
    encoding: "base32",
    token,
    window: 1
  });

  res.status(200).json({ verified });
}
