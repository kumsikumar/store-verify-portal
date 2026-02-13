import speakeasy from "speakeasy";
import QRCode from "qrcode";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res
      .status(405)
      .json({ error: "Method not allowed. Use POST." });
  }

  const {
    agentName,
    incidentNumber,
    storeId,
    storeName
  } = req.body || {};

  if (!agentName || !incidentNumber || !storeId || !storeName) {
    return res
      .status(400)
      .json({ error: "Missing required fields" });
  }

  try {
    const secret = speakeasy.generateSecret({
      length: 20,
      name: `StoreHelpDeskAuth:${storeId}`
    });

    const qrCode = await QRCode.toDataURL(secret.otpauth_url);

    return res.status(200).json({
      secret: secret.base32,
      qrCode
    });
  } catch (err) {
    console.error("TOTP setup API error:", err);
    return res
      .status(500)
      .json({ error: "Internal server error" });
  }
}
