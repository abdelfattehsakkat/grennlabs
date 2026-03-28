---
id: module-03-mesurer
titre: "Mesurer l'empreinte numérique — outils et méthodes"
ordre: 3
duree: 40
type: theorie
profils: [all]
objectif: "Connaître les outils de mesure disponibles selon son rôle. Comprendre ce qu'on mesure et ce que ça signifie concrètement."
slides_count: 12
demo_live: true
ressources:
  - label: "EcoIndex"
    url: "https://www.ecoindex.fr"
  - label: "Lighthouse (Chrome DevTools)"
    url: "https://developer.chrome.com/docs/lighthouse/overview/"
  - label: "NumEcoDiag (DINUM)"
    url: "https://ecoresponsable.numerique.gouv.fr/numecodiag/"
  - label: "CodeCarbon"
    url: "https://codecarbon.io"
  - label: "Cloud Carbon Footprint"
    url: "https://www.cloudcarbonfootprint.org"
  - label: "Scaphandre"
    url: "https://github.com/hubblo-org/scaphandre"
---

# Module 03 — Mesurer l'empreinte numérique

## 3.1 — Pourquoi mesurer

### Messages clés

- On ne peut améliorer que ce qu'on mesure — sans baseline, pas de progrès objectivable
- Deux types de mesures complémentaires : impact environnemental direct (CO₂e) et proxies techniques actionnables
- Les proxies techniques sont plus utiles au quotidien car ils sont dans les mains des équipes

### Types de mesures

```yaml
types_mesures:
  - type: "Impact environnemental direct"
    description: "Quantification en unités physiques de l'empreinte réelle"
    unites: ["gCO₂e", "kgCO₂e", "tCO₂e", "kWh", "litres d'eau"]
    avantages:
      - "Parle aux décideurs et au reporting CSRD"
      - "Comparable entre services différents"
    inconvenients:
      - "Complexe à calculer précisément"
      - "Nécessite des données de facteurs d'émission"
      - "Difficile à intégrer dans une pipeline CI/CD"
    outils: ["CodeCarbon", "Cloud Carbon Footprint", "Boavizta API"]

  - type: "Proxies techniques"
    description: "Métriques techniques corrélées à l'impact environnemental"
    unites: ["Score EcoIndex A-G", "Nombre de requêtes HTTP", "Poids de page en Ko", "Score Lighthouse 0-100"]
    avantages:
      - "Mesurables automatiquement à chaque déploiement"
      - "Actionnables directement par les développeurs"
      - "Intégrables en CI/CD comme quality gate"
    inconvenients:
      - "Corrélation imparfaite avec l'empreinte réelle"
      - "Ne capture pas l'usage réel (fréquence, durée)"
    outils: ["EcoIndex", "Lighthouse", "WebPageTest", "DevTools"]
```

---

## 3.2 — Les métriques clés

```yaml
metriques:
  - nom: "Score EcoIndex"
    unite: "A (meilleur) → G (pire)"
    description: "Score global d'écoconception d'une page web calculé sur 3 variables"
    variables:
      - "Nombre d'éléments DOM"
      - "Nombre de requêtes HTTP"
      - "Poids total de la page (Ko)"
    outil: "ecoindex.fr ou API EcoIndex"
    profils: ["Développeur Frontend", "QA"]
    frequence_mesure: "À chaque release, idéalement en CI"
    objectif_cible: "Score A ou B (≥ 75/100)"
    formule_note: "Score calculé via un algorithme pondérant les 3 variables — plus les valeurs sont basses, meilleur est le score"

  - nom: "Poids de page"
    unite: "Ko (ou Mo)"
    description: "Poids total des ressources téléchargées pour afficher une page"
    outil: "Chrome DevTools > Network, Lighthouse, WebPageTest"
    profils: ["Développeur Frontend", "QA"]
    frequence_mesure: "À chaque release"
    objectif_cible: "< 500 Ko pour une page standard, < 1 Mo maximum"

  - nom: "Nombre de requêtes HTTP"
    unite: "Nombre entier"
    description: "Nombre total d'appels réseau pour charger une page"
    outil: "Chrome DevTools > Network"
    profils: ["Développeur Frontend", "QA"]
    frequence_mesure: "À chaque release"
    objectif_cible: "< 30 requêtes pour une page standard"

  - nom: "Score Lighthouse Performance"
    unite: "0 → 100"
    description: "Score de performance web incluant LCP, FID, CLS — corrélé à la consommation"
    outil: "Chrome DevTools > Lighthouse, Lighthouse CI"
    profils: ["Développeur Frontend", "QA"]
    frequence_mesure: "À chaque PR / déploiement"
    objectif_cible: "> 80"

  - nom: "Empreinte CO₂ du code (ML/Data)"
    unite: "gCO₂e par run"
    description: "Émissions liées à l'exécution d'un script Python (GPU/CPU/RAM)"
    outil: "CodeCarbon (librairie Python)"
    profils: ["Développeur Backend", "Data Scientist"]
    frequence_mesure: "À chaque entraînement ou batch de traitement"
    objectif_cible: "Baseline à établir, puis réduction de 20% par itération"

  - nom: "Empreinte cloud"
    unite: "tCO₂e / mois"
    description: "Émissions consolidées de l'ensemble des ressources cloud utilisées"
    outil: "Cloud Carbon Footprint (open source)"
    profils: ["DevOps", "Chef de projet", "Manager"]
    frequence_mesure: "Mensuelle"
    objectif_cible: "Dashboard de suivi avec alertes sur dérive"

  - nom: "Score RGESN"
    unite: "% de critères conformes"
    description: "Part des critères RGESN applicables qui sont conformes"
    outil: "Tableur Arcep .xlsx ou NumEcoDiag"
    profils: ["Tous"]
    frequence_mesure: "Trimestrielle ou par phase de projet"
    objectif_cible: "Progression continue — pas de seuil absolu"
```

---

## 3.3 — Les outils par profil

### Pour les développeurs

```yaml
outils_dev:
  - nom: "EcoIndex"
    type: "Web — gratuit"
    url: "https://www.ecoindex.fr"
    usage: "Auditer une URL publique en 30 secondes"
    comment_utiliser:
      - "Entrer l'URL du service à auditer"
      - "Lire le score A→G et les 3 métriques (DOM, requêtes, poids)"
      - "Comparer avant/après une optimisation"
    integration_ci: "API disponible — peut être appelée dans une pipeline GitLab CI"
    exemple_commande: "curl 'https://www.ecoindex.fr/api/v1/ecoindex/page?url=https://monservice.fr'"

  - nom: "Lighthouse CI"
    type: "CLI / CI — open source"
    url: "https://github.com/GoogleChrome/lighthouse-ci"
    usage: "Mesurer et surveiller la performance à chaque déploiement"
    comment_utiliser:
      - "Installer : npm install -g @lhci/cli"
      - "Configurer lighthouserc.js avec les seuils souhaités"
      - "Intégrer dans .gitlab-ci.yml"
    integration_ci: true
    exemple_config: |
      # lighthouserc.js
      module.exports = {
        ci: {
          assert: {
            assertions: {
              'categories:performance': ['warn', { minScore: 0.8 }],
              'first-contentful-paint': ['error', { maxNumericValue: 2000 }],
            }
          }
        }
      }

  - nom: "CodeCarbon"
    type: "Librairie Python — open source"
    url: "https://codecarbon.io"
    usage: "Mesurer l'empreinte CO₂ d'un script Python (ML, data, batch)"
    comment_utiliser:
      - "pip install codecarbon"
      - "Décorer la fonction à mesurer avec @track_emissions"
      - "Lire le rapport généré (emissions.csv)"
    exemple_code: |
      from codecarbon import track_emissions

      @track_emissions(country_iso_code="FRA")
      def train_model():
          # Votre code d'entraînement ici
          pass

  - nom: "Scaphandre"
    type: "Agent système — open source (Rust)"
    url: "https://github.com/hubblo-org/scaphandre"
    usage: "Mesurer la consommation énergétique réelle d'un process Linux"
    comment_utiliser:
      - "Déployer l'agent sur le serveur Linux"
      - "Exporter les métriques vers Prometheus / Grafana"
      - "Identifier les processus les plus énergivores"
    profils: ["Développeur Backend", "DevOps"]

  - nom: "Webpack Bundle Analyzer"
    type: "Plugin npm — open source"
    url: "https://github.com/webpack-contrib/webpack-bundle-analyzer"
    usage: "Visualiser le poids du bundle JavaScript et identifier les dépendances inutiles"
    exemple_commande: "npx webpack-bundle-analyzer stats.json"
    profils: ["Développeur Frontend"]
```

### Pour les QA et Analystes

```yaml
outils_qa:
  - nom: "NumEcoDiag"
    type: "Web — gratuit — officiel DINUM"
    url: "https://ecoresponsable.numerique.gouv.fr/numecodiag/"
    usage: "Évaluer l'écoconception d'un service numérique via un questionnaire guidé"
    comment_utiliser:
      - "Accéder à l'outil en ligne"
      - "Répondre aux questions par thématique RGESN"
      - "Obtenir un score et des recommandations priorisées"
      - "Exporter le rapport PDF"
    temps_estime: "20 à 45 minutes selon la connaissance du service"
    avantage: "Basé directement sur le RGESN — rapport exportable pour le DSI"

  - nom: "EcoIndex"
    type: "Web — gratuit"
    url: "https://www.ecoindex.fr"
    usage: "Tester une page avant et après une feature pour mesurer l'impact"
    cas_usage_QA:
      - "Tester la page d'accueil avant/après ajout d'une vidéo"
      - "Comparer deux versions d'une interface"
      - "Vérifier qu'une nouvelle feature ne dégrade pas le score"

  - nom: "Lighthouse (Chrome DevTools)"
    type: "Intégré Chrome — gratuit"
    usage: "Audit complet d'une page : performance, accessibilité, SEO, bonnes pratiques"
    comment_utiliser:
      - "F12 > onglet Lighthouse > Generate report"
      - "Lire les opportunités d'amélioration"
      - "Partager le rapport avec l'équipe dev"
    profils: ["QA", "Développeur Frontend"]
```

### Pour les chefs de projet et managers

```yaml
outils_cp:
  - nom: "Cloud Carbon Footprint"
    type: "Dashboard open source"
    url: "https://www.cloudcarbonfootprint.org"
    usage: "Visualiser l'empreinte carbone de l'ensemble des ressources AWS / Azure / GCP"
    comment_utiliser:
      - "Connecter les comptes cloud via IAM / API"
      - "Visualiser l'empreinte par service, par région, par projet"
      - "Identifier les ressources les plus émettrices"
    profils: ["DevOps", "Chef de projet", "DSI"]

  - nom: "NumEcoDiag"
    type: "Web — gratuit — officiel DINUM"
    url: "https://ecoresponsable.numerique.gouv.fr/numecodiag/"
    usage: "Produire un rapport d'écoconception exportable pour le reporting DSI ou client"
    avantage_CP: "Le rapport PDF généré est directement utilisable dans un reporting ou une réponse à AO"

  - nom: "Tableur RGESN Arcep (.xlsx)"
    type: "Fichier bureautique — gratuit — officiel"
    url: "https://www.arcep.fr"
    usage: "Suivre la conformité RGESN d'un projet dans le temps"
    comment_utiliser:
      - "Télécharger le tableur officiel sur arcep.fr"
      - "Renseigner C / NC / NA pour chaque critère"
      - "Calculer le score de conformité par thématique"
      - "Mettre à jour à chaque sprint ou phase projet"
```

---

## 3.4 — Démo live formateur (10 min)

```yaml
demo_live:
  duree: 10
  prerequis: "Connexion internet, navigateur Chrome"
  etapes:
    - numero: 1
      action: "Ouvrir ecoindex.fr"
      url: "https://www.ecoindex.fr"
      quoi_montrer:
        - "Entrer l'URL du site institutionnel de l'ESN (ou tout site connu)"
        - "Attendre le calcul (10-20 secondes)"
        - "Lire le score ensemble : lettre, valeur sur 100, les 3 métriques"
      question_audience: "Vous attendiez quel score ? Surpris ?"

    - numero: 2
      action: "Ouvrir Chrome DevTools > Lighthouse sur le même site"
      quoi_montrer:
        - "Lancer un audit Performance"
        - "Montrer le score et les opportunités d'amélioration listées"
        - "Identifier la première opportunité : souvent les images non optimisées"
      message: "Tout ça est disponible sans aucun outil à installer — F12 suffit"

    - numero: 3
      action: "Ouvrir NumEcoDiag"
      url: "https://ecoresponsable.numerique.gouv.fr/numecodiag/"
      quoi_montrer:
        - "Parcourir les 5 premières questions ensemble"
        - "Montrer la logique Oui / Non / Ne sait pas"
        - "Montrer à quoi ressemble le rapport final"
      message: "Voilà votre outil de premier audit — gratuit, officiel DINUM, 20 minutes pour un service complet"

  message_cloture: "Ces 3 outils sont gratuits, officiels pour deux d'entre eux, et ne nécessitent aucune installation. Il n'y a aucune raison de ne pas s'en servir dès demain."
```
