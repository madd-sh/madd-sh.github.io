---
title: "A delivery loop you can inspect."
linkTitle: "Method"
description: "Turn an intention into a reviewable change and record the result. Keep the loop short enough to use every day."
weight: 1
eyebrow: "INTENT / CONTRACT / EVIDENCE"
status: "Method · 0.1.3 released / 0.2.0 candidate"
aliases: ["/manifesto.html"]
---

## 1. State the intention {#intention}

Write the problem, owner, desired outcome and things this change will not do. Resolve product decisions before turning them into implementation tasks. Unknowns stay explicit.

## 2. Specify observable behavior {#contract}

Give each requirement a stable ID and acceptance criteria. Add Given / When / Then scenarios where the preconditions matter. Bind the requirement to a check in the existing test registry. The contract describes checks; it never grants permission to execute arbitrary shell text.

## 3. Deliver one fraction {#fractions}

Group related tasks and their requirements. Define the files or interfaces that may change, the dependencies, the rollback and the expected blast radius. Implement only that scope. Future fractions remain pending.

## 4. Execute checks, then challenge {#workflow}

Run the actual build and acceptance targets. Keep failures, skips and missing checks visible. A reviewer who did not implement the change traces the diff and its failure paths. An agent can assist the review; assigning a different role name alone does not establish independence.

## 5. Record reality {#retrospec}

Write a retrospective with the candidate revision, specification digest, executed checks, review outcome, known limits and follow-up work. Distinguish local observations from CI evidence and a published release. Use the retrospective as input to the next contract.

## A lightweight team

| Responsibility | Small team | Optional agent workflow |
|---|---|---|
| Architect | Product owner + developer | Clarifies requirements |
| Maker | Developer | Implements a bounded fraction |
| CI | Existing pipeline | Interprets execution results |
| Breaker | Independent reviewer | Challenges the diff read-only |
| Witness | Reviewer or maintainer | Records observed outcomes |
| Conductor | Maintainer | Coordinates scope and handoffs |

An independent review can request changes. A failed or skipped required check keeps the fraction incomplete. A status field cannot override either result.

## Keep the operational handover {#operations}

Name the owner, useful signals, rollback and recovery steps for the change. Test the procedures that matter to its acceptance. Operations belongs in the contract when it affects the delivered behavior.
