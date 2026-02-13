import { authenticator } from "otplib";
import QRCode from "qrcode";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      res.setHeader("Allow", ["POST"]);
      return res.status(405).json({ error: "Only POST allowed" });
    }

    const { agentName, incidentNumber, storeId, storeName } = req.body || {};

    if (!agentName || !incidentNumber || !storeId || !storeName) {
      return res
        .status(400)
        .json({ error: "Missing fields: agentName, incidentNumber, storeId, storeName" });
    }

    // Generate a TOTP secret
    const secret = authenticator.generateSecret();

    // otpauth URL
    const otpauth = authenticator.keyuri(
      storeId,
      "StoreHelpDeskAuth",
      secret
    );

    // Generate QR code
    const qrCode = await QRCode.toDataURL(otpauth);

    return res.status(200).json({
      secret,
      qrCode
    });

  } catch (err) {
    console.error("❌ /api/setup error:", err);
    return res.status(500).json({
      error: err.message,
      stack: err.stack
    });
  }
}
