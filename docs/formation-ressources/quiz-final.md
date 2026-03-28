---
id: quiz-final
titre: "Quiz final — Évaluation des acquis"
type: quiz
moment: "fin-journee"
duree: 20
profils: [all]
objectif: "Évaluer les acquis de la journée. Fournir un score individuel servant de base à l'attestation de formation."
instructions_formateur: "Ce quiz est noté. Laisser les participants répondre individuellement sans aide. Correction collective à la fin. Partager les scores avec chaque participant via la plateforme."
scoring: true
score_affiche: true
seuil_reussite: 6
score_max: 10
attestation: true
affichage_resultats: "apres_correction_collective"
---

# Quiz final — Évaluation des acquis

## Questions

```yaml
questions:
  - id: "final-q1"
    ordre: 1
    module_source: "module-01"
    enonce: "Quel pourcentage de l'empreinte carbone d'un smartphone est dû à sa fabrication ?"
    type: "choix_unique"
    options:
      - id: "a"
        texte: "20%"
        correct: false
      - id: "b"
        texte: "50%"
        correct: false
      - id: "c"
        texte: "80%"
        correct: true
      - id: "d"
        texte: "100%"
        correct: false
    explication: "80% de l'empreinte d'un smartphone vient de sa fabrication. C'est pourquoi allonger la durée de vie des équipements est le levier environnemental n°1."
    points: 1

  - id: "final-q2"
    ordre: 2
    module_source: "module-02"
    enonce: "Citez deux des neuf thématiques du RGESN 2024 (réponse libre)."
    type: "choix_multiple"
    options:
      - id: "a"
        texte: "Stratégie"
        correct: true
      - id: "b"
        texte: "Sécurité"
        correct: false
      - id: "c"
        texte: "Backend"
        correct: true
      - id: "d"
        texte: "Accessibilité"
        correct: false
      - id: "e"
        texte: "Algorithmie / IA"
        correct: true
      - id: "f"
        texte: "Hébergement"
        correct: true
    consigne_scoring: "Point accordé si au moins 2 thématiques correctes sont sélectionnées sans thématique incorrecte"
    explication: "Les 9 thématiques du RGESN 2024 sont : Stratégie, Spécification, Architecture, UX/Interface, Contenus, Frontend, Backend, Hébergement, Algorithmie/IA."
    points: 1

  - id: "final-q3"
    ordre: 3
    module_source: "module-02"
    enonce: "Quelle thématique a été ajoutée dans le RGESN 2024 par rapport à la version 2022 ?"
    type: "choix_unique"
    options:
      - id: "a"
        texte: "Sécurité"
        correct: false
      - id: "b"
        texte: "Accessibilité"
        correct: false
      - id: "c"
        texte: "Algorithmie / Intelligence Artificielle"
        correct: true
      - id: "d"
        texte: "Données personnelles"
        correct: false
    explication: "La thématique Algorithmie / IA est la grande nouveauté de la version 2024. Elle couvre la frugalité algorithmique, le choix des modèles IA et l'évaluation de l'empreinte d'entraînement."
    points: 1

  - id: "final-q4"
    ordre: 4
    module_source: "module-03"
    enonce: "Quel outil gratuit permet d'obtenir un score A→G sur l'écoconception d'une page web à partir de son URL ?"
    type: "choix_unique"
    options:
      - id: "a"
        texte: "NumEcoDiag"
        correct: false
        note: "NumEcoDiag est un questionnaire, pas un scanner d'URL"
      - id: "b"
        texte: "EcoIndex"
        correct: true
      - id: "c"
        texte: "CodeCarbon"
        correct: false
        note: "CodeCarbon mesure l'empreinte de scripts Python"
      - id: "d"
        texte: "Scaphandre"
        correct: false
        note: "Scaphandre mesure la consommation énergétique d'un process Linux"
    explication: "EcoIndex (ecoindex.fr) calcule un score A→G basé sur 3 métriques d'une page web : nombre d'éléments DOM, nombre de requêtes HTTP, et poids total. Il dispose aussi d'une API pour intégration CI/CD."
    points: 1

  - id: "final-q5"
    ordre: 5
    module_source: "lab-01"
    enonce: "Dans le tableur RGESN, que signifie la valeur 'NA' pour un critère ?"
    type: "choix_unique"
    options:
      - id: "a"
        texte: "Non Attribué — le critère n'a pas encore été évalué"
        correct: false
      - id: "b"
        texte: "Non Applicable — le critère ne s'applique pas au contexte du service"
        correct: true
      - id: "c"
        texte: "Non Atteint — le critère est en cours de mise en conformité"
        correct: false
      - id: "d"
        texte: "Non Acceptable — le critère est volontairement ignoré"
        correct: false
    explication: "NA signifie Non Applicable. Par exemple, le critère 'Limiter les vidéos' est NA pour un service qui ne publie pas de vidéos. Les critères NA n'entrent pas dans le calcul du score de conformité."
    points: 1

  - id: "final-q6"
    ordre: 6
    module_source: "module-01"
    enonce: "La loi REEN concerne en priorité quels types de services numériques en France ?"
    type: "choix_unique"
    options:
      - id: "a"
        texte: "Tous les sites web commerciaux sans exception"
        correct: false
      - id: "b"
        texte: "Uniquement les applications mobiles"
        correct: false
      - id: "c"
        texte: "Les services numériques des organismes publics et grands opérateurs"
        correct: true
      - id: "d"
        texte: "Les ESN de plus de 50 salariés"
        correct: false
    explication: "La loi REEN (2021) vise en priorité les services numériques des organismes publics et les opérateurs de communications électroniques. Les ESN privées ne sont pas encore directement concernées, mais leurs clients publics le sont — ce qui crée une demande indirecte."
    points: 1

  - id: "final-q7"
    ordre: 7
    module_source: "module-01"
    enonce: "La fabrication des laptops des salariés d'une ESN appartient à quel scope du GHG Protocol ?"
    type: "choix_unique"
    options:
      - id: "a"
        texte: "Scope 1"
        correct: false
      - id: "b"
        texte: "Scope 2"
        correct: false
      - id: "c"
        texte: "Scope 3"
        correct: true
    explication: "La fabrication des équipements (laptops, smartphones, écrans) est en scope 3 — émissions indirectes liées à la chaîne de valeur amont. C'est souvent le poste le plus important pour une ESN, et le plus ignoré car difficile à mesurer directement."
    points: 1

  - id: "final-q8"
    ordre: 8
    module_source: "lab-01"
    enonce: "Un endpoint API recalcule les mêmes statistiques depuis la base de données à chaque appel, sans aucun cache. Quelle thématique RGESN est concernée ?"
    type: "choix_unique"
    options:
      - id: "a"
        texte: "Frontend (thématique 06)"
        correct: false
      - id: "b"
        texte: "Backend (thématique 07)"
        correct: true
      - id: "c"
        texte: "Architecture (thématique 03)"
        correct: false
        note: "Partiellement correct — mais le critère spécifique est Backend"
      - id: "d"
        texte: "Hébergement (thématique 08)"
        correct: false
    explication: "L'absence de cache serveur sur un endpoint fréquemment appelé est une non-conformité de la thématique Backend (07) — critère 'Utiliser un système de cache serveur'. Redis, Memcached ou un cache HTTP sont les solutions courantes."
    points: 1

  - id: "final-q9"
    ordre: 9
    module_source: "module-03"
    enonce: "Quel outil officiel de la DINUM permet d'évaluer l'écoconception d'un service via un questionnaire guidé et de générer un rapport exportable ?"
    type: "choix_unique"
    options:
      - id: "a"
        texte: "EcoIndex"
        correct: false
      - id: "b"
        texte: "Lighthouse"
        correct: false
      - id: "c"
        texte: "NumEcoDiag"
        correct: true
      - id: "d"
        texte: "CodeCarbon"
        correct: false
    explication: "NumEcoDiag (ecoresponsable.numerique.gouv.fr/numecodiag) est l'outil officiel de la DINUM basé sur le RGESN. Il produit un rapport PDF exportable, utilisable dans un reporting DSI ou une réponse à appel d'offres."
    points: 1

  - id: "final-q10"
    ordre: 10
    module_source: "lab-02"
    enonce: "Parmi ces exemples, lequel est un critère d'acceptance environnemental valide pour une user story ?"
    type: "choix_unique"
    options:
      - id: "a"
        texte: "La page doit être jolie sur mobile"
        correct: false
      - id: "b"
        texte: "La fonctionnalité doit être rapide"
        correct: false
      - id: "c"
        texte: "Quand l'utilisateur charge la liste des résultats, le poids total de la page ne dépasse pas 500 Ko et le nombre de requêtes HTTP ne dépasse pas 20"
        correct: true
      - id: "d"
        texte: "Le service doit respecter le RGESN"
        correct: false
        note: "Trop vague pour être un critère d'acceptance — non testable directement"
    explication: "Un bon critère d'acceptance environnemental est spécifique, mesurable et testable. Il référence une métrique concrète (poids de page, nombre de requêtes, score EcoIndex) avec une valeur seuil. 'Respecter le RGESN' ou 'être rapide' ne sont pas testables directement."
    points: 1
```

## Messages post-quiz

```yaml
messages_score:
  - plage: [0, 3]
    titre: "Des bases à consolider"
    message: "La journée a posé les fondations — il est recommandé de revoir les modules 01 et 02 et de pratiquer avec NumEcoDiag sur votre service actuel."
    action: "Reprendre les modules théoriques sur la plateforme"

  - plage: [4, 6]
    titre: "Bonne compréhension des enjeux"
    message: "Vous avez assimilé les points clés. Pour aller plus loin, lancez un audit EcoIndex sur un de vos projets actuels dès demain."
    action: "Faire un audit EcoIndex et partager le résultat à votre équipe"

  - plage: [7, 9]
    titre: "Très bonne maîtrise"
    message: "Vous êtes prêt à devenir un relais Green IT dans votre équipe. La prochaine étape : proposer un audit RGESN sur un projet en cours."
    action: "Organiser un atelier RGESN avec votre équipe"

  - plage: [10, 10]
    titre: "Excellent !"
    message: "Score parfait. Vous avez les bases pour devenir référent écoconception dans votre équipe. Pensez à partager vos apprentissages."
    action: "Devenir référent écoconception et former vos collègues"
```
