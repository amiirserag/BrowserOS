# Architecture — TEST-001

Isolated Vite + React + TypeScript site for Fiverr order TEST-001.

## Routes

| Path | Page |
| --- | --- |
| `/` | Home — cinematic hero, house story, experience cards, reservation CTA |
| `/menu` | Menu — category tabs and sample dishes |
| `/contact` | Contact — validated reservation form and pending house notes |

## Motion

- Page enter fade/blur on route change
- Ken Burns wash on the hero stage
- IntersectionObserver scroll reveals
- `prefers-reduced-motion` disables animation

## Form

Validation lives in `src/lib/formValidation.ts`. Successful submits stay on-device. No email, API, or third-party form endpoint is configured because none was supplied.
