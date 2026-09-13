# TEST-001 — Premium Restaurant Website

Simulated Fiverr Standard package for **Test Client**. Status: waiting for Amir’s approval. Do not deliver this order.

## Stack

- Vite 7, React 19, TypeScript, React Router
- CSS custom properties, no UI kit
- Vitest + Testing Library

## Local

```bash
cd Fiverr-Orders/TEST-001-test-client-premium-restaurant
npm install
npm run dev
```

## Quality gate

```bash
npm run qa
```

Runs typecheck, lint, tests, and production build.

## Preview

```bash
npm run preview
```

Serves the production build at `http://127.0.0.1:4173`. See `PREVIEW.md` after QA.

## What is sample

The buyer supplied no name, menu, hours, address, logo, or photography. The site is a finished cinematic shell with clearly labeled sample copy. Replace `src/data/sampleContent.ts` when real content arrives.

## Security

No API keys, `.env` files, or hosting credentials are used. The contact form does not send email.
