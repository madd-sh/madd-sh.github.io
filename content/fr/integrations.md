---
title: "Garder les outils. Clarifier les relais."
linkTitle: "Intégrations"
description: "MADD peut commencer avec des humains et la CI existante. Les intégrations agents sont des adaptateurs optionnels autour des mêmes responsabilités."
weight: 4
eyebrow: "INTENTION / CONTRAT / PREUVES"
status: "Méthode · 0.1.3 publiée / 0.2.0 candidate"
---

## Développeur + relecteur + CI

Conservez les spécifications près du code. Utilisez branches, pull requests et tests d’acceptation habituels. Le développeur implémente une fraction, une autre personne la relit et le pipeline exécute les contrôles. Aucun daemon MADD, base de données, service hébergé ou abonnement agent n’est nécessaire.

## Des adaptateurs agents optionnels

L’installeur publié 0.1.3 comprend des adaptateurs Claude Code, Codex, Mistral Vibe, OpenCode et Docker cagent. Ils installent instructions, skills, hooks et contrat historique. Examinez les changements avant installation dans un projet ayant ses propres règles.

```sh
npx @madd-sh/madd@0.1.3 init --dry-run
```

Leur installation et leurs contrats historiques disposent de tests de régression dans la CLI candidate. Cela ne prouve pas que tous les clients tiers se comportent de façon identique. Leur prise en charge dépend de l’adaptateur et de la version du client.

## Adopter le nouveau contrat explicitement

La candidate 0.2.0 propose `init --contract-only`. Elle crée les spécifications sans hook ni instruction agent. Les installations existantes gardent leur représentation historique jusqu’à une migration revue. Le mode contrat seul refuse d’écraser un répertoire `.madd` existant.

## La CI reste responsable de l’exécution

La validation et le raccordement aux tests fonctionnent hors ligne. La vérification de livraison exige aussi des preuves de CI et de revue indépendante, avec une confiance définie hors du code candidat. Ne placez aucune clé de signature dans un contrat et ne l’exposez pas à un job de pull request non fiable.

[Lire le modèle de confiance](evidence.html) · [Partager des connaissances utiles](skills.html)
