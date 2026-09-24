---
title: "Show the evidence. Keep the limits."
linkTitle: "Evidence"
description: "A status is a claim. Evidence must identify the revision, scope, checks and independent authority behind it."
weight: 5
eyebrow: "INTENT / CONTRACT / EVIDENCE"
status: "Method · 0.1.3 released / 0.2.0 candidate"
---

## What belongs in a delivery record

- Format version and specification digest.
- Repository and exact candidate revision.
- Selected fraction, requirement IDs and check IDs.
- Actual execution outcome and check target; skipped is not passed.
- CI run reference and an independent review covering that candidate.
- Known limitations, failed attempts and rollback information.

## The candidate verification gate

The 0.2.0 CLI candidate verifies Ed25519-signed CI and review receipts against an explicitly trusted policy outside the candidate tree. It requires separate identities and keys, refuses review by a declared author, and requires a clean tracked revision. A contract cannot nominate its own trust authority.

The protected pipeline and maintainers are responsible for the policy, authors, signing-key custody and truthful execution/review records. Cryptographic verification proves that trusted keys signed the claims; it cannot prove that a reviewer was diligent or that an incomplete test suite found every bug. Missing authority setup fails closed.

## What this relaunch can demonstrate

The relaunch exercises contract validation, negative security cases, site builds and browser checks. Candidate results are recorded in the source repository with exact commands and limitations. They are not advertised as a published release or authenticated production evidence before those steps happen.

## No invented benchmarks

Earlier content claimed universal zero drift and compared a two-day implementation with a twelve-month estimate. Those claims lacked a reproducible public dataset and have been removed. A useful case study publishes scope, baseline, versions, results, review and limitations, including failures.

## Release and rollback

The website remains static Hugo on GitHub Pages. Pull-request checks build and test without publishing. Publication uses the existing reviewed main-branch workflow. Keep the prior successful Pages artifact and commit available; redeploy that revision if navigation or public resources regress.
