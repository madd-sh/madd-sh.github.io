---
title: "Une boucle de livraison observable."
linkTitle: "Méthode"
description: "Transformer une intention en changement relisible, puis décrire le résultat. Une boucle assez courte pour servir au quotidien."
weight: 1
eyebrow: "INTENTION / CONTRAT / PREUVES"
status: "Méthode · 0.1.3 publiée / 0.2.0 candidate"
---

## 1. Poser l’intention {#intention}

Décrivez le problème, le responsable, le résultat attendu et le hors périmètre. Tranchez les décisions produit avant de les convertir en tâches techniques. Les inconnues restent explicites.

## 2. Spécifier un comportement observable {#contract}

Donnez un identifiant stable et des critères d’acceptation à chaque exigence. Ajoutez des scénarios Given / When / Then lorsque les préconditions comptent. Reliez l’exigence à un contrôle du registre existant. Le contrat décrit les contrôles ; il n’autorise aucune exécution arbitraire de commandes.

## 3. Livrer une fraction {#fractions}

Regroupez les tâches liées et leurs exigences. Précisez les fichiers ou interfaces concernés, les dépendances, le retour arrière et l’étendue de l’impact attendu. Implémentez ce périmètre. Les fractions futures restent en attente.

## 4. Exécuter, puis faire examiner {#workflow}

Lancez les vrais contrôles de construction et d’acceptation. Conservez les échecs, les contrôles ignorés et ceux qui manquent. Un relecteur qui n’a pas implémenté le changement suit le diff et ses chemins d’échec. Un agent peut aider ; un autre nom de rôle ne suffit pas à établir son indépendance.

## 5. Décrire la réalité {#retrospec}

La rétrospective contient la révision candidate, l’empreinte de la spécification, les contrôles exécutés, le verdict de revue, les limites et les suites. Distinguez observations locales, preuves de CI et version publiée. Cette rétrospective nourrit le contrat suivant.

## Une petite équipe suffit

| Responsabilité | Petite équipe | Workflow agent optionnel |
|---|---|---|
| Architect | Responsable produit + développeur | Précise les exigences |
| Maker | Développeur | Implémente une fraction |
| CI | Pipeline existant | Interprète les résultats |
| Breaker | Relecteur indépendant | Examine le diff sans le modifier |
| Witness | Relecteur ou mainteneur | Décrit les résultats observés |
| Conductor | Mainteneur | Organise le périmètre et les relais |

La revue peut demander des corrections. Un contrôle obligatoire échoué ou ignoré laisse la fraction incomplète. Un champ de statut ne peut annuler ces résultats.

## Préparer le passage en exploitation {#operations}

Identifiez le responsable, les signaux utiles et les procédures de retour arrière et de reprise. Testez celles qui font partie de l’acceptation. L’exploitation entre dans le contrat lorsqu’elle détermine le comportement livré.
