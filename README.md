# Pragyan portfolio: home page

Static site. No build step. Deploys to Vercel as-is.

## Run it locally
Double-click `index.html`. The portrait effect works from disk too.

## Deploy on Vercel
Easiest: put this folder in a GitHub repo, then on vercel.com choose "Add New Project", import the repo,
set Framework Preset to "Other", leave build and output settings empty, and deploy.
Or with the CLI: `npm i -g vercel`, then run `vercel` inside this folder.
Add your domain under Project, Settings, Domains.

## Files (all at the top level, no folders)
- `index.html`      the page
- `tokens.css`      generated palette system (do not hand-edit, regenerate it)
- `site.css`        layout and components, sized from your Figma spec
- `main.js`         the portrait halftone and lens effect
- images, `logo.svg`, `favicon.svg`

## Two deliberate differences from your mockup (contrast)
Both are single-line switches at the top of `site.css`:
1. Button labels are bottle green, not white. White on orange is 2.97:1 (fails AA), bottle green is 4.78:1.
   To restore white: set `--btn-label: #FFFFFF;`
2. The secondary button and pills use bottle green, not orange. Orange text on eggshell is 2.52:1.
   To restore orange: set `--btn-secondary: var(--action-primary);`

## Still to do (search for `TODO` and `data-todo` in index.html)
- Contact button: currently jumps to the footer until the real action is designed
- Live prototype links (2 arrow buttons) and case study links (5 buttons): all `#` for now
- Artwork for Thresca, Sarthi Ayurvedic, Aurawear: placeholders (`.ph` blocks)
- Footer links: Fun Stuff, About me, Resume, LinkedIn, Instagram, X, and the Spotify link
- Credentials page (nav link)
- Mobile menu: not designed, so the nav links wrap to a second row on phones
- Fonts: Sora and Switzer load from CDNs. Self-host both before launch for speed and privacy
- Social share image (og:image) and a real page description
