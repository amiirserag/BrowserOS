# QA report — TEST-001

Date: 2026-09-13

## Automated

| Check | Result |
| --- | --- |
| `npm run typecheck` | Pass |
| `npm run lint` | Pass |
| `npm run test` (11) | Pass |
| `npm run build` | Pass (51 modules, 275 kB JS gzip 87 kB) |
| `node qa/check-site.mjs` | Pass — title, description, no secrets, no localhost hrefs in HTML |
| `npm audit --omit=dev` | Pass — 0 production vulnerabilities |
| Dev-only audit | Moderate: Vitest `@vitest/mocker` path traversal (test runner only; not shipped) |

## Security notes

- No `.env`, API keys, or hosting secrets
- Contact form does not POST off-device
- `robots.txt` disallows indexing
- Preview meta is `noindex, nofollow`

## Content policy

- Sample copy is labeled in the banner, footer, and `docs/SAMPLE_CONTENT.md`
- No invented live address, phone, or client identity presented as real

## Browser

Recorded after the preview server is up. See `PREVIEW.md`.
