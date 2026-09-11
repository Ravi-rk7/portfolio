# Ravikiran — Portfolio

A developer portfolio that brings selected projects, interface walkthroughs, and engineering decisions into one place for reviewers. It presents Intervia, TejAi, and Yappy through a homepage and individual case studies.

Implemented features include screenshot galleries with keyboard and swipe navigation, local walkthrough videos for Intervia and Yappy, GitHub links, responsive layouts, and interactive motion. An animation pause control and the system reduced-motion preference control continuous effects. Fonts and project media are self-hosted.

## Stack

Next.js 16 App Router, React 19, and TypeScript. Styling uses Tailwind CSS 4 and custom CSS; interactions use Motion, Base UI buttons, Embla Carousel, and Lucide icons. The project uses the standard Next.js build for Vercel.

The technologies described inside the case studies belong to the showcased applications, not to this portfolio's backend.

## Local setup

Requires Node.js **22.13.0 or newer** and npm. Run these commands from the directory containing `package.json`:

```sh
npm ci
npm run dev -- --hostname 127.0.0.1 --port 3000
```

Open http://localhost:3000. No application environment variables or credentials are required for the current portfolio. Keep any future local secrets in ignored `.env*` files; commit only placeholder examples.

## Build and checks

```sh
npm run build
npm start -- --hostname 127.0.0.1 --port 3000
npm run lint
npm run typecheck
```

`npm start` serves the production Next.js build locally and requires a successful build. `npm run typecheck` generates route types and checks TypeScript. `npm run format` formats files in place. No automated test suite or test script is configured.

## Deploy to Vercel

Import the repository into Vercel and select the **Next.js** framework preset. Set the root directory to the folder containing `package.json` (`./` if this repository is imported directly, or `portfolio` if its parent directory is the repository root). Use `npm ci` for installation, `npm run build` for the build command, and the default output directory. No custom `vercel.json` or application environment variables are required. See [Next.js on Vercel](https://vercel.com/docs/frameworks/full-stack/nextjs).

## Structure

- `app/`: root layout, homepage, shared `/work/[slug]` case-study route, 404 page, and global styles.
- `components/`: homepage, navigation, motion system, gallery, GitHub icon, and the button/carousel UI primitives.
- `lib/projects.ts`: project descriptions, gallery paths, source links, and demo disclosures; `lib/utils.ts` provides class-name helpers.
- `public/`: project images, videos, captions, fonts, and licenses.
- `postcss.config.mjs`, `tsconfig.json`: CSS and TypeScript configuration. Next.js uses its defaults.

## Limitations and attribution

Existing lint diagnostics remain in active components, including image-element rules, React effect rules, accessibility rules, and unescaped quotation marks. Type-checking and building are separate from linting.

Production-preview browser checks still report pre-existing React hydration errors (#418). Internal navigation, gallery controls, and the motion toggle work in the tested flows.

This repository presents projects; it does not run their authentication, AI, payments, or messaging backends. Showcased media uses illustrative data, and some walkthrough events are simulated. Preserve each case study's demo disclosures when editing or republishing. The contact links currently point to GitHub; no contact form or résumé download is implemented.

The design takes inspiration from the pixel typography and floating glass navigation of `ohsh.in/work`, with original layouts and supplied project media. Project information comes from the Intervia, TejAi, and Yappy demo kits. Geist Sans, Mono, and Pixel Square are from Vercel; font licenses are retained in `public/fonts/licenses/`. The GitHub mark in `public/github.svg` is from Simple Icons (CC0).
