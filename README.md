# Pixel Parlour — Tic-Tac-Toe

A small, self-contained retro Tic-Tac-Toe game built with plain HTML, CSS and
JavaScript. No frameworks, no backend, no accounts, and no personal data.

### ▶️ [Play it live](https://deathspank13.github.io/tic-tac-toe-game/)

> **Live demo:** https://deathspank13.github.io/tic-tac-toe-game/

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

If you prefer a local server (optional):

```bash
# from inside the tic-tac-toe-game folder
python -m http.server 8000
# then open http://localhost:8000
```

## Deploy to GitHub Pages
This site is published with GitHub Pages:

1. Push these files to a public repo named `tic-tac-toe-game`.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to *Deploy from a branch*.
4. Choose the `main` branch and the `/ (root)` folder, then **Save**.
5. After a minute your site is live at
   **https://deathspank13.github.io/tic-tac-toe-game/**.

## Files
- `index.html` — markup and layout.
- `style.css` — the neon/CRT retro styling.
- `script.js` — game logic and the minimax computer opponent.
