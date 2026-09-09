# Ravi Kiran — Portfolio

A responsive editorial portfolio built with React, TypeScript, Vinext, and Tailwind CSS. Includes three project case studies, accessible swipeable screenshot galleries, and self-hosted walkthrough videos.

## Run locally

```sh
npm install
npm run dev -- --host 127.0.0.1 --port 3000
```

Open http://localhost:3000. Build with `npm run build`; type-check with `npx tsc --noEmit`.

## Content and design

- `app/page.tsx`: home page, biography, and GitHub contact link.
- `lib/projects.ts`: all project copy, media paths, disclosures, and verified source links.
- `app/work/[slug]/page.tsx`: shared case-study page.
- `app/globals.css`: typography, palette, spacing, responsiveness, and motion.
- `public/projects/`: selected supplied images and videos. No remote asset service is needed.
- `public/fonts/`: local font files and their supplied licenses.

The supplied `../prompt.md` and `../Resources/Resources.txt` were empty when this version was built. Project information comes from the three supplied demo kits. The full name appears in the Yappy cover; the GitHub link comes from the Intervia case study. No email address, résumé, employment history, live app URL, or unverified performance metric has been invented. Replace the GitHub contact links with your preferred contact method when available.

All showcased application media uses illustrative data. Keep the demo disclosures with the media when editing or republishing.

`.openai/hosting.json` identifies this Sites project. Preserve it when redeploying.
