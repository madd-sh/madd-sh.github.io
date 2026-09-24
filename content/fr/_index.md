---
title: "Rendre l’intention vérifiable."
linkTitle: "Démarrer"
description: "Un contrat clair. Un petit changement. Des preuves consultables. MADD aide humains et agents à définir le résultat attendu, puis à vérifier ce qui a été livré."
weight: 0
eyebrow: "INTENTION / CONTRAT / PREUVES"
status: "Méthode · 0.1.3 publiée / 0.2.0-rc.1 publiée sous next"
---

## Un changement avec ses preuves

> Oser les idées. Livrer quelque chose que l’on peut expliquer.

MADD signifie **Multi-Agent Driven Development**. Commencez avec un développeur, un relecteur indépendant et votre CI existante. Ajoutez des rôles agents lorsque le travail en bénéficie.

[Essayer un petit changement](examples.html) · [Lire le contrat](contract.html)

```text
intention    → un résultat observable
contrat      → une exigence + un contrôle
fraction     → un changement relisible
contrôles    → les résultats réellement obtenus
revue        → une analyse indépendante
rétro        → ce qui est livré et ce qui ne l’est pas
```

## Commencer par le changement, pas par le prompt {#problem}

Un long prompt transmet mal un projet. Conservez un résultat observable, ses limites et son critère d’acceptation dans des fichiers versionnés. Le développeur l’implémente, la CI garde la trace de l’exécution et un relecteur indépendant vérifie que le résultat tient la promesse.

## Un changement, six relais {#agents}

Architect précise l’intention. Maker implémente. CI exécute les contrôles. Breaker examine le changement indépendamment. Witness décrit le résultat observé. Conductor organise le périmètre et les passages de relais. Ces responsabilités n’imposent pas six processus IA.

## De petites fractions, des limites explicites {#principles}

Une fraction est un petit périmètre de livraison avec des exigences et des contrôles identifiés. Un test vert ne prouve pas toutes les propriétés d’un système. Une revue ne garantit pas l’absence de défaut. MADD rend ces limites visibles pour faciliter la reprise du travail.

## Commencer avec l’existant {#quickstart}

La CLI publiée **0.1.3** installe des workflows agents optionnels. Sa commande `doctor` vérifie l’installation.

```sh
npx @madd-sh/madd@0.1.3 init
```

La **candidate 0.2.0-rc.1** ajoute l’initialisation du contrat seul, sa validation et la vérification des preuves. Elle est publiée sur npm sous le tag `next` : `npx @madd-sh/madd@next`. [Lire le parcours candidat](contract.html#essayer-la-candidate).

## Garder ses outils {#domains}

Gardez le dépôt, le langage, la CI et les outils de revue que votre équipe connaît. Adoptez d’abord le contrat. [Voir les intégrations](integrations.html), [examiner les preuves](evidence.html) ou [lire sans navigateur](agents.html).

## Comparer les résultats observés {#comparison}

Utilisez votre propre référence, votre périmètre et vos contrôles pour juger de l’utilité de la méthode. [Notre politique de preuves](evidence.html) précise ce qu’une comparaison reproductible doit contenir.
