---
title: "Keep the tools. Make the handoffs explicit."
linkTitle: "Integrations"
description: "MADD can start with humans and existing CI. Agent integrations are optional adapters around the same delivery responsibilities."
weight: 4
eyebrow: "INTENT / CONTRACT / EVIDENCE"
status: "Method · 0.1.3 released / 0.2.0 candidate"
---

## Human + reviewer + CI

Keep specifications beside code. Use normal branches, pull requests and acceptance tests. A developer implements a fraction, an independent person reviews it and the pipeline executes checks. No MADD daemon, database, hosted API or agent subscription is required for this workflow.

## Optional agent adapters

The published 0.1.3 installer includes adapters for Claude Code, Codex, Mistral Vibe, OpenCode and Docker cagent. They install agent instructions, skills, hooks and a legacy contract. Inspect their changes before installing them into a project with existing rules.

```sh
npx @madd-sh/madd@0.1.3 init --dry-run
```

Their scaffolding and legacy contract fixtures are regression-tested in the candidate CLI. That test does not prove every third-party agent runtime behaves identically. Runtime support depends on each adapter and the version of its client.

## Adopt the new contract deliberately

The 0.2.0 candidate offers `init --contract-only`. It creates specification files without hooks or agent instructions. Existing adapter installs remain on the legacy representation until their migration is reviewed. Contract-only initialization refuses to overwrite an existing `.madd` directory.

## CI remains the execution authority

Validation and binding can run offline. Delivery verification additionally requires evidence from CI and an independent reviewer trusted outside the candidate checkout. Do not put signing credentials in contract files or give them to untrusted pull-request jobs.

[Read the trust model](evidence.html) · [Review reusable knowledge](skills.html)
