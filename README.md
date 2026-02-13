# 🧪 Store Verify Portal

A simple **TOTP‑based caller verification demo portal** designed for internal help desk workflows.  
This example allows an agent to collect:

- **Agent Name**
- **Incident #**
- **Store ID & Store Name**

…then generate a unique **TOTP authenticator QR code**, which the store caller scans with an authenticator app (e.g., Google Authenticator, FreeOTP), and then verify the 6‑digit code.

This project is built with **Next.js** and deploys easily to **Vercel**.

---

## 📄 Features

✔ Generate a unique TOTP secret + QR code per verification  
✔ Store/Caller identity fields captured  
✔ Authenticator app compatible (standard RFC TOTP)  
✔ Quick deployment via Vercel

---

## 🚀 Live Demo (Deployed URL)

> After you deploy, your public URL might look like:  
> `https://store-verify-portal.vercel.app`

---

## 🛠️ How It Works

1. The agent enters store details in the **Setup** page  
2. The portal generates a unique TOTP secret + QR code  
3. The store caller scans the code in an authenticator app  
4. The agent enters the 6‑digit TOTP code in the **Verify** page  
5. The portal verifies the code

---

## 📁 Project Structure

