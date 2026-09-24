---
title: "Une spécification vérifiable."
linkTitle: "Contrat"
description: "Des fragments JSON, des exigences stables et un registre unique de contrôles. Distinguer validité, raccordement aux tests et preuves de livraison."
weight: 2
eyebrow: "INTENTION / CONTRAT / PREUVES"
status: "Méthode · 0.1.3 publiée / 0.2.0 candidate"
---

## Deux versions, une compatibilité explicite

La CLI publiée **0.1.3** installe le contrat historique et des adaptateurs agents optionnels. Son schéma permissif ne certifie ni complétude ni livraison. Le **format candidat 0.2.0** est optionnel et ne réécrit pas les anciens contrats.

[Schéma historique](/schemas/legacy-0.1.3/contract.schema.json) · [Schéma candidat](/schemas/draft/0.2.0/contract.schema.json) · [Exemple synthétique](/examples/contract-0.2.0.json)

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

## Essayer la candidate

Ces commandes nécessitent la **branche candidate**, pas le paquet publié 0.1.3 :

```sh
git clone --branch feat/madd-relaunch-contracts https://github.com/madd-sh/madd.git
cd madd
npm ci --ignore-scripts
mkdir /tmp/my-madd-change
node bin/madd.js init /tmp/my-madd-change --contract-only
node bin/madd.js validate /tmp/my-madd-change --json
```

Remplacez l’exigence, la tâche et le contrôle initiaux. Un contrôle planifié reste volontairement sans implémentation. Positionnez `binding` à `bound` et `ref` sur un fichier relatif existant ; `--require-bound` impose ce raccordement. Déclarez une fraction avant d’utiliser `--fraction FRAC-001`.

## Des entrées contrôlées

Le validateur charge uniquement le schéma fourni avec la CLI. Il refuse les doublons, versions inconnues, références cassées, cycles, sorties du répertoire, liens symboliques internes et entrées trop volumineuses. Il ne télécharge pas de schéma et n’exécute pas de commande contenue dans la spécification. [Lire le format et la politique de preuves](https://github.com/madd-sh/madd/blob/feat/madd-relaunch-contracts/docs/contracts.md).
