# Patches for game repos without push access

These patches add `HUB_BUILD=1` static-export support to each game's
`next.config.ts`. They are needed for the hub at
<https://bifteki-crew.github.io/games/> to be able to build and host each game
under `/games/<slug>/`.

`programmer-panic` already has its analogous Vite change merged. The 3 patches
here cover the Next.js repos that `ilker-dogan` does not currently have push
access to.

## How to apply

Either ask a repo owner to apply them, or grant push access and run:

```sh
cd ~/src/ilker/bifteki-crew/werewolf-hunter-web-v1
git am ~/src/ilker/bifteki-crew/games/patches/werewolf-hunter-web-v1.patch
git push

cd ~/src/ilker/bifteki-crew/weazel-trampoline
git am ~/src/ilker/bifteki-crew/games/patches/weazel-trampoline.patch
git push

cd ~/src/ilker/bifteki-crew/currywurst-kingpin
git am ~/src/ilker/bifteki-crew/games/patches/currywurst-kingpin.patch
git push
```

Or, if pushing to a PR branch:

```sh
git checkout -b hub-build-support
git am <patch>
git push -u origin hub-build-support
gh pr create --fill
```

## What the patches do

Each one converts the `next.config.ts` into a conditional config:

- When `HUB_BUILD=1` is set (i.e. CI building for the games hub), the build
  switches to `output: 'export'` with `basePath` and `assetPrefix` set from
  `NEXT_PUBLIC_BASE_PATH`, plus `images.unoptimized` and `trailingSlash`.
- When `HUB_BUILD` is unset (normal dev / Docker / existing CI), behavior is
  unchanged.

The hub workflow at `.github/workflows/deploy.yml` in `bifteki-crew/games` sets
both env vars when invoking each game's `npm run build`.
