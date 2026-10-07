# Pushkar Goel — Portfolio

A dark, cinematic personal portfolio built with React, Vite, Tailwind CSS,
Framer Motion, and Lenis smooth scrolling.

## Run it

```bash
npm install
npm run dev
```

Then open the printed local URL (usually `http://localhost:5173`).

Build for production:

```bash
npm run build
npm run preview
```

## Edit content in one place

Everything editable — name, bio, stats, skills, projects, journey steps,
GitHub username, and contact links — lives in **`src/data/config.js`**.
No content is hardcoded inside components.

### Things marked `TODO` you'll want to fill in

- `profile.email` / `profile.socials` — real email + LinkedIn URL
- `profile.portraitUrl` — drop a photo in `/public` (e.g. `portrait.jpg`)
  and set `portraitUrl: '/portrait.jpg'`
- `projects[].imageUrl` — real project screenshots
- `projects[].liveUrl` / `githubUrl` — real links per project
- `stats` — real numbers once you have them (nothing is fabricated by default)
- GitHub section — currently a clean placeholder structure; connect the
  GitHub REST API (`https://api.github.com/users/Pushkar-goyal/repos`) in
  `src/components/Github.jsx` if you want live repo data.

## Structure

```
src/
  components/   All page sections + shared UI (Navbar, buttons, background)
  data/config.js  All editable content
  App.jsx        Page composition + Lenis smooth-scroll setup
  index.css      Design tokens / glass + grid utilities
```

## Notes

- Respects `prefers-reduced-motion` throughout.
- Fully responsive (mobile → desktop); the Journey section's scroll-scrub
  timeline is desktop-only and falls back to a vertical timeline on mobile.
- No Three.js is used — the ambient background is CSS/SVG + Framer Motion,
  which keeps mobile performance strong without the extra bundle weight.
