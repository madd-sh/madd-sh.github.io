---
title: "Knowledge with an owner and a check."
linkTitle: "Skills"
description: "A skill packages useful working knowledge. Add one when it improves a real task; avoid another instruction layer for its own sake."
weight: 7
eyebrow: "INTENT / CONTRACT / EVIDENCE"
status: "Method · 0.1.3 released / 0.2.0 candidate"
---

## Close a specific knowledge gap {#gap}

Name what the task needs that the repository instructions do not already explain. Point to maintained sources and verify the relevant versions. A skill is useful only while its guidance remains accurate.

## What a skill contributes {#anatomy}

A skill describes when knowledge applies, which sources it uses, the steps that matter and how to check the result. Version its examples and name its owner. Review executable scripts with the same care as production code.

## Keep instructions understandable {#custom}

Use the repository's canonical instructions first. A skill should add scoped knowledge, not redefine deployment authority or silently duplicate project policy. Agent-specific adapters can expose portable knowledge without maintaining several conflicting versions.

## Connect learning to a durable control {#lifecycle}

When a review finds a repeated mistake, prefer a type, test, lint rule or existing CI gate that prevents it. Use a skill for judgment that cannot be reduced to a deterministic check. Record deferred changes with a reason and a condition for revisiting them.

## Optional, not a prerequisite {#types}

A team can write a MADD contract and run acceptance checks without installing agent skills. The existing adapter collection remains available for teams that need it. This relaunch does not reorganize downstream customers' skill libraries.

## Specialize for the actual domain {#domain-skills}

Use domain guidance when the work needs it: an API threat model, database migration constraints or accessibility checks. Include a concrete example and the check that demonstrates its limits.

## Make role transitions explicit {#transitions}

Hand over the intention, decisions, changed files and actual check outcomes. A receiving reviewer must be able to challenge those outcomes independently; instructions do not turn the author’s account into approval.
