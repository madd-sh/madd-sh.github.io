---
title: "Montrer les preuves. Garder les limites."
linkTitle: "Preuves"
description: "Un statut est une affirmation. Une preuve identifie la révision, le périmètre, les contrôles et l’autorité indépendante qui la porte."
weight: 5
eyebrow: "INTENTION / CONTRAT / PREUVES"
status: "Méthode · 0.1.3 publiée / 0.2.0 candidate"
---

## Le contenu d’une preuve de livraison

- Version du format et empreinte de la spécification.
- Dépôt et révision candidate exacte.
- Fraction, exigences et contrôles sélectionnés.
- Résultat réel d’exécution et cible contrôlée ; ignoré ne signifie pas réussi.
- Référence de CI et revue indépendante de cette candidate.
- Limites connues, tentatives échouées et retour arrière.

## Le contrôle de la candidate

La CLI candidate 0.2.0 vérifie des reçus de CI et de revue signés en Ed25519 selon une politique explicitement approuvée, extérieure au code candidat. Elle impose des identités et clés distinctes, refuse la revue par un auteur déclaré et exige une révision propre et suivie par Git. Le contrat ne désigne pas sa propre autorité de confiance.

Le pipeline protégé et les mainteneurs portent la politique, la liste des auteurs, la garde des clés et la sincérité des résultats. La cryptographie prouve que des clés approuvées ont signé des affirmations ; elle ne prouve ni la diligence d’un relecteur ni l’exhaustivité des tests. Sans autorité configurée, la vérification refuse la livraison.

## Ce que cette refonte peut démontrer

La refonte éprouve validation des contrats, cas de sécurité négatifs, construction du site et contrôles navigateur. Les résultats candidats sont consignés dans les sources avec commandes et limites. La RC est publiée sous le tag npm `next` ; ces résultats locaux ne constituent toujours pas des preuves authentifiées de livraison en production.

## Aucune mesure inventée

L’ancien contenu promettait une absence universelle de dérive et comparait deux jours de développement à douze mois estimés. Ces affirmations sans jeu de données public reproductible ont été retirées. Une étude utile publie périmètre, référence initiale, versions, résultats, revue et limites, y compris les échecs.

## Publication et retour arrière

Le site reste statique, construit par Hugo sur GitHub Pages. Les contrôles de pull request construisent et testent sans publier. La publication utilise le workflow existant sur la branche principale après revue. Gardez la dernière construction Pages valide et sa révision ; redéployez-la en cas de régression.
