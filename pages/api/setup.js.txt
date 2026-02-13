import speakeasy from "speakeasy";
import QRCode from "qrcode";

export default async function handler(req, res) {
  const { agentName, incidentNumber, storeId, storeName } = req.body;

  if (!agentName || !incidentNumber || !storeId || !storeName) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }

  // Create a secret unique for this session
  const secret = speakeasy.generateSecret({
    length: 20,
    name: `StoreHelpDeskAuth:${storeId}`
  });

  // Generate a QR code for the secret’s OTAPA URL
  const otpAuthUrl = secret.otpauth_url;
  const qrDataUrl = await QRCode.toDataURL(otpAuthUrl);

  res.status(200).json({
    secret: secret.base32,
    qrCode: qrDataUrl
  });
}
