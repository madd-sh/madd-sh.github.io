#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
version=$(cat .hugo-version)
[[ "$version" == 0.155.3 ]] || { echo 'Update the reviewed checksum with the version.' >&2; exit 1; }
[[ "$(uname -s)-$(uname -m)" == Linux-x86_64 ]] || { echo 'This installer supports Linux x86_64; install the pinned Hugo version for your platform.' >&2; exit 1; }
download_dir=$(mktemp -d)
trap 'rm -rf "$download_dir"' EXIT
archive="hugo_extended_${version}_linux-amd64.tar.gz"
curl --fail --location --silent --show-error "https://github.com/gohugoio/hugo/releases/download/v${version}/${archive}" --output "$download_dir/$archive"
printf '%s  %s\n' b98243d840f904367ebfaeb53d3c8e51d89a4edec518ef420c1fb3eae3a9cbb1 "$download_dir/$archive" | sha256sum --check --status
tar -xzf "$download_dir/$archive" -C "$download_dir" hugo
mkdir -p .tools
install -m 755 "$download_dir/hugo" .tools/hugo
.tools/hugo version
