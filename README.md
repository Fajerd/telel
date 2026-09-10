# Daylight — Department Store Demo

A React + Vite storefront: Clothing, Home Appliances, Furniture.
Prices in KWD, English/Arabic with RTL, WhatsApp floating button, mobile-responsive.

## Run locally

```bash
npm install
npm run dev
```

## Deploy to Vercel

1. Push this folder to a GitHub repo (make sure `package.json` sits at the repo root,
   or set the Vercel project's **Root Directory** to wherever this folder lives).
2. In Vercel: **Add New Project** → import the repo.
3. Framework Preset: **Vite** (auto-detected). Build Command: `npm run build`.
   Output Directory: `dist`.
4. Deploy.

## Before going live

- Open `src/App.jsx` and replace `WHATSAPP_NUMBER` near the top with your real
  WhatsApp number (country code + digits, no `+` or spaces).
- Swap the Tailwind CDN `<script>` in `index.html` for a proper Tailwind build
  step if you want smaller, production-grade CSS (the CDN version works fine
  for a demo/portfolio deployment, but Tailwind recommends the PostCSS/CLI
  build for production).
