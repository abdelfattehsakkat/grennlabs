# Plan de cours — Green IT & Écoconception Numérique (RGESN)

---

## Métadonnées

```yaml
---
id: plan-de-cours
version: 1.0
date: 2025-01
auteur: Formateur interne
duree_totale: 7h (8h30 → 16h30)
format: présentiel ou visio
public_cible: Développeurs (60%), QA / Analystes (30%), Chefs de projet / Managers (10%)
niveau_entree: Aucun prérequis
niveau_sortie:
  - sensibilise: 70%  # Comprendre les enjeux, connaître le RGESN
  - outille: 30%      # Repartir avec des outils utilisables dès le lendemain
referentiel: RGESN 2024 (Arcep / DINUM / MiNumEco)
effectif_recommande: 8 à 20 participants
materiel_formateur:
  - Slides (deck unique)
  - Tableur RGESN officiel (.xlsx Arcep)
  - NumEcoDiag (outil en ligne DINUM)
  - Fiche plan d'action individuel
materiel_stagiaire:
  - Support PDF téléchargeable (plateforme)
  - Accès plateforme quiz/labs
  - Tableur RGESN (.xlsx)
---
```

---

## Vue d'ensemble de la journée

| Horaire | Bloc | Type | Durée | Profils |
|---|---|---|---|---|
| 08h30 | Accueil & icebreaker | Quiz | 20 min | Tous |
| 08h50 | Module 01 — Enjeux du numérique | Théorie | 45 min | Tous |
| 09h35 | Module 02 — Le RGESN en détail | Théorie | 50 min | Tous |
| 10h25 | Pause | — | 15 min | — |
| 10h40 | Lab 01 — Audit collectif RGESN | Atelier | 1h15 | Tous (groupes mixtes) |
| 11h55 | Quiz mi-journée | Quiz | 15 min | Tous |
| 12h10 | Synthèse tronc commun | Théorie | 10 min | Tous |
| 12h20 | Déjeuner | — | 1h10 | — |
| 13h30 | Module 03 — Mesurer l'empreinte | Théorie | 40 min | Tous |
| 14h10 | Lab 02 — Atelier pratique multi-profils | Atelier | 1h15 | Tous (exemples par rôle) |
| 15h25 | Pause | — | 10 min | — |
| 15h35 | Plan d'action individuel | Exercice | 20 min | Tous |
| 15h55 | Restitution croisée + quiz final | Quiz + échange | 25 min | Tous |
| 16h20 | Évaluation de la formation | Formulaire | 10 min | Tous |
| 16h30 | Fin | — | — | — |

---

## Bloc 0 — Accueil & icebreaker

```yaml
id: bloc-00-icebreaker
horaire: 08h30 → 08h50
duree: 20 min
type: quiz
objectif: Créer l'engagement dès les premières minutes. Déconstruire les idées reçues sur l'empreinte numérique.
plateforme: quiz-icebreaker
```

### Déroulé formateur

1. **Accueil** (5 min)
   - Tour de table rapide : prénom, rôle, une attente pour la journée
   - Présentation du programme et des règles du jeu (téléphones OK pour la plateforme)

2. **Quiz icebreaker** (10 min)
   - 5 questions sur la plateforme, réponses individuelles
   - Correction collective avec chiffres sources (Arcep, ADEME, The Shift Project)
   - L'effet de surprise est intentionnel — ne pas révéler les réponses avant le quiz

3. **Transition** (5 min)
   - "Ces chiffres montrent que nos intuitions sont mauvaises. L'objectif de la journée : construire les bons réflexes."

### Questions icebreaker (→ fichier quiz/quiz-icebreaker.md)

| # | Question | Bonne réponse | Chiffre source |
|---|---|---|---|
| 1 | Quelle part de l'empreinte d'un smartphone vient de la fabrication ? | 80% | ADEME 2022 |
| 2 | Quel équipement consomme le plus pendant 1h de streaming vidéo ? | L'écran utilisateur | The Shift Project |
| 3 | Le numérique représente combien % des émissions mondiales de GES ? | ~4% (en hausse) | GreenIT.fr 2023 |
| 4 | Combien de critères contient le RGESN 2024 ? | 78 | Arcep |
| 5 | Un email sans pièce jointe envoyé à 10 personnes = combien de gCO₂e ? | ~4 gCO₂e | ADEME |

---

## Module 01 — Les enjeux du numérique responsable

```yaml
id: module-01-enjeux
horaire: 08h50 → 09h35
duree: 45 min
type: theorie
objectif: Comprendre l'impact réel du numérique, la règle des 80/20, les scopes GHG Protocol, et le cadre réglementaire français (loi REEN, CSRD).
profils: all
slides: 01-enjeux (15 slides estimés)
ressources:
  - GreenIT.fr — Rapport numérique responsable 2023
  - ADEME — Empreinte environnementale du numérique en France
  - Arcep — Rapport sur l'empreinte environnementale du numérique 2023
```

### Plan du module

#### 1.1 — L'empreinte réelle du numérique (15 min)

**Points clés à transmettre :**
- Le numérique = ~4% des émissions mondiales de GES, en croissance (+8%/an)
- Règle des 80/20 : 80% de l'empreinte vient de la **fabrication** des équipements, pas de l'usage
- Les 3 postes dominants : terminaux utilisateurs > réseaux > datacenters
- Contre-intuitif : la 5G, le cloud et le streaming ne sont pas les premiers responsables

**Exemples concrets à utiliser :**
- 1 smartphone neuf = 70 kgCO₂e (fabrication) vs 1,5 kgCO₂e/an (usage)
- 1h de visioconférence = 150 gCO₂e (équivalent 800m en voiture thermique)
- 1 email avec pièce jointe 1Mo = 19 gCO₂e

**Message formateur :**
> "Le levier n°1 ce n'est pas d'éteindre les serveurs. C'est de garder les équipements plus longtemps et d'éviter de créer des services inutiles."

#### 1.2 — Les scopes GHG Protocol appliqués au SI (15 min)

**Points clés à transmettre :**
- Scope 1 : émissions directes (datacenter on-premise, générateurs)
- Scope 2 : électricité achetée (mix énergétique du pays hébergeur)
- Scope 3 : tout le reste — fabrication terminaux, réseau, cloud, déplacements (>80% du total)
- Pour une ESN : l'essentiel est en scope 3, donc souvent ignoré

**Exercice rapide (5 min) :**
- Afficher 8 postes d'un SI fictif, demander oralement à quelle scope ils appartiennent
- Exemples : laptop d'un salarié (S3), facture électrique datacenter (S2), vol Paris-Lyon pour une mission (S3), serveur on-premise (S1)

**Message formateur :**
> "Si votre ESN ne mesure que ses factures d'électricité, elle voit moins de 20% de son empreinte réelle."

#### 1.3 — Le cadre réglementaire français (15 min)

**Points clés à transmettre :**

| Texte | Contenu | Impact ESN |
|---|---|---|
| **Loi REEN** (2021) | Obligations progressives de déclaration d'écoconception pour services publics | Les clients publics vont l'exiger dans les AO |
| **RGESN** (2022 → 2024) | Référentiel technique de 78 critères, porté par Arcep/DINUM/MiNumEco | Le standard de facto en France |
| **CSRD** (2024) | Directive européenne reporting ESG obligatoire pour grandes entreprises | Les grandes ESN doivent reporter leur empreinte numérique |
| **Directive Ecodesign** (UE) | Obligations sur le matériel mis sur le marché | Impact indirect sur les choix d'équipements |

**Message formateur :**
> "La loi REEN ne touche pas encore les ESN directement. Mais vos clients publics, eux, doivent publier une déclaration d'écoconception. Ils vont vous la demander dans les AO. C'est maintenant qu'il faut se former."

---

## Module 02 — Le RGESN : référentiel et 9 thématiques

```yaml
id: module-02-rgesn
horaire: 09h35 → 10h25
duree: 50 min
type: theorie
objectif: Comprendre la structure du RGESN, ses 9 thématiques, la logique de conformité, et identifier quels critères concernent chaque profil.
profils: all
slides: 02-rgesn (20 slides estimés)
ressources:
  - RGESN 2024 PDF (Arcep)
  - Tableur autoévaluation .xlsx (Arcep)
  - NumEcoDiag (DINUM) — outil en ligne
```

### Plan du module

#### 2.1 — Qu'est-ce que le RGESN ? (10 min)

**Points clés :**
- Porté par : Arcep + DINUM + MiNumEco + INR
- Version 2024 : 78 critères, 9 thématiques (vs 79 critères, 8 thématiques en v1 2022)
- Nouveauté 2024 : thématique Algorithmie / IA ajoutée
- Chaque critère a : un intitulé, un objectif, des moyens de test, un niveau de priorité
- 3 niveaux de conformité : Conforme / Non conforme / Non applicable

**Ce que ce n'est PAS :**
- Ce n'est pas une certification (pas de label RGESN)
- Ce n'est pas obligatoire pour les ESN privées (encore)
- Ce n'est pas le GR491 (516 critères, plus large, plus RSE)

#### 2.2 — Tour des 9 thématiques (25 min)

**Format : 2-3 min par thématique, 1 critère exemple par thématique**

| # | Thématique | Critères | Profils clés | Critère exemple |
|---|---|---|---|---|
| 01 | Stratégie | ~8 | CP, Manager, Tous | Désigner un référent écoconception dans l'équipe |
| 02 | Spécification | ~8 | Analyste, QA, PO | Limiter les fonctionnalités aux besoins réels |
| 03 | Architecture | ~9 | Dev, Tech Lead | Choisir une architecture adaptée à la charge réelle |
| 04 | UX / Interface | ~9 | Dev Frontend, UX | Ne pas déclencher d'actions automatiques sans action utilisateur |
| 05 | Contenus | ~7 | Dev, Analyste | Optimiser le poids des médias avant mise en ligne |
| 06 | Frontend | ~9 | Dev Frontend | Minimiser le nombre de requêtes HTTP |
| 07 | Backend | ~9 | Dev Backend, DBA | Utiliser un système de cache serveur |
| 08 | Hébergement | ~7 | Dev, DevOps | Choisir un hébergeur avec bilan carbone publié |
| 09 | Algorithmie / IA | ~6 | Dev, Data, Tous | Choisir le modèle le moins coûteux adapté au besoin |

**Message formateur par profil :**
- Dev : "Vos thématiques principales sont 03, 04, 05, 06, 07 — c'est là que votre impact est le plus direct"
- QA/Analyste : "Vous êtes en première ligne sur 01, 02, 04 — la sobriété fonctionnelle se joue dans les specs"
- CP/Manager : "Votre levier est la thématique 01 — sans sponsor, rien ne se met en place durablement"

#### 2.3 — Comment lire une fiche critère (10 min)

**Décortiquer une fiche ensemble (exemple : critère Backend)**

Structure d'une fiche RGESN :
```
Intitulé        : Mettre en cache les données calculées
Thématique      : Backend
Objectif        : Éviter de recalculer des données identiques à chaque requête
Critère         : Les données fréquemment accédées sont mises en cache
Moyen de test   : Vérifier la présence d'en-têtes Cache-Control ou d'un cache Redis/Memcached
Priorité        : Haute
Profils         : Développeur Backend, Architecte
```

**Exercice rapide (5 min) :**
- Distribuer 3 fiches critères (une par profil dans la salle)
- Chaque groupe lit sa fiche et explique en 1 phrase ce qu'il faut faire concrètement

---

## Lab 01 — Audit collectif RGESN

```yaml
id: lab-01-audit-rgesn
horaire: 10h40 → 11h55
duree: 1h15
type: atelier
objectif: Savoir utiliser le tableur RGESN officiel pour évaluer un service numérique fictif. Comprendre la logique Conforme / Non conforme / N/A.
profils: all (groupes mixtes de 3-4 personnes)
materiel:
  - Tableur RGESN .xlsx (Arcep) — une copie par groupe
  - Fiche de description du service fictif "MonServicePublicFr" (→ lab/lab-01-audit-rgesn.md)
plateforme: lab-audit-rgesn
```

### Déroulé

1. **Présentation du service fictif** (5 min)
   - "MonServicePublicFr" : portail de demande de documents administratifs
   - Stack : React frontend, Spring Boot backend, PostgreSQL, hébergé AWS Paris
   - 50 000 utilisateurs/mois, mobile-first

2. **Audit en groupes** (45 min)
   - Chaque groupe évalue 12 critères RGESN (sélection cross-thématiques)
   - Renseigner : Conforme / Non conforme / N/A + justification courte
   - Les 12 critères sont choisis pour être ambigus — débat attendu

3. **Restitution et débat** (20 min)
   - Chaque groupe présente 2 critères qu'ils ont trouvés non conformes
   - Le formateur révèle les "bonnes réponses" et explique les cas limites
   - Point clé : "Il n'y a pas toujours une réponse unique — le RGESN demande de la contextualisation"

4. **Transition** (5 min)
   - "Vous venez de faire votre premier audit RGESN. C'est exactement ce que fait un référent écoconception dans une équipe."

### Les 12 critères du lab (→ fichier lab/lab-01-audit-rgesn.md)

| # | Critère | Thématique | Indice formateur |
|---|---|---|---|
| 1 | Un référent écoconception est désigné | Stratégie | Non conforme — personne n'est désigné |
| 2 | Les fonctionnalités sont justifiées par un besoin réel | Spécification | Ambigu — à débattre |
| 3 | L'architecture est adaptée à la charge réelle | Architecture | Conforme — dimensionnement correct |
| 4 | Pas d'actions automatiques sans action utilisateur | UX | Non conforme — autoplay carousel |
| 5 | Les images sont optimisées avant mise en ligne | Contenus | Non conforme — PNG 2Mo détecté |
| 6 | Le nombre de requêtes HTTP est minimisé | Frontend | Ambigu — dépend de la mesure |
| 7 | Un système de cache serveur est utilisé | Backend | Conforme — Redis en place |
| 8 | Les requêtes base de données sont optimisées | Backend | Non conforme — N+1 détecté |
| 9 | L'hébergeur publie son bilan carbone | Hébergement | Conforme — AWS publie ses données |
| 10 | La durée de conservation des données est définie | Backend | Non conforme — pas de politique |
| 11 | Le service fonctionne sur des équipements anciens | UX | Ambigu — non testé |
| 12 | L'empreinte du service est mesurée et suivie | Stratégie | Non conforme — aucun indicateur |

---

## Quiz mi-journée

```yaml
id: quiz-mi-journee
horaire: 11h55 → 12h10
duree: 15 min
type: quiz
objectif: Consolider les acquis du tronc commun avant le déjeuner. Identifier les points à revoir.
profils: all
plateforme: quiz-mi-journee
```

### 5 questions (→ fichier quiz/quiz-mi-journee.md)

| # | Question | Réponse | Objectif pédagogique |
|---|---|---|---|
| 1 | Citez les 3 grands postes d'émission du numérique dans l'ordre | Terminaux > Réseaux > Datacenters | Ancrer la règle des 80/20 |
| 2 | Quel scope GHG couvre la fabrication des laptops des salariés ? | Scope 3 | Scopes appliqués au SI |
| 3 | Combien de thématiques contient le RGESN 2024 ? | 9 | Structure RGESN |
| 4 | Quelle est la nouveauté du RGESN 2024 par rapport à 2022 ? | Thématique Algorithmie / IA | Veille réglementaire |
| 5 | Quelle loi française crée une obligation de déclaration d'écoconception ? | Loi REEN | Cadre réglementaire |

---

## Module 03 — Mesurer l'empreinte numérique

```yaml
id: module-03-mesurer
horaire: 13h30 → 14h10
duree: 40 min
type: theorie
objectif: Connaître les outils de mesure disponibles selon son rôle. Comprendre ce qu'on mesure et ce que ça signifie.
profils: all (exemples différenciés par rôle)
slides: 03-mesurer (12 slides estimés)
ressources:
  - EcoIndex (ecoindex.fr)
  - Lighthouse (intégré Chrome DevTools)
  - NumEcoDiag (DINUM)
  - CodeCarbon (Python)
  - Cloud Carbon Footprint (cloud)
```

### Plan du module

#### 3.1 — Ce qu'on mesure et pourquoi (10 min)

**Points clés :**
- On ne peut améliorer que ce qu'on mesure
- Deux types de mesures : **impact environnemental** (CO₂e) vs **proxy technique** (poids de page, nb requêtes, score EcoIndex)
- Les proxies techniques sont plus actionnables au quotidien — ils sont dans les mains des devs

**Tableau des métriques clés :**

| Métrique | Unité | Outil | Profil |
|---|---|---|---|
| Score EcoIndex | A→G | ecoindex.fr | Dev Frontend, QA |
| Poids de page | Ko | Lighthouse, DevTools | Dev Frontend |
| Nombre de requêtes HTTP | Nombre | DevTools | Dev Frontend |
| Performance Lighthouse | 0-100 | Lighthouse | Dev, QA |
| Empreinte CO₂ du code | gCO₂e | CodeCarbon | Dev Backend, Data |
| Empreinte cloud | tCO₂e/mois | Cloud Carbon Footprint | DevOps, CP |
| Score RGESN | % conformité | Tableur Arcep / NumEcoDiag | Tous |

#### 3.2 — Les outils par profil (20 min)

**Pour les développeurs :**
- **EcoIndex** : score A→G basé sur DOM, requêtes, poids. Gratuit, en ligne, API disponible
- **Lighthouse** : intégré Chrome, donne Performance + accessibilité. Facilement intégrable en CI
- **CodeCarbon** : librairie Python qui mesure la conso GPU/CPU d'un script ML
- **Scaphandre** : mesure conso énergétique d'un process Linux (Rust, open source)

**Pour les QA / Analystes :**
- **NumEcoDiag** : questionnaire guidé basé sur le RGESN, produit un score et des recommandations
- **EcoIndex** : utilisable pour tester une URL avant/après une fonctionnalité
- **Lighthouse CI** : peut être ajouté comme critère d'acceptance dans une pipeline

**Pour les CP / Managers :**
- **Cloud Carbon Footprint** : tableau de bord d'empreinte AWS/Azure/GCP
- **NumEcoDiag** : produit un rapport exportable pour reporting DSI
- **Bilan GES numérique** : outil ADEME pour un bilan à l'échelle d'une organisation

#### 3.3 — Démo live : EcoIndex + NumEcoDiag (10 min)

**Formateur fait en direct :**
1. Ouvrir ecoindex.fr, entrer l'URL d'un site connu (ex : site institutionnel de l'ESN)
2. Lire le score ensemble, expliquer les 3 variables (DOM, requêtes, poids)
3. Ouvrir NumEcoDiag, montrer les 5 premières questions
4. "Voilà votre outil de premier audit — gratuit, officiel, 20 minutes"

---

## Lab 02 — Atelier pratique multi-profils

```yaml
id: lab-02-pratique
horaire: 14h10 → 15h25
duree: 1h15
type: atelier
objectif: Appliquer les acquis de la journée sur un cas concret ancré dans son métier quotidien. Repartir avec un livrable réel.
profils: all (groupes homogènes par profil recommandés)
plateforme: lab-pratique
```

### Déroulé

1. **Constitution des groupes** (5 min)
   - Groupes homogènes par profil si effectif le permet
   - Sinon groupes mixtes avec rôles attribués

2. **Exercice central** (50 min)
   - Chaque groupe travaille sur le même service fictif "MonServicePublicFr"
   - Mais avec un angle différent selon le rôle

3. **Restitution** (20 min)
   - 5 min par groupe, présentation du livrable
   - Débat croisé : "comment ces trois angles se complètent-ils ?"

### Exercices par profil (même service fictif, angles différents)

#### Angle Développeur
**Consigne :** À partir de l'extrait de code fourni (Spring Boot + React), identifier 3 non-conformités RGESN et proposer la correction.
- Anti-pattern 1 : requête N+1 JPA → une seule requête avec JOIN FETCH
- Anti-pattern 2 : image PNG 2Mo non compressée → WebP + lazy loading
- Anti-pattern 3 : appel API à chaque render → mise en cache avec useMemo / Redis
- **Livrable :** Commentaires de MR GitLab avec référence au critère RGESN concerné

#### Angle QA / Analyste
**Consigne :** Réécrire 3 user stories du backlog fourni en ajoutant des critères d'acceptance environnementaux.
- US1 : "Afficher la liste des demandes" → ajouter critère de poids de page et nb requêtes
- US2 : "Uploader un document" → ajouter critère de compression automatique
- US3 : "Recevoir une notification" → ajouter critère de fréquence et de canal (éviter email inutile)
- **Livrable :** 3 user stories en format Gherkin avec critères d'acceptance mesurables

#### Angle Chef de projet / Manager
**Consigne :** Compléter la section Stratégie de la déclaration d'écoconception du service fictif.
- Identifier le référent écoconception de l'équipe
- Définir 3 KPIs environnementaux à suivre trimestriellement
- Rédiger l'engagement de l'équipe en 5 lignes
- **Livrable :** Section Stratégie de la déclaration d'écoconception (template RGESN officiel)

---

## Plan d'action individuel

```yaml
id: plan-action-individuel
horaire: 15h35 → 15h55
duree: 20 min
type: exercice
objectif: Transformer les apprentissages en engagements concrets et nominatifs.
profils: all
plateforme: plan-action (formulaire téléchargeable / sauvegardable)
```

### Structure de la fiche (→ plateforme : formulaire)

```
Nom / Prénom :
Rôle :
Date :

Dans les 7 prochains jours, je vais :
→ Action 1 : _______________________________________________
   Critère RGESN concerné : ___
   Comment je mesure que c'est fait : ___

Dans les 30 prochains jours, je vais :
→ Action 2 : _______________________________________________
   Critère RGESN concerné : ___
   Comment je mesure que c'est fait : ___

→ Action 3 : _______________________________________________
   Critère RGESN concerné : ___
   Comment je mesure que c'est fait : ___

Une chose que je vais partager à mon équipe dès demain :
→ _______________________________________________
```

**Exemples d'actions par profil :**

| Profil | Action 7 jours | Action 30 jours |
|---|---|---|
| Dev | Ajouter EcoIndex dans ma pipeline de test locale | Ouvrir une MR avec checklist RGESN sur un projet en cours |
| QA | Ajouter un critère de poids de page dans ma prochaine US | Proposer NumEcoDiag à mon équipe pour auditer notre service |
| CP | Désigner un référent écoconception dans mon équipe | Inclure un critère RGESN dans notre Definition of Done |

---

## Quiz final

```yaml
id: quiz-final
horaire: 15h55 → 16h15
duree: 20 min
type: quiz
objectif: Évaluer les acquis de la journée. Donner un score individuel. Servir de base à l'attestation de formation.
profils: all
plateforme: quiz-final
scoring: 10 questions, 1 point chacune. Score affiché à la fin. Seuil de réussite : 6/10.
```

### 10 questions (→ fichier quiz/quiz-final.md)

| # | Question | Réponse | Module source |
|---|---|---|---|
| 1 | Quel % de l'empreinte d'un smartphone vient de la fabrication ? | 80% | Module 01 |
| 2 | Citez 2 des 9 thématiques du RGESN | Parmi les 9 | Module 02 |
| 3 | Quelle thématique a été ajoutée dans le RGESN 2024 ? | Algorithmie / IA | Module 02 |
| 4 | Quel outil gratuit permet de scorer l'écoconception d'une URL ? | EcoIndex | Module 03 |
| 5 | Un cache Redis répond à quelle thématique RGESN ? | Backend (07) | Lab 01 |
| 6 | La loi REEN vise en priorité quels services ? | Services publics | Module 01 |
| 7 | Quel scope couvre les laptops des salariés d'une ESN ? | Scope 3 | Module 01 |
| 8 | Que signifie N/A dans le tableur RGESN ? | Non applicable | Lab 01 |
| 9 | Quel outil DINUM est basé sur le RGESN et génère un rapport ? | NumEcoDiag | Module 03 |
| 10 | Citez 1 critère d'acceptance environnemental applicable à une US | Exemple valide | Lab 02 |

---

## Évaluation de la formation

```yaml
id: evaluation-formation
horaire: 16h20 → 16h30
duree: 10 min
type: formulaire
objectif: Recueillir le feedback à chaud pour améliorer les prochaines sessions.
profils: all
plateforme: evaluation
```

### Grille d'évaluation (→ plateforme : formulaire noté)

```
1. Qualité du contenu pédagogique          ★ ★ ★ ★ ★
2. Clarté des explications du formateur    ★ ★ ★ ★ ★
3. Pertinence des exercices pratiques      ★ ★ ★ ★ ★
4. Utilité pour mon travail quotidien      ★ ★ ★ ★ ★
5. Qualité de la plateforme (quiz/labs)    ★ ★ ★ ★ ★

Ce que j'ai le plus appris aujourd'hui :
→ _________________________________________________

Ce que j'aurais voulu approfondir :
→ _________________________________________________

Je recommanderais cette formation à un collègue : Oui / Non / Peut-être
```

---

## Fichiers à produire (backlog contenu)

| Fichier | Statut | Priorité |
|---|---|---|
| `plan-de-cours.md` | ✅ Ce fichier | — |
| `module-01-enjeux.md` | À faire | Haute |
| `module-02-rgesn.md` | À faire | Haute |
| `module-03-mesurer.md` | À faire | Haute |
| `quiz/quiz-icebreaker.md` | À faire | Haute |
| `quiz/quiz-mi-journee.md` | À faire | Haute |
| `quiz/quiz-final.md` | À faire | Haute |
| `labs/lab-01-audit-rgesn.md` | À faire | Haute |
| `labs/lab-02-pratique.md` | À faire | Haute |
| `labs/lab-02-dev-extrait-code.md` | À faire | Moyenne |
| `labs/lab-02-qa-backlog.md` | À faire | Moyenne |
| `labs/lab-02-cp-declaration.md` | À faire | Moyenne |
| `ressources/liens-officiels.md` | À faire | Basse |
| `ressources/glossaire.md` | À faire | Basse |

---

## Notes formateur

### Gestion de la diversité des profils en salle

- **Si 100% devs** : passer 10 min de plus sur les thématiques 06/07 (Frontend/Backend), réduire la partie réglementaire à 10 min
- **Si peu de devs** : remplacer l'angle Dev du Lab 02 par un deuxième angle QA ou CP
- **Si groupe homogène senior** : les quiz peuvent être sautés au profit de débats — les seniors sont souvent déjà convaincus, ils ont besoin d'outils pas de sensibilisation
- **Si groupe 100% managers** : inverser Module 02 et Module 01 — commencer par le réglementaire (loi REEN, CSRD) qui est leur entrée naturelle

### Points de vigilance

- Ne pas promettre que le RGESN est obligatoire pour les ESN privées — c'est faux aujourd'hui
- Ne pas dénigrer les fournisseurs cloud (AWS, Azure) — ils publient leurs bilans carbone, c'est mieux que beaucoup d'acteurs on-premise
- Le RGESN n'est pas une checklist magique — insister sur la contextualisation et le jugement
- Éviter le "green washing" pédagogique : ne pas laisser croire qu'éteindre son écran le soir résout le problème

### Ressources officielles (liens vérifiés)

- RGESN 2024 PDF : arcep.fr (section Publications)
- Tableur autoévaluation .xlsx et .ods : arcep.fr (même page)
- NumEcoDiag : ecoresponsable.numerique.gouv.fr/numecodiag
- EcoIndex : ecoindex.fr
- Base Carbone ADEME : bilans-ges.ademe.fr
