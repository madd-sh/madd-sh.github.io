---
title: "Make intent verifiable."
linkTitle: "Start"
description: "A clear contract. A small change. Evidence you can inspect. MADD helps humans and agents agree on what should happen, then check what actually shipped."
weight: 0
eyebrow: "INTENT / CONTRACT / EVIDENCE"
status: "Method · 0.1.3 released / 0.2.0 candidate"
---

## An experiment with a receipt

> 🤪 Think boldly. Ship something you can explain.

MADD means **Multi-Agent Driven Development**. Start with one developer, one independent reviewer and your existing CI. Add agent roles when they help the work.

[Try one small change](examples.html) · [Read the contract](contract.html)

```text
intent       → one observable outcome
contract     → requirement + acceptance check
fraction     → one reviewable change
checks       → actual execution results
review       → an independent challenge
retro        → what shipped, and what did not
```

## Less guessing, more shared intent {#problem}

A long prompt is a poor handover. Put the outcome, limits and acceptance criteria in versioned files. Developers, reviewers and agents can read the same specification. CI checks the parts that can be automated; people own the decisions and unresolved risks.

## Six responsibilities, as many people as you need {#agents}

Architect clarifies intent. Maker implements. CI executes checks. Breaker challenges the change independently. Witness records observed behavior. Conductor keeps the scope and handoffs clear. These are responsibilities, not a requirement to run six AI processes.

## Small fractions, explicit limits {#principles}

A fraction is a small delivery scope with named requirements and checks. A green test does not prove every property of a system. A review is not a guarantee of zero defects. MADD makes those boundaries visible so the next person can continue safely.

## Start with what is available {#quickstart}

The published **0.1.3** CLI installs optional agent workflows. Its `doctor` command checks installation health.

```sh
npx @madd-sh/madd@0.1.3 init
```

The **0.2.0 candidate** adds contract-only initialization, structural validation and evidence verification. It is being exercised on this relaunch and is not yet an npm release. [Use the candidate from source](contract.html#try-the-candidate).

## Keep your tools {#domains}

Use the repository, language, CI and review tools your team already understands. Adopt the contract first. [Explore integrations](integrations.html), [inspect evidence](evidence.html), or [read without a browser](agents.html).

## Compare observed results {#comparison}

Use your own baseline, scope and checks to judge whether the method helps. [Our evidence policy](evidence.html#no-invented-benchmarks) explains what a reproducible comparison needs.
