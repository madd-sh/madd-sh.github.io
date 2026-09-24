---
title: "A specification with checkable claims."
linkTitle: "Contract"
description: "JSON fragments, stable requirements and one check registry. Separate what is valid, what is bound and what has delivery evidence."
weight: 2
eyebrow: "INTENT / CONTRACT / EVIDENCE"
status: "Method · 0.1.3 released / 0.2.0 candidate"
---

## Two versions, explicit compatibility

The released CLI **0.1.3** installs the legacy contract and optional agent adapters. Its permissive schema does not certify completeness or delivery. The new **0.2.0 format candidate** is opt-in; it does not silently rewrite legacy contracts.

[Legacy schema](schemas/legacy-0.1.3/contract.schema.json) · [Candidate schema](schemas/draft/0.2.0/contract.schema.json) · [Synthetic candidate example](examples/contract-0.2.0.json)

## Four files to start

```text
.madd/contract.d/
  00-meta.json         identity, owner, format version
  10-intention.json    context, objectives, limits
  20-functional.json   requirements and acceptance
  40-tasks.json        tasks and checks
```

Technical decisions, operations, audit fractions and retrospective sections are optional until the work needs them. The local editor schema is included by contract-only initialization.

## Three different assertions

| Assertion | What it means | What it does not prove |
|---|---|---|
| Structurally valid | Types, required sections, IDs, references and dependency graph pass | Code meets the requirement |
| Checks bound | Selected requirements refer to local acceptance check files | Those checks ran or passed |
| Delivery verified | Trusted CI and independent review receipts match the exact revision, specification and fraction | Absence of every possible defect |

Editing `status` to `done`, `passing` or `verified` never manufactures evidence. A required check that was skipped, failed, is missing or refers to an older revision cannot satisfy delivery.

## Try the candidate

These commands require a checkout of the **candidate branch**, not the published 0.1.3 package:

```sh
git clone --branch feat/madd-relaunch-contracts https://github.com/madd-sh/madd.git
cd madd
npm ci --ignore-scripts
mkdir /tmp/my-madd-change
node bin/madd.js init /tmp/my-madd-change --contract-only
node bin/madd.js validate /tmp/my-madd-change --json
```

Replace the starter requirement, task and check with your own. A planned check is deliberately unbound. Set `binding` to `bound` and `ref` to a relative, existing check file; use `--require-bound` to make that a gate. Add a fraction before using `--fraction FRAC-001`.

## Safe input boundaries

Validation loads only the bundled schema. It refuses duplicate JSON properties or sections, unsupported versions, broken IDs, cycles, path escapes, nested symlinks and oversized input. It does not download schemas or run commands found in a specification. [Read the format and evidence policy](https://github.com/madd-sh/madd/blob/feat/madd-relaunch-contracts/docs/contracts.md).
