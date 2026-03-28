---
id: quiz-mi-journee
titre: "Quiz mi-journée — Consolidation tronc commun"
type: quiz
moment: "mi-journee"
duree: 15
profils: [all]
objectif: "Consolider les acquis du tronc commun avant le déjeuner. Identifier les points à revoir en formateur."
instructions_formateur: "Correction collective après chaque question. Si plus de 30% de mauvaises réponses sur une question, prendre 2 minutes pour ré-expliquer avant de passer à la suivante."
scoring: true
score_affiche: true
affichage_resultats: "apres_chaque_question"
---

# Quiz mi-journée

## Questions

```yaml
questions:
  - id: "midday-q1"
    ordre: 1
    enonce: "Classez ces 3 postes d'émission du numérique du plus impactant au moins impactant."
    type: "classement"
    items_a_classer:
      - id: "a"
        texte: "Datacenters"
        rang_correct: 3
      - id: "b"
        texte: "Terminaux utilisateurs (smartphones, PC, écrans)"
        rang_correct: 1
      - id: "c"
        texte: "Réseaux (fibre, 4G, routeurs)"
        rang_correct: 2
    explication: "Terminaux (70%) > Réseaux (20%) > Datacenters (10%). Les terminaux dominent parce que leur fabrication est très intensive en ressources, et il y en a des dizaines de milliards dans le monde."
    source: "GreenIT.fr 2023"

  - id: "midday-q2"
    ordre: 2
    enonce: "Un consultant de votre ESN utilise un laptop fourni par l'entreprise pour travailler chez un client. La fabrication de ce laptop appartient à quel scope GHG ?"
    type: "choix_unique"
    options:
      - id: "a"
        texte: "Scope 1 — émissions directes de l'ESN"
        correct: false
      - id: "b"
        texte: "Scope 2 — électricité achetée"
        correct: false
      - id: "c"
        texte: "Scope 3 — autres émissions indirectes"
        correct: true
    explication: "La fabrication des équipements est toujours en scope 3 (émissions indirectes liées à la chaîne de valeur amont). L'électricité consommée pour recharger le laptop serait en scope 2, mais la fabrication elle-même est en scope 3."
    source: "GHG Protocol — Corporate Standard"

  - id: "midday-q3"
    ordre: 3
    enonce: "Combien de thématiques contient le RGESN version 2024 ?"
    type: "choix_unique"
    options:
      - id: "a"
        texte: "6 thématiques"
        correct: false
      - id: "b"
        texte: "8 thématiques"
        correct: false
        note: "C'était la version 2022"
      - id: "c"
        texte: "9 thématiques"
        correct: true
      - id: "d"
        texte: "12 thématiques"
        correct: false
    explication: "Le RGESN 2024 compte 9 thématiques : Stratégie, Spécification, Architecture, UX/Interface, Contenus, Frontend, Backend, Hébergement, et Algorithmie/IA (ajoutée en 2024)."
    source: "Arcep — RGESN 2024"

  - id: "midday-q4"
    ordre: 4
    enonce: "Quelle est la principale nouveauté du RGESN version 2024 par rapport à la version 2022 ?"
    type: "choix_unique"
    options:
      - id: "a"
        texte: "L'ajout de critères sur la sécurité"
        correct: false
      - id: "b"
        texte: "L'ajout d'une thématique Algorithmie / Intelligence Artificielle"
        correct: true
      - id: "c"
        texte: "La suppression de la thématique Hébergement"
        correct: false
      - id: "d"
        texte: "Le passage de 78 à 115 critères"
        correct: false
    explication: "La v2024 ajoute une 9ème thématique dédiée à l'Algorithmie et à l'IA, avec des critères sur le choix des modèles, la frugalité de l'inférence et l'évaluation de l'empreinte d'entraînement. Le nombre total de critères passe de 79 (v1) à 78 (v2) — un critère a été fusionné."
    source: "Arcep — RGESN 2024"

  - id: "midday-q5"
    ordre: 5
    enonce: "Quelle loi française crée une obligation de publication d'une déclaration d'écoconception pour les services numériques publics ?"
    type: "choix_unique"
    options:
      - id: "a"
        texte: "La loi Pacte"
        correct: false
      - id: "b"
        texte: "La loi REEN (Réduction de l'Empreinte Environnementale du Numérique)"
        correct: true
      - id: "c"
        texte: "La directive CSRD"
        correct: false
        note: "La CSRD est une directive européenne sur le reporting ESG, pas sur l'écoconception des services"
      - id: "d"
        texte: "La loi Climat et Résilience"
        correct: false
    explication: "La loi REEN, promulguée en novembre 2021, impose progressivement aux opérateurs de communications électroniques et aux services publics numériques de publier une déclaration d'écoconception. Le RGESN est le référentiel technique qui sert de base à cette déclaration."
    source: "Loi n° 2021-1485 du 15 novembre 2021"
```
