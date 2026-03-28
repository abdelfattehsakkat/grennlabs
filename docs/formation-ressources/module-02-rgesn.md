---
id: module-02-rgesn
titre: "Le RGESN — Référentiel et 9 thématiques"
ordre: 2
duree: 50
type: theorie
profils: [all]
objectif: "Comprendre la structure du RGESN 2024, ses 9 thématiques, la logique de conformité, et identifier les critères qui concernent chaque profil."
slides_count: 20
ressources:
  - label: "RGESN 2024 — PDF complet (Arcep)"
    url: "https://www.arcep.fr/uploads/tx_gspublication/referentiel_general_ecoconception_des_services_numeriques_version_2024.pdf"
  - label: "Tableur autoévaluation RGESN .xlsx"
    url: "https://www.arcep.fr/fileadmin/user_upload/nos-sujets/environnement/rgesn_2024_outil_declaration_ecoconception.xlsx"
  - label: "NumEcoDiag — outil de diagnostic DINUM"
    url: "https://ecoresponsable.numerique.gouv.fr/numecodiag/"
---

# Module 02 — Le RGESN : référentiel et 9 thématiques

## 2.1 — Qu'est-ce que le RGESN ?

### Messages clés

- Porté conjointement par Arcep, DINUM, MiNumEco et INR — c'est la référence officielle française
- Version 2024 : 78 critères répartis en 9 thématiques
- Nouveauté majeure v2 : ajout de la thématique Algorithmie / IA (absente de la v1 2022)
- Chaque critère contient : intitulé, objectif, moyen de test, profils concernés

### Positionnement du RGESN

```yaml
comparaison_referentiels:
  - nom: "RGESN"
    criteres: 78
    porteurs: ["Arcep", "DINUM", "MiNumEco", "INR"]
    focus: "Écoconception des services numériques"
    cible: "Équipes projet, développeurs, chefs de projet"
    obligatoire: "Services publics numériques (loi REEN)"
    format: "PDF + tableur .xlsx + outil NumEcoDiag"
    recommande_formation: true

  - nom: "GR491"
    criteres: 516
    porteurs: ["INR (Institut du Numérique Responsable)"]
    focus: "Numérique responsable au sens large (People, Planet, Prosperity)"
    cible: "Organisations, DSI, RSE"
    obligatoire: false
    format: "Site web interactif uniquement (pas de PDF)"
    recommande_formation: false
    note: "Trop large pour une formation 1 journée — à réserver pour les référents avancés"

  - nom: "115 BP GreenIT"
    criteres: 115
    porteurs: ["GreenIT.fr"]
    focus: "Bonnes pratiques écoconception web"
    cible: "Développeurs web"
    obligatoire: false
    format: "PDF téléchargeable"
    note: "Inclut un mapping avec le RGESN depuis la 5ème édition"
```

### Ce que le RGESN N'EST PAS

```yaml
idees_recues:
  - idee: "Le RGESN est une certification"
    realite: "Non — il n'existe pas de label RGESN. C'est un référentiel d'autoévaluation."
  - idee: "Le RGESN est obligatoire pour toutes les ESN"
    realite: "Non — il est obligatoire pour les services numériques publics (loi REEN). Les ESN privées ne sont pas encore concernées directement."
  - idee: "100% de conformité est l'objectif"
    realite: "Non — certains critères sont non applicables selon le contexte. L'objectif est la progression continue."
  - idee: "Le RGESN remplace les bonnes pratiques de développement"
    realite: "Non — il les complète avec une dimension environnementale."
```

---

## 2.2 — Les 9 thématiques en détail

### Structure commune de chaque thématique

```yaml
structure_fiche_critere:
  champs:
    - nom: "Intitulé"
      description: "Ce que le critère demande de faire"
    - nom: "Thématique"
      description: "L'une des 9 thématiques"
    - nom: "Objectif"
      description: "Pourquoi ce critère réduit l'impact environnemental"
    - nom: "Critère"
      description: "La condition à remplir pour être conforme"
    - nom: "Moyen de test"
      description: "Comment vérifier la conformité concrètement"
    - nom: "Profils concernés"
      description: "Qui dans l'équipe est responsable"
  niveaux_conformite:
    - valeur: "Conforme"
      code: "C"
      description: "Le critère est respecté"
    - valeur: "Non conforme"
      code: "NC"
      description: "Le critère n'est pas respecté — action requise"
    - valeur: "Non applicable"
      code: "NA"
      description: "Le critère ne s'applique pas au contexte du service"
```

### Thématique 01 — Stratégie

```yaml
thematique:
  numero: "01"
  nom: "Stratégie"
  nombre_criteres: 8
  profils_principaux: ["Chef de projet", "Manager", "Tous"]
  description: "Intégrer l'écoconception dans la gouvernance du projet dès le départ"
  criteres_exemples:
    - intitule: "Désigner un référent écoconception dans l'équipe"
      objectif: "S'assurer qu'une personne est responsable du suivi des critères RGESN"
      moyen_test: "Vérifier qu'un référent est nommé et que ses responsabilités sont documentées"
      profils: ["Chef de projet", "Manager"]
      priorite: "Haute"
    - intitule: "Mesurer et suivre l'empreinte environnementale du service"
      objectif: "Permettre d'objectiver les améliorations dans le temps"
      moyen_test: "Vérifier l'existence d'indicateurs de suivi (EcoIndex, score RGESN, empreinte CO₂)"
      profils: ["Chef de projet", "DevOps"]
      priorite: "Haute"
  message_formation: "Sans sponsor et sans référent désigné, rien ne tient dans le temps. La thématique Stratégie est le fondement de tout le reste."
```

### Thématique 02 — Spécification

```yaml
thematique:
  numero: "02"
  nom: "Spécification"
  nombre_criteres: 8
  profils_principaux: ["Analyste", "QA", "PO", "Chef de projet"]
  description: "Questionner la nécessité de chaque fonctionnalité avant de la développer"
  criteres_exemples:
    - intitule: "Limiter les fonctionnalités aux besoins réels des utilisateurs"
      objectif: "Éviter de développer des features inutilisées qui consomment des ressources"
      moyen_test: "Vérifier que chaque fonctionnalité est justifiée par une donnée d'usage réelle"
      profils: ["Analyste", "PO", "Chef de projet"]
      priorite: "Haute"
    - intitule: "Optimiser les parcours utilisateurs pour réduire le nombre d'actions"
      objectif: "Moins d'interactions = moins de requêtes = moins de consommation"
      moyen_test: "Cartographier les parcours et identifier les étapes superflues"
      profils: ["Analyste", "UX", "QA"]
      priorite: "Moyenne"
  message_formation: "La fonctionnalité la plus écoconçue est celle qu'on n'a pas développée. Le QA et l'analyste sont en première ligne pour challenger les specs."
```

### Thématique 03 — Architecture

```yaml
thematique:
  numero: "03"
  nom: "Architecture"
  nombre_criteres: 9
  profils_principaux: ["Développeur", "Tech Lead", "Architecte"]
  description: "Concevoir une architecture adaptée à la charge réelle, pas à la charge fantasmée"
  criteres_exemples:
    - intitule: "Choisir une architecture adaptée à la charge réelle du service"
      objectif: "Éviter le sur-dimensionnement qui gaspille des ressources en permanence"
      moyen_test: "Comparer les ressources provisionnées avec l'utilisation réelle (CPU, RAM, stockage)"
      profils: ["Architecte", "Tech Lead", "DevOps"]
      priorite: "Haute"
    - intitule: "Limiter le nombre de dépendances logicielles"
      objectif: "Chaque dépendance augmente la surface de consommation et la complexité"
      moyen_test: "Auditer les dépendances (npm audit, mvn dependency:tree) et supprimer les inutilisées"
      profils: ["Développeur", "Tech Lead"]
      priorite: "Moyenne"
  message_formation: "Un service surdimensionné consomme inutilement 24h/24. L'architecture frugale n'est pas un compromis de qualité — c'est de l'ingénierie précise."
```

### Thématique 04 — Expérience utilisateur / Interface

```yaml
thematique:
  numero: "04"
  nom: "Expérience utilisateur / Interface"
  nombre_criteres: 9
  profils_principaux: ["Développeur Frontend", "UX Designer", "QA"]
  description: "Concevoir des interfaces qui ne déclenchent pas d'actions inutiles"
  criteres_exemples:
    - intitule: "Ne pas déclencher d'actions automatiques sans action utilisateur"
      objectif: "Éviter les chargements, lectures, requêtes non sollicités par l'utilisateur"
      moyen_test: "Vérifier l'absence d'autoplay vidéo/audio, de chargement automatique de contenu"
      profils: ["Développeur Frontend", "UX"]
      priorite: "Haute"
    - intitule: "Permettre à l'utilisateur de contrôler les animations"
      objectif: "Les animations CSS/JS consomment du CPU en continu"
      moyen_test: "Vérifier le respect de prefers-reduced-motion et la présence de contrôles pause"
      profils: ["Développeur Frontend"]
      priorite: "Moyenne"
  message_formation: "Le scroll infini, l'autoplay, les notifications push — ce sont des dark patterns qui consomment en permanence. L'UX responsable est souvent meilleure pour l'utilisateur ET pour la planète."
```

### Thématique 05 — Contenus

```yaml
thematique:
  numero: "05"
  nom: "Contenus"
  nombre_criteres: 7
  profils_principaux: ["Développeur", "Analyste", "QA", "Contributeur contenu"]
  description: "Optimiser tous les médias avant mise en ligne"
  criteres_exemples:
    - intitule: "Optimiser le poids des images avant mise en ligne"
      objectif: "Les images non optimisées sont souvent le premier poste de poids de page"
      moyen_test: "Vérifier les formats (WebP/AVIF privilégiés), la compression, les dimensions adaptées"
      profils: ["Développeur Frontend", "QA"]
      priorite: "Haute"
    - intitule: "Limiter les vidéos aux usages vraiment nécessaires"
      objectif: "La vidéo est le média le plus lourd — chaque vidéo doit être justifiée"
      moyen_test: "Vérifier que chaque vidéo a une valeur ajoutée vs une alternative texte/image"
      profils: ["Analyste", "Contributeur contenu"]
      priorite: "Haute"
  message_formation: "Une image PNG de 2Mo qui aurait pu être un WebP de 200Ko, c'est 10x plus de bande passante consommée à chaque affichage. Multiplié par 10 000 utilisateurs par jour."
```

### Thématique 06 — Frontend

```yaml
thematique:
  numero: "06"
  nom: "Frontend"
  nombre_criteres: 9
  profils_principaux: ["Développeur Frontend"]
  description: "Réduire la quantité de code et de requêtes exécutées côté navigateur"
  criteres_exemples:
    - intitule: "Minimiser le nombre de requêtes HTTP"
      objectif: "Chaque requête a un coût réseau et CPU — les regrouper réduit la consommation"
      moyen_test: "Auditer avec DevTools ou Lighthouse — nombre de requêtes, waterfall"
      profils: ["Développeur Frontend"]
      priorite: "Haute"
    - intitule: "Mettre en cache les ressources statiques côté client"
      objectif: "Éviter de re-télécharger des ressources identiques à chaque visite"
      moyen_test: "Vérifier les en-têtes Cache-Control sur les assets JS, CSS, images"
      profils: ["Développeur Frontend", "DevOps"]
      priorite: "Haute"
    - intitule: "Ne charger que le code JavaScript nécessaire"
      objectif: "Le JS inutilisé est parsé et compilé pour rien — tree shaking obligatoire"
      moyen_test: "Analyser le bundle avec webpack-bundle-analyzer ou Vite rollup visualizer"
      profils: ["Développeur Frontend"]
      priorite: "Moyenne"
  message_formation: "Un bundle JavaScript de 2Mo sur mobile 3G, c'est 10 secondes de chargement et une batterie qui se vide. Le frontend a un impact direct sur chaque utilisateur à chaque visite."
```

### Thématique 07 — Backend

```yaml
thematique:
  numero: "07"
  nom: "Backend"
  nombre_criteres: 9
  profils_principaux: ["Développeur Backend", "DBA", "Tech Lead"]
  description: "Optimiser les traitements serveur, les requêtes base de données et les API"
  criteres_exemples:
    - intitule: "Utiliser un système de cache serveur"
      objectif: "Éviter de recalculer ou re-requêter des données identiques à chaque appel"
      moyen_test: "Vérifier la présence d'un cache (Redis, Memcached, cache HTTP) sur les endpoints fréquents"
      profils: ["Développeur Backend", "Architecte"]
      priorite: "Haute"
    - intitule: "Optimiser les requêtes aux bases de données"
      objectif: "Les requêtes non optimisées sont le premier poste de consommation CPU serveur"
      moyen_test: "Identifier les requêtes N+1, les full table scans, les index manquants (EXPLAIN ANALYZE)"
      profils: ["Développeur Backend", "DBA"]
      priorite: "Haute"
    - intitule: "Limiter le volume de données retournées par les API"
      objectif: "Retourner uniquement les champs nécessaires réduit la sérialisation et le trafic"
      moyen_test: "Vérifier l'absence de SELECT *, la pagination des listes, la projection des champs"
      profils: ["Développeur Backend"]
      priorite: "Haute"
  message_formation: "Un problème N+1 non détecté sur un endpoint appelé 1 million de fois par jour, c'est potentiellement 999 millions de requêtes inutiles. Le backend est le multiplicateur d'impact le plus puissant."
```

### Thématique 08 — Hébergement

```yaml
thematique:
  numero: "08"
  nom: "Hébergement"
  nombre_criteres: 7
  profils_principaux: ["Développeur", "DevOps", "Architecte", "Chef de projet"]
  description: "Choisir et configurer l'hébergement pour minimiser l'empreinte énergétique"
  criteres_exemples:
    - intitule: "Choisir un hébergeur qui publie son bilan carbone"
      objectif: "La transparence des hébergeurs permet de faire des choix éclairés"
      moyen_test: "Vérifier la disponibilité d'un rapport environnemental public de l'hébergeur"
      profils: ["Chef de projet", "Architecte", "DevOps"]
      priorite: "Haute"
      note: "AWS, Azure, GCP publient tous leurs bilans — les hébergeurs sans rapport sont à éviter"
    - intitule: "Utiliser des ressources serverless ou auto-scalables"
      objectif: "Payer et consommer uniquement ce qu'on utilise réellement"
      moyen_test: "Vérifier que les ressources s'adaptent à la charge (pas de serveur allumé à vide)"
      profils: ["Architecte", "DevOps"]
      priorite: "Moyenne"
  message_formation: "Héberger en France avec EDF (mix nucléaire/renouvelable) vs en Virginie (mix charbon) peut multiplier par 10 l'empreinte carbone d'une même instance. Le choix de région est un critère environnemental."
```

### Thématique 09 — Algorithmie / IA

```yaml
thematique:
  numero: "09"
  nom: "Algorithmie / Intelligence Artificielle"
  nombre_criteres: 6
  profils_principaux: ["Développeur", "Data Scientist", "Tech Lead", "Tous"]
  description: "Choisir les algorithmes et modèles les moins coûteux adaptés au besoin réel"
  nouveaute: "Thématique ajoutée dans la version 2024 — absente de la v1 2022"
  criteres_exemples:
    - intitule: "Choisir le modèle IA le moins coûteux adapté au besoin"
      objectif: "Un LLM 70B pour une tâche faisable par un modèle 7B consomme 10x plus inutilement"
      moyen_test: "Documenter le choix du modèle avec justification du ratio performance/empreinte"
      profils: ["Développeur", "Data Scientist", "Tech Lead"]
      priorite: "Haute"
    - intitule: "Limiter la fréquence des appels aux modèles IA"
      objectif: "Chaque inférence a un coût énergétique — les appels inutiles doivent être évités"
      moyen_test: "Vérifier la présence d'un cache sur les résultats d'inférence pour des inputs identiques"
      profils: ["Développeur"]
      priorite: "Haute"
    - intitule: "Évaluer l'empreinte de l'entraînement des modèles"
      objectif: "L'entraînement d'un LLM peut émettre autant que plusieurs allers-retours transatlantiques"
      moyen_test: "Documenter l'empreinte d'entraînement avec des outils comme CodeCarbon"
      profils: ["Data Scientist", "ML Engineer"]
      priorite: "Moyenne"
  message_formation: "Avec la démocratisation de l'IA, cette thématique va devenir la plus critique. Appeler GPT-4 pour reformater une date ou trier une liste — c'est utiliser une pelleteuse pour déplacer un crayon."
```

---

## 2.3 — Comment lire et utiliser une fiche critère

### Exemple complet — Critère Backend

```yaml
exemple_fiche_complete:
  numero: "7.3"
  intitule: "Mettre en cache les données calculées côté serveur"
  thematique: "Backend"
  objectif: "Éviter de recalculer des données identiques à chaque requête, ce qui sollicite inutilement le CPU et la mémoire"
  critere: "Les données fréquemment accédées et peu variables sont mises en cache avec une durée d'expiration adaptée"
  moyen_test:
    - "Vérifier la présence d'un cache applicatif (Redis, Memcached, Ehcache)"
    - "Vérifier les en-têtes HTTP Cache-Control sur les réponses API appropriées"
    - "Mesurer le cache hit rate — un taux < 50% sur des données stables indique un problème de configuration"
  profils: ["Développeur Backend", "Architecte"]
  priorite: "Haute"
  conformite: "Conforme / Non conforme / Non applicable"
  exemple_NC: "Un endpoint /api/dashboard/stats qui recalcule toutes les statistiques depuis la BDD à chaque appel, sans aucun cache"
  exemple_C: "Le même endpoint avec un cache Redis TTL 5 minutes — 99% des appels ne touchent pas la BDD"
```

### Exercice rapide (5 min) — lecture de fiche

```yaml
exercice_lecture_fiche:
  consigne: "En groupes de 3-4 personnes, lire la fiche critère distribuée et répondre en 2 minutes : Que faut-il faire concrètement ? Comment le tester ? Qui est responsable dans votre équipe ?"
  fiches_distribuees:
    - thematique: "Frontend"
      intitule: "Minimiser le nombre de requêtes HTTP"
      pour_profil: "Dev / QA"
    - thematique: "Spécification"
      intitule: "Limiter les fonctionnalités aux besoins réels"
      pour_profil: "Analyste / QA"
    - thematique: "Stratégie"
      intitule: "Désigner un référent écoconception"
      pour_profil: "Chef de projet / Manager"
```

### Matrice profils × thématiques

```yaml
matrice_profils_thematiques:
  legende:
    - code: "★★"
      signification: "Thématique principale — impact direct"
    - code: "★"
      signification: "Thématique secondaire — impact indirect"
    - code: "—"
      signification: "Peu concerné"
  profils:
    - profil: "Développeur Backend"
      thematiques:
        "01-Stratégie": "★"
        "02-Spécification": "—"
        "03-Architecture": "★★"
        "04-UX": "—"
        "05-Contenus": "★"
        "06-Frontend": "—"
        "07-Backend": "★★"
        "08-Hébergement": "★"
        "09-Algorithmie": "★★"

    - profil: "Développeur Frontend"
      thematiques:
        "01-Stratégie": "★"
        "02-Spécification": "—"
        "03-Architecture": "★"
        "04-UX": "★★"
        "05-Contenus": "★★"
        "06-Frontend": "★★"
        "07-Backend": "—"
        "08-Hébergement": "—"
        "09-Algorithmie": "★"

    - profil: "QA / Testeur"
      thematiques:
        "01-Stratégie": "★"
        "02-Spécification": "★★"
        "03-Architecture": "—"
        "04-UX": "★★"
        "05-Contenus": "★"
        "06-Frontend": "★"
        "07-Backend": "★"
        "08-Hébergement": "—"
        "09-Algorithmie": "—"

    - profil: "Analyste / PO"
      thematiques:
        "01-Stratégie": "★★"
        "02-Spécification": "★★"
        "03-Architecture": "★"
        "04-UX": "★★"
        "05-Contenus": "★★"
        "06-Frontend": "—"
        "07-Backend": "—"
        "08-Hébergement": "—"
        "09-Algorithmie": "★"

    - profil: "Chef de projet / Manager"
      thematiques:
        "01-Stratégie": "★★"
        "02-Spécification": "★★"
        "03-Architecture": "★"
        "04-UX": "—"
        "05-Contenus": "—"
        "06-Frontend": "—"
        "07-Backend": "—"
        "08-Hébergement": "★★"
        "09-Algorithmie": "★"
```
