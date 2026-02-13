import speakeasy from "speakeasy";
import QRCode from "qrcode";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      res.setHeader("Allow", ["POST"]);
      return res
        .status(405)
        .json({ error: "Only POST allowed" });
    }

    const { agentName, incidentNumber, storeId, storeName } = req.body ?? {};

    if (!agentName || !incidentNumber || !storeId || !storeName) {
      return res
        .status(400)
        .json({ error: "Missing fields" });
    }

    const secret = speakeasy.generateSecret({
      length: 20,
      name: `StoreHelpDeskAuth:${storeId}`
    });

    // This might be causing the real error — watch for it
    const otpAuthUrl = secret.otpauth_url;
    const qrCode = await QRCode.toDataURL(otpAuthUrl);

    return res.status(200).json({
      secret: secret.base32,
      qrCode
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
      stack: err.stack
    });
  }
}
