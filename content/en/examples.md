---
title: "Start with one observable change."
linkTitle: "Walkthrough"
description: "A worked exercise for a developer, a reviewer and CI. This is a synthetic example, not a productivity benchmark."
weight: 3
eyebrow: "INTENT / CONTRACT / EVIDENCE"
status: "Method · 0.1.3 released / 0.2.0 candidate"
---

## The intention

A reader should be able to find the contract documentation using the keyboard without losing ordinary navigation. The site relaunch is the pilot; this exercise narrows it to one behavior.

## The requirement

**REQ-F-001 — Open and close documentation search.**

- Given focus is outside an editable field, when the reader presses Ctrl/Cmd+K, then a labeled search dialog opens and focuses its input.
- Given the dialog is open, when the reader presses Escape, then it closes and restores focus to the opener.
- Given JavaScript is disabled, when the reader follows the visible navigation, then the documentation remains reachable.

The acceptance target is a browser test of focus and navigation. A test file binding is only a reference until the test has actually executed.

## Make the failure visible

Run the acceptance check before the implementation. Confirm that it fails for the missing behavior, rather than an unrelated setup error. Record the command and exit result. Implement the smallest accessible behavior, then run the same check again.

## Invite the challenge

The independent reviewer tries Escape with a populated query, Shift+Tab at the boundary, a text input, a mobile viewport and a page without JavaScript. Record concrete findings and add regression checks for fixes. The author cannot approve their own fraction.

## Record the observed result

Write the exact candidate revision, checks that ran, review findings and unresolved limitations. Browser automation does not replace a human screen-reader session. Local passing checks are not remote CI attestations or evidence of a deployed release.

[Read the delivery loop](concepts.html) · [See the evidence rules](evidence.html)
