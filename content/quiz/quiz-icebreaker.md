---
id: quiz-icebreaker
type: quiz
total_questions: 5
seuil_succes: 3
moment: debut_journee
objectif: Déconstruire les idées reçues sur l'empreinte numérique en 10 minutes
---

# Quiz Icebreaker — Green IT

## Structure attendue pour chaque question

```
question: [texte de la question]
options: [4 choix]
correct_index: [0-3]
explication: [source + contexte]
```

## Questions (à compléter / enrichir)

### Q1 — Part de la fabrication dans l'empreinte d'un smartphone
- Réponse : 80%
- Source : ADEME 2022
- [CONTENU À ENRICHIR : ajouter des exemples concrets comparatifs]

### Q2 — Équipement le plus consommateur pendant 1h de streaming
- Réponse : L'écran utilisateur
- Source : The Shift Project
- [CONTENU À ENRICHIR : ajouter les chiffres en Wh par équipement]

### Q3 — % des émissions mondiales GES du numérique
- Réponse : ~4%
- Source : GreenIT.fr 2023
- [CONTENU À ENRICHIR : comparaison avec aviation, voiture]

### Q4 — Nombre de critères RGESN 2024
- Réponse : 78
- Source : Arcep
- [CONTENU À ENRICHIR : mentionner les 9 thématiques]

### Q5 — Email sans PJ à 10 personnes en gCO₂e
- Réponse : ~4 gCO₂e
- Source : ADEME
- [CONTENU À ENRICHIR : comparaison avec email 1Mo pièce jointe = 19 gCO₂e]

## Notes pour l'agent AI
Ce fichier sert à régénérer `apps/backend/src/quiz/quiz.service.ts` section quizId 'icebreaker'.
Champ `explication` = texte pédagogique affiché après réponse.
Limiter à 150 mots max par explication.
