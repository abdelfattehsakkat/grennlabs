---
id: lab-01-audit-rgesn
titre: "Lab 01 — Audit collectif RGESN sur un service fictif"
type: lab
moment: "matin"
duree: 75
profils: [all]
groupes: "Mixtes de 3 à 4 personnes"
objectif: "Savoir utiliser le tableur RGESN officiel pour évaluer un service numérique. Comprendre la logique Conforme / Non conforme / Non applicable et pratiquer l'argumentation."
materiel:
  - "Tableur RGESN .xlsx (Arcep) — une copie partagée par groupe"
  - "Fiche de description du service fictif (ci-dessous)"
plateforme:
  composant: "LabAuditRgesn"
  fonctionnalites:
    - "Affichage de la fiche service fictif"
    - "Grille des 12 critères à évaluer (C / NC / NA + justification)"
    - "Révélation progressive des réponses formateur"
    - "Tableau de synthèse des scores par groupe"
---

# Lab 01 — Audit collectif RGESN

## Description du service fictif — MonServicePublicFr

```yaml
service_fictif:
  nom: "MonServicePublicFr"
  description: "Portail en ligne permettant aux citoyens de déposer et suivre leurs demandes de documents administratifs (extrait d'acte de naissance, casier judiciaire, carte d'identité...)"
  contexte: "Service public numérique géré par une collectivité territoriale. Développé et maintenu par une ESN partenaire."
  stack_technique:
    frontend: "React 18, Create React App (pas de SSR)"
    backend: "Spring Boot 3, Java 17"
    base_de_donnees: "PostgreSQL 15"
    cache: "Redis 7 (en place mais peu utilisé)"
    hebergement: "AWS eu-west-3 (Paris)"
    cdn: "Aucun"
    ci_cd: "GitLab CI"
  metriques_connues:
    utilisateurs_mois: 50000
    pages_vues_mois: 280000
    score_ecoindex: "E (score 38/100)"
    poids_page_accueil_ko: 2800
    nb_requetes_http_accueil: 67
    score_lighthouse_performance: 42
  equipe:
    referent_ecoconception: null
    politique_retention_donnees: "Non documentée"
    tests_anciens_equipements: "Non réalisés"
  elements_notables:
    - "Carousel automatique sur la page d'accueil avec autoplay non désactivable"
    - "Images PNG non compressées — la plus lourde fait 2,1 Mo"
    - "Requêtes N+1 identifiées sur le listing des demandes (1 requête par statut)"
    - "Cache Redis en place mais utilisé uniquement pour les sessions"
    - "L'hébergeur AWS publie son bilan carbone annuel"
    - "Aucun indicateur d'empreinte n'est suivi ou reporté"
    - "Le service fonctionne correctement sur iPhone 12 et Samsung récents — non testé sur équipements anciens"
    - "Toutes les dépendances npm sont à jour — audit révèle 12 packages inutilisés"
```

---

## Les 12 critères à évaluer

```yaml
criteres_lab:
  - id: "lab1-c1"
    numero: 1
    thematique: "Stratégie (01)"
    intitule: "Un référent écoconception est désigné dans l'équipe"
    description_evaluateur: "Vérifier qu'une personne est nommée responsable du suivi des critères d'écoconception pour ce service"
    indices_disponibles:
      - "L'équipe ne mentionne aucun rôle de ce type dans son organisation"
    reponse_correcte: "NC"
    justification_formateur: "Non conforme — aucun référent écoconception n'est désigné. C'est le critère fondateur : sans responsable, aucun autre critère ne sera suivi dans le temps."
    niveau_difficulte: "Facile"
    effet_pedagogique: "Montre que la démarche commence par l'organisation, pas par le code"

  - id: "lab1-c2"
    numero: 2
    thematique: "Spécification (02)"
    intitule: "Les fonctionnalités sont justifiées par des données d'usage réelles"
    description_evaluateur: "Vérifier que chaque fonctionnalité du service est justifiée par une donnée d'usage mesurée (analytics, tests utilisateurs, etc.)"
    indices_disponibles:
      - "Le carousel automatique est présent — son utilisation n'est pas mentionnée"
      - "50 000 utilisateurs/mois — des analytics sont donc disponibles"
    reponse_correcte: "Ambigu — à débattre"
    reponse_acceptable: ["NC", "Ambigu"]
    justification_formateur: "Ambigu mais probablement NC — le carousel automatique est un signe classique de fonctionnalité non justifiée. Un service avec 50k utilisateurs/mois a des analytics — la question est de savoir si on les consulte pour prendre des décisions de product."
    niveau_difficulte: "Moyen — débat attendu"
    effet_pedagogique: "Illustre que l'écoconception questionne les choix produit, pas seulement le code"

  - id: "lab1-c3"
    numero: 3
    thematique: "Architecture (03)"
    intitule: "L'architecture est adaptée à la charge réelle du service"
    description_evaluateur: "Vérifier que les ressources provisionnées correspondent à l'usage réel — pas de sur-dimensionnement ni sous-dimensionnement"
    indices_disponibles:
      - "50 000 utilisateurs/mois = environ 1 700/jour en moyenne"
      - "Hébergement AWS avec auto-scaling disponible"
    reponse_correcte: "C"
    justification_formateur: "Conforme — AWS eu-west-3 avec les services managés permet un dimensionnement adapté à la charge. À condition que l'auto-scaling soit configuré, ce qui est probable pour un service public."
    niveau_difficulte: "Moyen"
    effet_pedagogique: "Montre que certains critères peuvent être conformes même dans un service avec beaucoup de non-conformités"

  - id: "lab1-c4"
    numero: 4
    thematique: "UX / Interface (04)"
    intitule: "Aucune action automatique n'est déclenchée sans action de l'utilisateur"
    description_evaluateur: "Vérifier l'absence d'autoplay vidéo/audio, de chargement automatique de contenu, de carousel auto-défilant sans contrôle utilisateur"
    indices_disponibles:
      - "Carousel automatique sur la page d'accueil avec autoplay non désactivable"
    reponse_correcte: "NC"
    justification_formateur: "Non conforme — le carousel avec autoplay est explicitement mentionné comme non désactivable. C'est une non-conformité directe à ce critère."
    niveau_difficulte: "Facile"
    effet_pedagogique: "Exemple concret très visuel — les participants reconnaissent tous ce pattern"

  - id: "lab1-c5"
    numero: 5
    thematique: "Contenus (05)"
    intitule: "Les images sont optimisées avant mise en ligne"
    description_evaluateur: "Vérifier les formats utilisés (WebP/AVIF préférés au PNG/JPG), la compression appliquée, et l'adaptation des dimensions aux affichages"
    indices_disponibles:
      - "Images PNG non compressées — la plus lourde fait 2,1 Mo"
      - "Poids total de la page d'accueil : 2 800 Ko"
    reponse_correcte: "NC"
    justification_formateur: "Non conforme — une image PNG de 2,1 Mo non compressée est une non-conformité claire. En WebP optimisé, cette image ferait 200 à 400 Ko. Avec 50k utilisateurs/mois, l'impact cumulé est significatif."
    niveau_difficulte: "Facile"
    effet_pedagogique: "Chiffre le gain potentiel — très parlant pour les développeurs"

  - id: "lab1-c6"
    numero: 6
    thematique: "Frontend (06)"
    intitule: "Le nombre de requêtes HTTP est minimisé"
    description_evaluateur: "Vérifier que les ressources sont regroupées (bundling), que les requêtes inutiles sont supprimées, et que le nombre total est raisonnable"
    indices_disponibles:
      - "67 requêtes HTTP sur la page d'accueil"
      - "Create React App (pas de SSR)"
      - "Aucun CDN"
    reponse_correcte: "NC"
    reponse_acceptable: ["NC", "Ambigu"]
    justification_formateur: "Non conforme — 67 requêtes HTTP est élevé pour une page administrative. La recommandation est de rester sous 30 requêtes. L'absence de CDN aggrave l'impact réseau de chaque requête."
    niveau_difficulte: "Moyen — les participants débattent du seuil"
    effet_pedagogique: "Ouvre la discussion sur les seuils — il n'y a pas de valeur magique, mais 67 est clairement excessif"

  - id: "lab1-c7"
    numero: 7
    thematique: "Backend (07)"
    intitule: "Un système de cache serveur est utilisé sur les données fréquemment accédées"
    description_evaluateur: "Vérifier la présence d'un cache applicatif (Redis, Memcached) sur les endpoints les plus sollicités"
    indices_disponibles:
      - "Redis 7 en place mais utilisé uniquement pour les sessions"
    reponse_correcte: "NC"
    reponse_acceptable: ["NC", "Ambigu"]
    justification_formateur: "Non conforme au sens du critère — Redis est présent mais mal utilisé. Un cache pour les sessions ne répond pas à l'objectif d'éviter de recalculer des données fréquemment accédées. Le Redis doit aussi être utilisé pour les données métier."
    niveau_difficulte: "Élevé — cas subtil"
    effet_pedagogique: "Montre que 'avoir l'outil' ne suffit pas — il faut l'utiliser correctement"

  - id: "lab1-c8"
    numero: 8
    thematique: "Backend (07)"
    intitule: "Les requêtes à la base de données sont optimisées"
    description_evaluateur: "Vérifier l'absence de requêtes N+1, de full table scans, d'index manquants sur les colonnes fréquemment filtrées"
    indices_disponibles:
      - "Requêtes N+1 identifiées sur le listing des demandes (1 requête par statut)"
    reponse_correcte: "NC"
    justification_formateur: "Non conforme — les requêtes N+1 sont explicitement mentionnées. Sur une page qui liste des demandes pour 50k utilisateurs, c'est potentiellement des millions de requêtes inutiles par mois."
    niveau_difficulte: "Facile pour les devs, moyen pour les autres"
    effet_pedagogique: "Permet aux développeurs d'expliquer aux non-devs ce qu'est un N+1 — moment pédagogique fort"

  - id: "lab1-c9"
    numero: 9
    thematique: "Hébergement (08)"
    intitule: "L'hébergeur publie son bilan carbone"
    description_evaluateur: "Vérifier que l'hébergeur rend public son rapport environnemental avec des données sur l'efficacité énergétique (PUE) et les émissions de CO₂"
    indices_disponibles:
      - "Hébergement AWS eu-west-3 (Paris)"
      - "AWS publie son rapport de durabilité annuel"
    reponse_correcte: "C"
    justification_formateur: "Conforme — AWS publie effectivement un rapport de durabilité annuel avec des données par région, incluant le PUE et les émissions. La région Paris (eu-west-3) bénéficie d'un mix électrique favorable (nucléaire + renouvelables)."
    niveau_difficulte: "Facile pour les participants informés"
    effet_pedagogique: "Évite le réflexe anti-cloud — les grands hébergeurs sont souvent plus transparents que les solutions on-premise"

  - id: "lab1-c10"
    numero: 10
    thematique: "Backend (07)"
    intitule: "La durée de conservation des données est définie et appliquée"
    description_evaluateur: "Vérifier l'existence d'une politique de rétention des données avec des durées définies et des processus de suppression automatique"
    indices_disponibles:
      - "Politique de rétention des données : non documentée"
    reponse_correcte: "NC"
    justification_formateur: "Non conforme — aucune politique de rétention n'est documentée. Stocker indéfiniment des données inutilisées consomme de l'espace disque et de l'énergie inutilement. C'est aussi souvent un problème RGPD."
    niveau_difficulte: "Facile"
    effet_pedagogique: "Fait le lien entre écoconception et RGPD — les données inutiles sont mauvaises sur les deux dimensions"

  - id: "lab1-c11"
    numero: 11
    thematique: "UX / Interface (04)"
    intitule: "Le service fonctionne sur des équipements anciens (3 ans et plus)"
    description_evaluateur: "Vérifier que le service a été testé et est utilisable sur des smartphones et navigateurs de 3 ans et plus"
    indices_disponibles:
      - "Fonctionne sur iPhone 12 et Samsung récents"
      - "Non testé sur équipements anciens"
    reponse_correcte: "NC"
    reponse_acceptable: ["NC", "NA"]
    justification_formateur: "Non conforme — le critère demande explicitement des tests sur des équipements anciens (3 ans+). Un iPhone 12 (2020) peut encore être récent selon la date de la formation. 'Non testé' = NC dans le tableur RGESN."
    niveau_difficulte: "Moyen — débat sur la définition d'ancien"
    effet_pedagogique: "Lie l'écoconception à la durée de vie des équipements — le service qui force le renouvellement contribue à l'empreinte"

  - id: "lab1-c12"
    numero: 12
    thematique: "Stratégie (01)"
    intitule: "L'empreinte environnementale du service est mesurée et suivie"
    description_evaluateur: "Vérifier l'existence d'indicateurs environnementaux suivis régulièrement (score EcoIndex, empreinte CO₂, score RGESN)"
    indices_disponibles:
      - "Aucun indicateur d'empreinte n'est suivi ou reporté"
    reponse_correcte: "NC"
    justification_formateur: "Non conforme — aucun indicateur n'est suivi. Le service a un score EcoIndex E (38/100) et 67 requêtes HTTP sur la page d'accueil — ces données ne sont manifestement pas surveillées activement."
    niveau_difficulte: "Facile"
    effet_pedagogique: "Boucle avec le critère 1 — sans référent et sans mesure, rien ne s'améliore"
```

---

## Synthèse des résultats attendus

```yaml
synthese:
  score_conformite:
    conformes: [3, 9]
    non_conformes: [1, 4, 5, 6, 7, 8, 10, 11, 12]
    ambigus: [2, 7, 11]
  taux_conformite_estime: "2 critères clairement conformes sur 12 = 17%"
  message_formateur: "Un score de 17% n'est pas catastrophique pour un premier audit — c'est souvent la réalité. L'important est d'identifier les priorités et de progresser."
  priorites_recommandees:
    - rang: 1
      critere: "C5 — Images non optimisées"
      raison: "Impact immédiat, facile à corriger, gain mesurable en quelques heures"
    - rang: 2
      critere: "C8 — Requêtes N+1"
      raison: "Impact performance et empreinte, correction bien documentée en Spring Boot"
    - rang: 3
      critere: "C1 — Désigner un référent"
      raison: "Décision organisationnelle, zéro effort technique, débloque tout le reste"
```

---

## Guide de facilitation formateur

```yaml
facilitation:
  constitution_groupes:
    recommandation: "Groupes mixtes intentionnels — mélanger dev, QA et CP si possible"
    raison: "Les devs expliquent les critères techniques aux autres, les analystes challengent les justifications"

  deroulement_detaille:
    - etape: "Présentation du service fictif (5 min)"
      consignes:
        - "Lire la fiche du service à voix haute"
        - "Inviter les participants à poser des questions de clarification"
        - "Ne PAS révéler les éléments notables — laisser les groupes les découvrir"

    - etape: "Audit en groupes (45 min)"
      consignes:
        - "Distribuer les 12 critères — les groupes évaluent dans l'ordre"
        - "Pour chaque critère : C / NC / NA + 1 phrase de justification"
        - "Rappeler qu'il n'y a pas toujours une réponse unique — le débat est normal"
        - "Circuler entre les groupes, ne pas donner les réponses, poser des questions"
      questions_relance:
        - "Sur quoi vous basez-vous pour dire C ?"
        - "Comment vous testeriez ça concrètement ?"
        - "Si vous étiez auditeur officiel, quelle preuve demanderiez-vous ?"

    - etape: "Restitution (20 min)"
      consignes:
        - "Chaque groupe présente 2 critères qu'ils ont trouvés non conformes"
        - "Les autres groupes peuvent challenger"
        - "Formateur révèle la réponse et la justification après le débat"
        - "Insister sur les cas ambigus — c'est là que l'apprentissage est le plus riche"

    - etape: "Synthèse (5 min)"
      message_cloture: "Vous venez de faire votre premier audit RGESN. Ce que vous avez fait là, c'est exactement le travail d'un référent écoconception en phase de diagnostic. La différence avec un expert : la vitesse et la profondeur des justifications."
```
