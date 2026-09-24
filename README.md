# 🤪 MADD — make intent verifiable

The EN/FR Hugo source for [madd.sh](https://madd.sh). One authored Markdown page
produces HTML and Markdown; generated indexes expose the public resources.
The stable CLI is **0.1.3**. Contract validation and evidence verification are
available in **0.2.0-rc.1** under npm's `next` tag. This site is deployed from
`main`; the RC is explicitly not a stable release.

## Local checks

Use Node **22.23.3** (`.node-version`) and Hugo **0.155.3** (`.hugo-version`).
The Linux x86_64 installer verifies the release archive against its reviewed
SHA-256 before installing to the ignored `.tools/` directory.

```sh
npm ci --ignore-scripts
make install-hugo
npx --no-install playwright install chromium
make check HUGO=.tools/hugo
make preview HUGO=.tools/hugo
```

`make test` tests the existing `public/` build over a temporary loopback HTTP
server. `make check` builds it first. The default local browser is Chromium;
the full release check requires all three engines:

```sh
npx --no-install playwright install --with-deps chromium firefox webkit
BROWSERS=chromium,firefox,webkit make check HUGO=.tools/hugo
```

The suite checks keyboard/pointer search, focus, browser history, native keys,
editable fields, JavaScript-free navigation, corresponding EN/FR routes,
all internal links and fragments, 320/390/768/1440px layouts, actual 200% text
scaling, reduced motion, theme persistence and WCAG text color contrast.
It also checks HTML/Markdown parity, schemas, examples, manifests, hashes and
the pinned workflow policy. Screenshots go to ignored `test-results/`.
Browser automation does not replace manual screen-reader or touch-device review.
`make social` regenerates the 1200×630 share card from the home title and its
HTML/CSS source; it uses the already installed Playwright Chromium.

## Public inputs and versions

Author public prose only in `content/en/` and `content/fr/`; UI labels live in
`i18n/`. Shared layouts render the article body with `.Content` and `.RawContent`.
The resource index uses those pages plus the explicit `data/resources.json`
allowlist. The test also names every permitted `static/` file. There is no
recursive import from working contracts, other repositories or CI transcripts.
The pilot `.madd/contract.d/` stays outside Hugo's published inputs.

Preserve `static/contract.schema.json` and `schemas/legacy-0.1.3/` for legacy
readers. Candidate schemas live under `schemas/draft/0.2.0/`; update the matching
resource digest whenever their bytes change. The synthetic example deliberately
contains a planned, unexecuted check. A status never substitutes for evidence.

## Review, publish and rollback

Pull-request CI has read-only permissions and only builds/tests. The existing
Pages workflow retains `main`, the `github-pages` environment and `madd.sh`
(`static/CNAME`); even a manual run is restricted to `main`. It runs the three
browser checks before uploading the deployment artifact. Hugo and Node versions,
development dependencies and all Action commit IDs are pinned.

Before a stable release, obtain an independent diff review, a successful remote
CI run and a recorded manual screen-reader/touch review. The RC is available
with `npx --yes @madd-sh/madd@next`; its source and provenance are linked from
the CLI release workflow. Keep RC/stable wording accurate.

Retain the previous successful Pages commit/artifact. If navigation or public
resources regress, revert the relaunch commit through review and deploy the
previous known-good revision through the same Pages workflow. Do not change DNS.
Existing EN/FR `.html`/`.md` routes, landing/method/skills anchors and `/manifesto.html`
are covered by the regression check.

Contributions: [issues](https://github.com/madd-sh/madd-sh.github.io/issues) and
[method discussions](https://github.com/madd-sh/madd/discussions). License: MIT.
