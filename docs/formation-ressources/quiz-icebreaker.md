---
id: quiz-icebreaker
titre: "Quiz icebreaker — Déconstruire les idées reçues"
type: quiz
moment: "debut-journee"
duree: 10
profils: [all]
objectif: "Créer l'engagement immédiat. Déconstruire les intuitions erronées sur l'empreinte numérique."
instructions_formateur: "Lancer le quiz sur la plateforme avant même les présentations. Les résultats surprenants créent le contexte pour la journée. Ne pas révéler les réponses avant que tout le monde ait répondu."
scoring: false
affichage_resultats: "apres_chaque_question"
---

# Quiz icebreaker

## Questions

```yaml
questions:
  - id: "icebreaker-q1"
    ordre: 1
    enonce: "Quelle part de l'empreinte carbone d'un smartphone vient de sa fabrication (et non de son usage quotidien) ?"
    type: "choix_unique"
    options:
      - id: "a"
        texte: "Environ 20%"
        correct: false
      - id: "b"
        texte: "Environ 50%"
        correct: false
      - id: "c"
        texte: "Environ 80%"
        correct: true
      - id: "d"
        texte: "Environ 95%"
        correct: false
    explication: "La fabrication d'un smartphone émet environ 70 kgCO₂e, contre 1,5 kgCO₂e par an d'usage. Le levier principal n'est donc pas d'éteindre son téléphone le soir — c'est de le garder plus longtemps."
    source: "ADEME — Évaluation de l'impact environnemental du numérique en France, 2022"
    effet_surprise: "Très élevé — la plupart des participants pensent que l'usage domine"

  - id: "icebreaker-q2"
    ordre: 2
    enonce: "Pendant 1 heure de streaming vidéo HD, quel équipement consomme le plus d'énergie ?"
    type: "choix_unique"
    options:
      - id: "a"
        texte: "Les datacenters qui hébergent la vidéo"
        correct: false
      - id: "b"
        texte: "Les réseaux (fibre, 4G, WiFi)"
        correct: false
      - id: "c"
        texte: "L'écran ou l'appareil de l'utilisateur (TV, ordinateur, smartphone)"
        correct: true
    explication: "Contre-intuitif : l'écran de l'utilisateur consomme bien plus que les datacenters et les réseaux réunis. Une TV 55 pouces consomme 100-150W en continu. Les datacenters sont optimisés et mutualisés entre des millions d'utilisateurs."
    source: "The Shift Project — Lean ICT, 2019 / Carbon Trust"
    effet_surprise: "Très élevé — la quasi-totalité des participants répond datacenter ou réseau"

  - id: "icebreaker-q3"
    ordre: 3
    enonce: "Le numérique représente environ quelle part des émissions mondiales de gaz à effet de serre ?"
    type: "choix_unique"
    options:
      - id: "a"
        texte: "Moins de 1%"
        correct: false
      - id: "b"
        texte: "Environ 4%"
        correct: true
      - id: "c"
        texte: "Environ 10%"
        correct: false
      - id: "d"
        texte: "Environ 20%"
        correct: false
    explication: "Le numérique représente environ 4% des émissions mondiales de GES, soit autant que l'aviation civile. Et ce chiffre croît de 8% par an si rien ne change — il pourrait atteindre 8% d'ici 2025."
    source: "GreenIT.fr — Empreinte environnementale du numérique mondial, 2023"
    effet_surprise: "Moyen — les estimations vont de 1% à 20% dans le public"

  - id: "icebreaker-q4"
    ordre: 4
    enonce: "Combien de critères contient le RGESN version 2024 ?"
    type: "choix_unique"
    options:
      - id: "a"
        texte: "115 critères"
        correct: false
      - id: "b"
        texte: "79 critères"
        correct: false
        note: "C'était la v1 2022"
      - id: "c"
        texte: "78 critères"
        correct: true
      - id: "d"
        texte: "516 critères"
        correct: false
        note: "C'est le GR491"
    explication: "Le RGESN 2024 contient 78 critères répartis en 9 thématiques (la v1 2022 en avait 79). La nouveauté de 2024 est l'ajout d'une 9ème thématique : Algorithmie / IA."
    source: "Arcep — RGESN version 2024"
    effet_surprise: "Faible — question de culture générale RGESN"

  - id: "icebreaker-q5"
    ordre: 5
    enonce: "Un email professionnel sans pièce jointe, envoyé à 10 destinataires, émet environ combien de grammes de CO₂ équivalent ?"
    type: "choix_unique"
    options:
      - id: "a"
        texte: "0,1 gCO₂e — c'est négligeable"
        correct: false
      - id: "b"
        texte: "4 gCO₂e — soit environ 20 mètres en voiture thermique"
        correct: true
      - id: "c"
        texte: "40 gCO₂e — soit 200 mètres en voiture"
        correct: false
      - id: "d"
        texte: "400 gCO₂e — soit 2 km en voiture"
        correct: false
    explication: "Un email sans pièce jointe à 10 destinataires émet environ 4 gCO₂e. C'est faible unitairement — mais un salarié envoie en moyenne 33 emails par jour. Sur 200 jours de travail et 1000 salariés, ça représente plus de 26 tCO₂e par an, uniquement pour les emails."
    source: "ADEME — La face cachée du numérique"
    effet_surprise: "Élevé — les participants pensent souvent que c'est soit négligeable, soit énorme"
```
