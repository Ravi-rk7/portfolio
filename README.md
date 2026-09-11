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
