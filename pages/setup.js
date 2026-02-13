import { useState } from "react";

export default function Setup() {
  const [agentName, setAgentName] = useState("");
  const [incidentNumber, setIncidentNumber] = useState("");
  const [storeId, setStoreId] = useState("");
  const [storeName, setStoreName] = useState("");
  const [qr, setQr] = useState("");
  const [secret, setSecret] = useState("");

  const handleGenerate = async () => {
    const res = await fetch("/api/setup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ agentName, incidentNumber, storeId, storeName })
    });

    const data = await res.json();
    setQr(data.qrCode);
    setSecret(data.secret);
  };

  return (
    <div style={{ textAlign: "center", marginTop: 50 }}>
      <h1>Generate Authenticator QR</h1>

      <input
        placeholder="Agent Name"
        value={agentName}
        onChange={(e) => setAgentName(e.target.value)}
      />

      <input
        placeholder="Incident #"
        value={incidentNumber}
        onChange={(e) => setIncidentNumber(e.target.value)}
      />

      <input
        placeholder="Store ID"
        value={storeId}
        onChange={(e) => setStoreId(e.target.value)}
      />

      <input
        placeholder="Store Name"
        value={storeName}
        onChange={(e) => setStoreName(e.target.value)}
      />

      <button onClick={handleGenerate}>Generate QR</button>

      {qr && (
        <>
          <img src={qr} alt="Scan QR" style={{ marginTop: 20 }} />
          <p>Secret: {secret}</p>
        </>
      )}
    </div>
  );
}
