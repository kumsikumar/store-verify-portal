import { generateSecret, generateURI } from "otplib";
import QRCode from "qrcode";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      res.setHeader("Allow", ["POST"]);
      return res.status(405).json({ error: "Only POST allowed" });
    }

    const { agentName, incidentNumber, storeId, storeName } = req.body || {};

    if (!agentName || !incidentNumber || !storeId || !storeName) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // generate a Base32 × secret
    const secret = generateSecret();

    // create your otpauth URI
    const otpauth = generateURI({
      label: storeId,           // account name in authenticator
      issuer: "StoreHelpDeskAuth",
      secret: secret,
    });

    // turn URI into an image to scan
    const qrCode = await QRCode.toDataURL(otpauth);

    return res.status(200).json({ secret, qrCode });
  } catch (err) {
    console.error("API setup error:", err);
    return res.status(500).json({ error: err.message });
  }
}
