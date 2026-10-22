---
title: "Une spécification vérifiable."
linkTitle: "Contrat"
description: "Des fragments JSON, des exigences stables et un registre unique de contrôles. Distinguer validité, raccordement aux tests et preuves de livraison."
weight: 2
eyebrow: "INTENTION / CONTRAT / PREUVES"
status: "Méthode · CLI 0.2.0 / format de contrat 0.2.0 stable"
---

## Deux versions, une compatibilité explicite

La **CLI 0.2.0** fournit le **format de contrat 0.2.0 stable** via `init --contract-only`. Les adaptateurs agents optionnels gardent le contrat historique et son schéma permissif, qui ne certifie ni complétude ni livraison. Aucun contrat existant n’est migré silencieusement. L’identité du schéma RC reste acceptée ; le schéma stable possède une adresse versionnée immuable.

[Schéma historique](/schemas/legacy-0.1.3/contract.schema.json) · [Schéma stable](/schemas/0.2.0/contract.schema.json) · [Exemple synthétique](/examples/contract-0.2.0.json)

## Quatre fichiers pour commencer

```text
.madd/contract.d/
  00-meta.json         identité, responsable, version du format
  10-intention.json    contexte, objectifs, limites
  20-functional.json   exigences et acceptation
  40-tasks.json        tâches et contrôles
```

Les décisions techniques, les opérations, les fractions d’audit et la rétrospective s’ajoutent au besoin. L’initialisation du contrat seul fournit aussi le schéma local pour l’éditeur.

## Trois affirmations distinctes

| Affirmation | Signification | Ce qu’elle ne prouve pas |
|---|---|---|
| Structure valide | Types, sections, identifiants, références et graphe cohérents | Le code satisfait l’exigence |
| Contrôles raccordés | Les exigences sélectionnées désignent des fichiers locaux de contrôle | Ils ont été exécutés avec succès |
| Livraison vérifiée | Les preuves de CI et de revue indépendante portent sur la révision, la spécification et la fraction exactes | L’absence de tout défaut possible |

Écrire `done`, `passing` ou `verified` ne crée jamais une preuve. Un contrôle obligatoire ignoré, échoué, absent ou périmé ne peut valider une livraison.

## Commencer par un contrat

Ces commandes figent la CLI stable **0.2.0** :

```sh
mkdir -p /tmp/my-madd-change
npx --yes @madd-sh/madd@0.2.0 init --contract-only /tmp/my-madd-change
npx --yes @madd-sh/madd@0.2.0 validate /tmp/my-madd-change --json
```

Remplacez l’exigence, la tâche et le contrôle initiaux. Un contrôle planifié reste volontairement sans implémentation. Positionnez `binding` à `bound` et `ref` sur un fichier relatif existant ; `--require-bound` impose ce raccordement. Déclarez une fraction avant d’utiliser `--fraction FRAC-001`.

## Des entrées contrôlées

Le validateur charge uniquement le schéma fourni avec la CLI. Il refuse les doublons, versions inconnues, références cassées, cycles, sorties du répertoire, liens symboliques internes et entrées trop volumineuses. Il ne télécharge pas de schéma et n’exécute pas de commande contenue dans la spécification. [Lire le format et la politique de preuves](https://github.com/madd-sh/madd/blob/v0.2.0/docs/contracts.md).
