# Korea Trip Planner

Personal travel execution assistant for the Korea 2026 trip.

## Live

https://korea-trip-planner.xiwenliu390.workers.dev/

## Current

- React + Vite
- Leaflet daily map
- Fixed and candidate POIs
- Current-location support
- Jeju Day 1–5 structured itinerary data (2026-09-26 to 2026-09-30)
- Day switcher with per-day timeline / map / food pool / settings
- Dynamic plan switching:
  - Day 1 Shopping / Relax
  - Day 2 Full Olle / Hybrid / E-bike
  - Day 3 Sunrise / Sleep-in
  - Day 4 Route 8 Full / Shortcut
- +10 / +20 / +30 minute schedule shifting
- Completed-node and plan persistence in local storage
- Place cards with Naver / Google external navigation
- Mobile bottom navigation: 行程 / 地图 / 餐饮 / 设置
- Verification notes for ferries, route versions, opening hours and uncertain POI coordinates

## Data policy / Single Source of Truth

`src/data/day1.js` through `src/data/day5.js` are the structured source of truth for the current Jeju plan. Confirmed trip decisions are written into these files. Time-sensitive or still-unverified facts are explicitly marked in `verificationNotes`, `approximate`, or place notes instead of being guessed.

## Next

- Review Day 2–5 details in the live app and adjust from user feedback
- Verify remaining restaurant POIs and exact coordinates
- Add T-1 operational checks for opening hours, ferries, route changes and weather
- Add Seoul 10/1–10/3 after Jeju is reviewed

## Deployment

Production is deployed automatically from the `main` branch to Cloudflare Workers.
