#!/usr/bin/env bash
# Build each game repo and copy its static output into dist/<slug>/.
# Each game is built with a basePath of /games/<slug> so asset URLs resolve
# correctly when served from https://bifteki-crew.github.io/games/<slug>/.
set -euo pipefail

HUB_DIST="$(pwd)/dist"
mkdir -p "$HUB_DIST"

if [ -z "${GH_TOKEN:-}" ]; then
  echo "::warning::GAMES_READ_TOKEN secret not set — skipping game builds. Hub will deploy without playable games."
  exit 0
fi

# Format: <slug> <repo> <build_output_dir> <runtime>
# runtime: "next" | "vite"
GAMES=(
  "programmer-panic    bifteki-crew/programmer-panic     dist  vite"
  "werewolf-hunter     bifteki-crew/werewolf-hunter-web-v1  out   next"
  "weazel-trampoline   bifteki-crew/weazel-trampoline    out   next"
  "currywurst-kingpin  bifteki-crew/currywurst-kingpin   out   next"
)

FAILED=()

build_one() {
  local slug=$1
  local repo=$2
  local out=$3
  local runtime=$4
  local base_path="/games/${slug}"
  local workdir
  workdir="$(mktemp -d)"

  echo "::group::Build ${slug} (${repo})"
  git clone --depth 1 "https://x-access-token:${GH_TOKEN}@github.com/${repo}.git" "$workdir"
  pushd "$workdir" >/dev/null

  npm ci --no-audit --no-fund

  if [ "$runtime" = "next" ]; then
    NEXT_PUBLIC_BASE_PATH="$base_path" npm run build
  else
    VITE_BASE_PATH="${base_path}/" npm run build
  fi

  if [ ! -d "$out" ]; then
    echo "::error::expected build output dir '$out' not found in $repo"
    popd >/dev/null
    rm -rf "$workdir"
    return 1
  fi

  mkdir -p "${HUB_DIST}/${slug}"
  cp -r "${out}/." "${HUB_DIST}/${slug}/"

  popd >/dev/null
  rm -rf "$workdir"
  echo "::endgroup::"
}

for line in "${GAMES[@]}"; do
  # shellcheck disable=SC2086
  set -- $line
  slug=$1; repo=$2; out=$3; runtime=$4
  if ! build_one "$slug" "$repo" "$out" "$runtime"; then
    echo "::warning::failed to build $slug — hub will deploy without it"
    FAILED+=("$slug")
  fi
done

if [ ${#FAILED[@]} -gt 0 ]; then
  echo "::warning::Games failed to build: ${FAILED[*]}"
fi

echo "Built games:"
ls -1 "$HUB_DIST"
