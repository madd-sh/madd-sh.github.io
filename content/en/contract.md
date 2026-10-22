---
title: "A specification with checkable claims."
linkTitle: "Contract"
description: "JSON fragments, stable requirements and one check registry. Separate what is valid, what is bound and what has delivery evidence."
weight: 2
eyebrow: "INTENT / CONTRACT / EVIDENCE"
status: "Method · CLI 0.2.0 / contract format 0.2.0 stable"
---

## Two versions, explicit compatibility

**CLI 0.2.0** ships the stable **contract format 0.2.0** through `init --contract-only`. Optional agent adapters retain the legacy contract and its permissive schema; they do not certify completeness or delivery. Existing contracts are never silently migrated. The RC schema identity remains accepted; the stable schema has an immutable versioned URL.

[Legacy schema](schemas/legacy-0.1.3/contract.schema.json) · [Stable schema](schemas/0.2.0/contract.schema.json) · [Synthetic example](examples/contract-0.2.0.json)

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

## Start with a contract

These commands pin the stable **0.2.0** CLI:

```sh
mkdir -p /tmp/my-madd-change
npx --yes @madd-sh/madd@0.2.0 init --contract-only /tmp/my-madd-change
npx --yes @madd-sh/madd@0.2.0 validate /tmp/my-madd-change --json
```

Replace the starter requirement, task and check with your own. A planned check is deliberately unbound. Set `binding` to `bound` and `ref` to a relative, existing check file; use `--require-bound` to make that a gate. Add a fraction before using `--fraction FRAC-001`.

## Safe input boundaries

Validation loads only the bundled schema. It refuses duplicate JSON properties or sections, unsupported versions, broken IDs, cycles, path escapes, nested symlinks and oversized input. It does not download schemas or run commands found in a specification. [Read the format and evidence policy](https://github.com/madd-sh/madd/blob/v0.2.0/docs/contracts.md).
