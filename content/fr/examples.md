---
title: "Commencer par un résultat observable."
linkTitle: "Exercice"
description: "Un exercice pour un développeur, un relecteur et la CI. Un exemple synthétique, pas une mesure de productivité."
weight: 3
eyebrow: "INTENTION / CONTRAT / PREUVES"
status: "Méthode · 0.1.3 publiée / 0.2.0 candidate"
---

## L’intention

Un lecteur doit pouvoir retrouver la documentation du contrat au clavier sans perdre la navigation habituelle. La refonte du site sert de pilote ; cet exercice en isole un comportement.

## L’exigence

**REQ-F-001 — Ouvrir et fermer la recherche documentaire.**

- Étant donné un focus hors d’un champ de saisie, lorsque le lecteur presse Ctrl/Cmd+K, une fenêtre de recherche nommée s’ouvre et place le focus dans son champ.
- Étant donné cette fenêtre ouverte, lorsque le lecteur presse Échap, elle se ferme et rend le focus au déclencheur.
- Étant donné JavaScript désactivé, lorsque le lecteur suit les liens visibles, la documentation reste accessible.

Le contrôle d’acceptation est un test navigateur du focus et de la navigation. Le lien vers un fichier de test reste une référence jusqu’à son exécution réelle.

## Rendre l’échec observable

Exécutez le contrôle avant l’implémentation. Vérifiez qu’il échoue pour le comportement manquant, et non pour une erreur d’environnement. Notez la commande et son résultat. Implémentez le comportement accessible le plus simple, puis relancez le même contrôle.

## Inviter la contradiction

Le relecteur indépendant essaie Échap après saisie, Maj+Tab à la limite, un champ éditable, un écran mobile et une page sans JavaScript. Conservez les constats et ajoutez les régressions utiles. L’auteur ne peut pas approuver sa propre fraction.

## Décrire le résultat observé

Notez la révision exacte, les contrôles exécutés, les constats de revue et les limites. L’automatisation navigateur ne remplace pas un essai humain avec lecteur d’écran. Des tests locaux verts ne constituent ni une attestation de CI distante ni une preuve de déploiement.

[Lire la méthode](concepts.html) · [Comprendre les preuves](evidence.html)
