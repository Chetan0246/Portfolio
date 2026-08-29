# Moorthy Chetan — Portfolio

Personal portfolio built with **React + Vite + Framer Motion**.

## Tech Stack
- React 18 + Vite 5
- Framer Motion (animations)
- EmailJS (contact form)
- CSS Modules + CSS Custom Properties
- Canvas API (particle constellation + digital rain)

## Getting Started

```bash
npm install
npm run dev        # http://localhost:5173
```

## Build

```bash
npm run build      # output → dist/
npm run preview    # preview production build
```

## EmailJS Setup

Open `src/components/Contact/Contact.jsx` and replace:
```js
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';
```

Get credentials free at [emailjs.com](https://www.emailjs.com).

## Deployment

Deployed on Vercel. Any push to `main` auto-deploys.
