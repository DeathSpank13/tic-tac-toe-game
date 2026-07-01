# Pixel Parlour — Tic-Tac-Toe

A small, self-contained retro Tic-Tac-Toe game built with plain HTML, CSS and
JavaScript. No frameworks, no backend, no accounts, and no personal data.

## Features
- **2-Player** mode (pass-and-play) and **VS Computer** mode.
- The computer uses the **minimax** algorithm, so it is *unbeatable* — the best
  you can do against it is a draw.
- Choose whether you play **X** or **O** against the computer.
- Win / draw detection with a highlighted winning line and a running scoreboard.
- Fully responsive (works on phones) with a neon "arcade" theme.

## Run it locally
Just open `index.html` in any modern web browser — double-click the file, or
right-click → *Open with* → your browser. No build step is needed.

## Publish it (get a public URL)
Pick **one** of these free options:

1. **Netlify Drop (easiest, no account needed to start)**
   - Go to https://app.netlify.com/drop
   - Drag the whole `tic-tac-toe-game` folder onto the page.
   - Netlify gives you a public `https://<random-name>.netlify.app` URL in seconds.
   - (Optional) Create a free account to rename the site and keep it permanent.

2. **GitHub Pages**
   - Create a public repo, upload these files.
   - Settings → Pages → deploy from `main` branch, root folder.
   - Your URL will be `https://<username>.github.io/<repo>/`.

## Files
- `index.html` — markup and layout.
- `style.css` — the neon/CRT retro styling.
- `script.js` — game logic and the minimax computer opponent.
