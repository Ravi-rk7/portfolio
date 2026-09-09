# Ravi Kiran — Portfolio

A developer portfolio with a red-lit dark theme, locally hosted Geist Pixel typography, and Motion for React. Inspired by the pixel typography and floating glass navigation of the supplied ohsh.in/work reference, with original layouts and the supplied Intervia, TejAi, and Yappy projects.

Motion includes a pointer-reactive canvas pixel field, text decoding, spring-based magnetic links and project tilt, scroll-linked hero movement, sticky project cards, section reveals, and a continuous tech marquee. The dock includes an animation pause control; the site also respects the system reduced-motion preference. Continuous effects pause when disabled, and the canvas limits drawing to 25 frames per second.

The three case studies retain screenshot galleries, keyboard and swipe navigation, and self-hosted walkthrough videos. Fonts and project media are local.

## Run locally

```sh
npm install
npm run dev -- --host 127.0.0.1 --port 3000
```

Open http://localhost:3000. Build with `npm run build`; type-check with `npx tsc --noEmit`.

## Content and design

- `components/portfolio-home.tsx`: home page, project presentation, biography, and GitHub contact links.
- `components/motion-system.tsx`: motion preferences, canvas, text decoding, and magnetic links.
- `components/site-header.tsx`: active navigation dock, progress, clock, and motion toggle.
- `lib/projects.ts`: all project copy, media paths, disclosures, and verified source links.
- `app/work/[slug]/page.tsx`: shared case-study page.
- `app/globals.css`: typography, palette, spacing, responsiveness, and motion.
- `public/projects/`: selected supplied images and videos. No remote asset service is needed.
- `public/fonts/`: local fonts and licenses, including Geist Sans, Mono, and Pixel Square from Vercel.
- `public/github.svg`: GitHub mark from Simple Icons (CC0).

The supplied `../prompt.md` and `../Resources/Resources.txt` were empty when this version was built. Project information comes from the three supplied demo kits. The full name appears in the Yappy cover; the GitHub link comes from the Intervia case study. No email address, résumé, employment history, live app URL, or unverified performance metric has been invented. Replace the GitHub contact links with your preferred contact method when available.

All showcased application media uses illustrative data. Keep the demo disclosures with the media when editing or republishing.

`.openai/hosting.json` identifies this Sites project. Preserve it when redeploying.
