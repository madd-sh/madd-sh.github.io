---
title: "Des connaissances avec un responsable."
linkTitle: "Skills"
description: "Un skill rassemble un savoir utile et sa vérification. Ajoutez-le pour un besoin réel, sans multiplier les couches d’instructions."
weight: 7
eyebrow: "INTENTION / CONTRAT / PREUVES"
status: "Méthode · 0.1.3 publiée / 0.2.0 candidate"
---

## Combler un manque précis {#gap}

Nommez ce dont la tâche a besoin et que les instructions du dépôt n’expliquent pas déjà. Citez des sources maintenues et vérifiez les versions concernées. Un skill reste utile tant que ses indications sont exactes.

## Ce qu’apporte un skill {#anatomy}

Un skill décrit son contexte d’emploi, ses sources, les étapes utiles et la façon de contrôler le résultat. Versionnez ses exemples et nommez son responsable. Examinez ses scripts exécutables avec autant de soin que le code de production.

## Garder des instructions compréhensibles {#custom}

Partez des instructions canoniques du dépôt. Un skill ajoute des connaissances ciblées ; il ne redéfinit pas l’autorité de déploiement et ne duplique pas silencieusement les règles du projet. Les adaptateurs clients peuvent exposer un savoir portable sans entretenir plusieurs versions contradictoires.

## Transformer l’apprentissage en contrôle durable {#lifecycle}

Lorsqu’une revue révèle une erreur répétée, préférez un type, test, lint ou contrôle CI existant qui l’empêche. Réservez le skill au jugement qui ne se réduit pas à une vérification déterministe. Consignez les reports, leur raison et la condition de reprise.

## Un outil optionnel {#types}

Une équipe peut écrire un contrat MADD et exécuter ses contrôles sans installer de skills agents. La collection d’adaptateurs reste disponible pour les équipes qui en ont besoin. Cette refonte ne réorganise pas les bibliothèques de skills des clients.

## Adapter le savoir au domaine {#domain-skills}

Ajoutez des indications métier ou techniques lorsque le travail les exige : menaces sur une API, contraintes de migration de données ou contrôles d’accessibilité. Incluez un exemple concret et le contrôle qui en montre les limites.

## Expliciter les passages de relais {#transitions}

Transmettez l’intention, les décisions, les fichiers modifiés et les résultats réels des contrôles. Le relecteur doit pouvoir les contester indépendamment ; des instructions ne transforment pas le récit de l’auteur en approbation.
