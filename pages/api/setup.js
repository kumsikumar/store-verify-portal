import speakeasy from "speakeasy";
import QRCode from "qrcode";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      res.setHeader("Allow", ["POST"]);
      return res
        .status(405)
        .json({ error: "Method not allowed. Use POST." });
    }

    // Parse body safely
    const { agentName, incidentNumber, storeId, storeName } = req.body ?? {};

    // Log what we received
    console.log("🔹 /api/setup body:", {
      agentName,
      incidentNumber,
      storeId,
      storeName,
      rawBody: req.body,
    });

    if (!agentName || !incidentNumber || !storeId || !storeName) {
      console.warn("⚠ Missing required fields in /api/setup");
      return res
        .status(400)
        .json({ error: "Missing required fields" });
    }

    // Generate secret
    const secret = speakeasy.generateSecret({
      length: 20,
      name: `StoreHelpDeskAuth:${storeId}`,
    });

    // Generate QR code
    const qrCode = await QRCode.toDataURL(secret.otpauth_url);

    console.log("✅ /api/setup success:", { secret: secret.base32 });

    return res.status(200).json({
      secret: secret.base32,
      qrCode,
    });
  } catch (error) {
    // Log the actual error server‑side
    console.error("❌ /api/setup error:", error);

    return res
      .status(500)
      .json({ error: "Internal server error in /api/setup" });
  }
}
