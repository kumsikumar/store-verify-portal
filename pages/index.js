export default function Home() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to Store Verify Portal</h1>
      <p>
        Navigate to <a href="/setup">Setup</a> to generate QR code.
      </p>
      <p>
        Go to <a href="/verify">Verify</a> to verify a code.
      </p>
    </div>
  );
}
