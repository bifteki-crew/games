# Bifteki Crew Games

Hub site for all games made by the [Bifteki Crew](https://github.com/bifteki-crew).
Live at: <https://bifteki-crew.github.io/games/>

## How it works

The Astro hub is built and deployed by `.github/workflows/deploy.yml`. The
workflow then clones each game repo, builds it with `BASE_PATH=/games/<slug>`,
and copies the static output into `dist/<slug>/`. Everything is published as a
single GitHub Pages site.

URLs:

- Hub: `https://bifteki-crew.github.io/games/`
- Per game: `https://bifteki-crew.github.io/games/<slug>/`

## Local development

```sh
npm install
npm run dev
```

`npm run build` only builds the hub itself. The games are only built in CI.

## Adding a game

1. Add an entry to [`src/data/games.ts`](src/data/games.ts).
2. Append a row to the `GAMES` array in [`scripts/build-games.sh`](scripts/build-games.sh).
3. In the game repo, make sure the build respects a `BASE_PATH` env var (see
   sibling game repos for examples), and add a `repository_dispatch` step to
   notify this repo on push to `main`.

## Required secrets

- `GAMES_READ_TOKEN` — a fine-grained PAT with `Contents: Read` on the
  `bifteki-crew/*` game repos. Used by `build-games.sh` to clone private repos.
