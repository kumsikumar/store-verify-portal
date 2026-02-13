import { useState } from "react";

export default function Verify() {
  const [secret, setSecret] = useState("");
  const [token, setToken] = useState("");
  const [result, setResult] = useState(null);

  const handleVerify = async () => {
    const res = await fetch("/api/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret, token })
    });
    const data = await res.json();
    setResult(data.verified ? "✔ Verified" : "✖ Invalid");
  };

  return (
    <div style={{ textAlign: "center", marginTop: 50 }}>
      <h1>Verify 6‑digit Code</h1>
      <input
        placeholder="Secret (from setup)"
        value={secret}
        onChange={(e) => setSecret(e.target.value)}
      />
      <input
        placeholder="TOTP Code"
        value={token}
        onChange={(e) => setToken(e.target.value)}
      />
      <button onClick={handleVerify}>Verify</button>
      {result && <p>{result}</p>}
    </div>
  );
}
