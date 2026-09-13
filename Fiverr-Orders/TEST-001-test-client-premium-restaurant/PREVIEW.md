# Preview — TEST-001

## Preview URL

Local preview (this environment): [http://127.0.0.1:4173/](http://127.0.0.1:4173/)

```bash
cd Fiverr-Orders/TEST-001-test-client-premium-restaurant
npm install
npm run build
npm run preview
```

Cloudflare Pages, Vercel, and Netlify CLIs were not available, and no hosting credentials were present. Nothing was published to production.

Source branch: `cursor/fiverr-order-production-workflow-22f3`

## Pages completed

- Home — cinematic hero, house story, experience cards, reservation CTA
- Menu — five sample categories with tab switching
- Contact — validated reservation form and pending house notes

## Features completed

- Responsive desktop / tablet / mobile layout
- Smooth page enters, hero motion, scroll reveals
- Interactive menu tabs
- Contact form validation (on-device only)
- Sample-content banner (no fake live listing)
- Basic SEO + `noindex` while this is a preview

## Known limitations

- Buyer supplied no name, logo, photos, menu, hours, address, or inbox
- All copy in `src/data/sampleContent.ts` is labeled sample
- Form does not send email until a destination is provided
- No public preview host — local / PR review only

## QA status

| Check | Result |
| --- | --- |
| Typecheck | Pass |
| Lint | Pass |
| Tests | 11/11 pass |
| Production build | Pass |
| HTML/secret scan | Pass |
| Production npm audit | 0 vulnerabilities |
| Headless Chrome flows | Pass — Home, Menu tabs, Contact validate + success, mobile nav |
| Console errors | None |
| Public deploy | Skipped — no credentials, and delivery is forbidden on this test run |

Screenshots: `qa/screenshots/`

## Remaining decisions

1. Approve, request revision, or cancel delivery
2. Whether to keep the dark cinematic direction
3. Client answers in `QUESTIONS_FOR_CLIENT.md` before any real listing goes live
