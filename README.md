# Lekshmi Nursing Home website

Next.js 15 (App Router) + TypeScript + Tailwind 4. Bilingual routes: `/en` and `/ml`.

## Run
```
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```
Set `NEXT_PUBLIC_SITE_URL=https://your-domain` in the host's environment (used for Open Graph, sitemap, canonical links).

## Change text and hours
All copy for both languages is in `content/site.json` (`en` and `ml` blocks have the same structure).
- Hours shown on the site: `hours` and `hoursNote` in each language block. Edit both languages.
- Hours used by Google (schema.org): `shared.opens`, `shared.closes`, `shared.days`.
- Anything written as `[[like this]]` shows as a highlighted placeholder. Replace it with real text and the highlight disappears.
- Address, phone, RSVP link and map: set `shared.address`, `shared.phone`, `shared.rsvpUrl`, `shared.mapEmbedUrl` once. They replace the placeholders in both languages.

## Change photos
1. Put the image in `public/images/` (JPG or WebP; hero about 2400 px wide, portrait 1600x2000).
2. In `content/images.json` set `"src": "/images/your-file.jpg"` for that slot and check the alt text in both languages.
Slots: `hero`, `doctor`, `doctorWide`, `hospital`, `paddy`, `backwater`. Images are resized and served as AVIF/WebP automatically.

## Language and theme
The header toggle sets a `lang` cookie; visiting `/` sends people to their saved language (or Malayalam if their browser prefers it). Theme follows the device and is remembered per browser.

## Deploy
- Vercel: import the repo, add `NEXT_PUBLIC_SITE_URL`, deploy.
- Cloudflare: use `@opennextjs/cloudflare`.

## Before launch
See `PLACEHOLDERS.md`. Run `grep -rn "\[\[" content` to list every placeholder still in the text. Run Lighthouse on the deployed site, since scores depend on your real photos.
