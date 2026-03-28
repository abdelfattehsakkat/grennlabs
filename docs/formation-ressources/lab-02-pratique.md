---
id: lab-02-pratique
titre: "Lab 02 — Atelier pratique multi-profils"
type: lab
moment: "apres-midi"
duree: 75
profils: [all]
groupes: "Homogènes par profil si possible, sinon mixtes avec rôles attribués"
objectif: "Appliquer les acquis de la journée sur un cas concret ancré dans le quotidien de chaque profil. Produire un livrable réel réutilisable."
service_fictif: "MonServicePublicFr (même que Lab 01)"
plateforme:
  composant: "LabPratique"
  fonctionnalites:
    - "Sélection du profil (Dev / QA-Analyste / CP-Manager)"
    - "Affichage de l'exercice correspondant"
    - "Éditeur de réponse avec sauvegarde"
    - "Affichage des livrables exemple formateur"
---

# Lab 02 — Atelier pratique multi-profils

## Structure de la session

```yaml
deroulement:
  - etape: "Constitution des groupes (5 min)"
    consigne: "Groupes homogènes par profil. Si trop peu d'un profil, les intégrer dans le groupe le plus proche et leur attribuer un rôle observateur-challengeur."

  - etape: "Exercice central par profil (50 min)"
    consigne: "Chaque groupe travaille sur son exercice. Même service fictif, angles différents. Produire le livrable demandé."

  - etape: "Restitution croisée (20 min)"
    consigne: "5 min par groupe. Présenter son livrable. Les autres groupes posent des questions. Le formateur anime le débat sur les complémentarités."
    question_relance: "Comment les actions de ce groupe facilitent-elles le travail des autres ?"
```

---

## Exercice Développeurs

```yaml
exercice_dev:
  titre: "Identifier et corriger des non-conformités RGESN dans le code"
  duree: 50
  profils: ["Développeur Backend", "Développeur Frontend", "Full Stack"]
  livrable: "Commentaires de Merge Request GitLab avec référence au critère RGESN et correction proposée"
  contexte: "Vous êtes développeur sur MonServicePublicFr. Un collègue a soumis une MR. Votre mission : identifier les non-conformités RGESN et commenter la MR comme vous le feriez en réalité."
```

### Extrait de code Backend (Spring Boot) à auditer

```java
// UserDemandeController.java
@RestController
@RequestMapping("/api/demandes")
public class UserDemandeController {

    @Autowired
    private DemandeRepository demandeRepository;

    @Autowired
    private StatutRepository statutRepository;

    // PROBLÈME 1 : Endpoint qui retourne toutes les colonnes sans pagination
    @GetMapping("/liste")
    public List<Demande> getAllDemandes() {
        return demandeRepository.findAll(); // SELECT * sans LIMIT
    }

    // PROBLÈME 2 : Requête N+1 — 1 requête par demande pour récupérer le statut
    @GetMapping("/liste-avec-statuts")
    public List<DemandeDto> getDemandesAvecStatuts() {
        List<Demande> demandes = demandeRepository.findAll();
        return demandes.stream()
            .map(d -> {
                Statut statut = statutRepository.findById(d.getStatutId()) // N requêtes !
                    .orElse(null);
                return new DemandeDto(d, statut);
            })
            .collect(Collectors.toList());
    }

    // PROBLÈME 3 : Calcul répété sans cache pour des données stables
    @GetMapping("/statistiques")
    public StatistiquesDto getStatistiques() {
        // Ce calcul lourd est refait à chaque appel — endpoint appelé toutes les 30s
        long totalDemandes = demandeRepository.count();
        long demandesEnCours = demandeRepository.countByStatut("EN_COURS");
        long demandesTerminees = demandeRepository.countByStatut("TERMINEE");
        long demandesRefusees = demandeRepository.countByStatut("REFUSEE");

        return new StatistiquesDto(totalDemandes, demandesEnCours,
                                   demandesTerminees, demandesRefusees);
    }
}
```

### Extrait de code Frontend (React) à auditer

```jsx
// PageAccueil.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import logoMini from './assets/logo-mini.png';      // 450 Ko PNG
import heroBanner from './assets/banner.png';        // 2.1 Mo PNG
import iconAccueil from './assets/icon-home.png';    // 89 Ko PNG

export default function PageAccueil() {
  const [stats, setStats] = useState(null);

  // PROBLÈME 4 : Appel API à chaque render, sans cache ni délai
  useEffect(() => {
    const fetchStats = async () => {
      const response = await axios.get('/api/demandes/statistiques');
      setStats(response.data);
    };
    fetchStats();
    // Polling toutes les 30 secondes — même si l'utilisateur ne regarde pas la page
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {/* PROBLÈME 5 : Image non optimisée, pas de lazy loading, pas de alt */}
      <img src={heroBanner} style={{ width: '100%' }} />

      {/* PROBLÈME 6 : Carousel auto-défilant sans contrôle utilisateur */}
      <Carousel autoPlay interval={2000} infiniteLoop showControls={false}>
        <div>Slide 1</div>
        <div>Slide 2</div>
        <div>Slide 3</div>
      </Carousel>

      {stats && <StatistiquesPanel data={stats} />}
    </div>
  );
}
```

### Livrables attendus — commentaires MR

```yaml
livrables_dev:
  format: "Commentaires de MR GitLab — un commentaire par problème identifié"
  structure_commentaire:
    - "Problème identifié (ce qui ne va pas)"
    - "Critère RGESN concerné (numéro + thématique)"
    - "Correction proposée (code ou configuration)"
    - "Impact estimé (pourquoi c'est important)"

  corrections_attendues:
    - probleme: "SELECT * sans pagination"
      critere_rgesn: "7 — Backend"
      correction: |
        // Ajouter pagination et projection des champs nécessaires uniquement
        @GetMapping("/liste")
        public Page<DemandeResumeDto> getAllDemandes(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
            return demandeRepository.findAll(PageRequest.of(page, size))
                .map(DemandeResumeDto::from);
        }
      impact: "Évite de charger des milliers de lignes inutilement. Réduit la mémoire JVM et la charge BDD."

    - probleme: "Requête N+1 sur les statuts"
      critere_rgesn: "7 — Backend"
      correction: |
        // Utiliser une JOIN FETCH dans le repository
        @Query("SELECT d FROM Demande d LEFT JOIN FETCH d.statut")
        List<Demande> findAllWithStatut();
        // ou avec @EntityGraph
        @EntityGraph(attributePaths = "statut")
        List<Demande> findAll();
      impact: "Passe de N+1 requêtes SQL à 1 seule. Sur 1000 demandes = 999 requêtes économisées par appel."

    - probleme: "Statistiques recalculées sans cache"
      critere_rgesn: "7 — Backend"
      correction: |
        @Cacheable(value = "statistiques", key = "'global'")
        @GetMapping("/statistiques")
        public StatistiquesDto getStatistiques() {
            // Même code — Spring Cache gère le cache automatiquement
        }
        // Dans application.yml : spring.cache.type=redis
        // TTL configuré à 5 minutes dans CacheConfig.java
      impact: "99% des appels ne touchent plus la BDD. Redis répond en <1ms vs 50-200ms BDD."

    - probleme: "Images PNG non optimisées"
      critere_rgesn: "5 — Contenus"
      correction: |
        <!-- Remplacer par WebP avec fallback PNG -->
        <picture>
          <source srcSet={heroBannerWebp} type="image/webp" />
          <img src={heroBannerFallback} alt="Portail des demandes administratives"
               loading="lazy" width="1200" height="400" />
        </picture>
        <!-- La bannière 2.1Mo PNG devient 200-400Ko WebP -->
      impact: "Réduction de 80-90% du poids de la bannière. Sur 50k utilisateurs/mois = économie massive de bande passante."

    - probleme: "Polling API toutes les 30s en background"
      critere_rgesn: "4 — UX/Interface"
      correction: |
        useEffect(() => {
          fetchStats(); // Chargement initial

          // Polling uniquement si la page est visible
          const handleVisibility = () => {
            if (document.visibilityState === 'visible') fetchStats();
          };
          document.addEventListener('visibilitychange', handleVisibility);

          // Augmenter l'intervalle à 5 minutes — les stats ne changent pas souvent
          const interval = setInterval(fetchStats, 300000);

          return () => {
            clearInterval(interval);
            document.removeEventListener('visibilitychange', handleVisibility);
          };
        }, []);
      impact: "De 120 appels/heure à 12/heure par utilisateur. Sur 1000 utilisateurs simultanés = 108 000 requêtes évitées par heure."

    - probleme: "Carousel autoplay sans contrôle"
      critere_rgesn: "4 — UX/Interface"
      correction: |
        <Carousel
          autoPlay={false}      // Désactiver l'autoplay par défaut
          infiniteLoop={false}
          showControls={true}   // Afficher les contrôles utilisateur
        >
      impact: "Supprime les animations CSS continues qui consomment du CPU. Améliore aussi l'accessibilité (WCAG 2.2.2)."
```

---

## Exercice QA / Analystes

```yaml
exercice_qa:
  titre: "Réécrire des user stories avec critères d'acceptance environnementaux"
  duree: 50
  profils: ["QA", "Testeur", "Analyste", "Product Owner"]
  livrable: "3 user stories réécrites en format Gherkin avec critères d'acceptance environnementaux mesurables"
  contexte: "Vous êtes QA/Analyste sur MonServicePublicFr. Le product owner vient de vous soumettre 3 user stories pour la prochaine sprint. Votre mission : enrichir chaque US avec des critères d'acceptance environnementaux."
```

### Backlog fourni — 3 user stories à enrichir

```yaml
user_stories_source:
  - id: "US-101"
    titre: "Afficher la liste des demandes en cours"
    enonce: "En tant que citoyen connecté, je veux voir la liste de toutes mes demandes en cours, afin de suivre leur avancement."
    criteres_acceptance_actuels:
      - "La liste affiche toutes les demandes avec leur statut"
      - "La liste est triable par date de dépôt"
      - "Le temps de chargement est acceptable"
    problemes_env_identifies:
      - "Pas de pagination définie"
      - "Seuil de performance non chiffré"
      - "Pas de critère sur le poids ou les requêtes"

  - id: "US-102"
    titre: "Uploader un document justificatif"
    enonce: "En tant que citoyen, je veux pouvoir uploader un document justificatif pour ma demande, afin de compléter mon dossier."
    criteres_acceptance_actuels:
      - "L'utilisateur peut uploader un fichier PDF ou image"
      - "La taille maximale est de 10 Mo"
      - "Un message de confirmation est affiché"
    problemes_env_identifies:
      - "Pas de compression côté serveur"
      - "Taille max de 10Mo non justifiée — très généreuse"
      - "Pas de vérification de format WebP"

  - id: "US-103"
    titre: "Recevoir des notifications de suivi"
    enonce: "En tant que citoyen, je veux recevoir des notifications quand le statut de ma demande change, afin d'être informé sans avoir à me connecter régulièrement."
    criteres_acceptance_actuels:
      - "L'utilisateur reçoit un email lors de chaque changement de statut"
      - "L'email contient un lien vers sa demande"
    problemes_env_identifies:
      - "Email à chaque changement = potentiellement très fréquent"
      - "Pas d'option SMS ou notification push moins énergivore"
      - "Pas de regroupement des notifications"
```

### Livrables attendus — US enrichies

```yaml
livrables_qa:
  format: "Format Gherkin avec critères d'acceptance environnementaux ajoutés"

  exemples_correction:
    - id: "US-101-enrichie"
      titre: "Afficher la liste des demandes en cours"
      criteres_acceptance_enrichis:
        - scenario: "Chargement de la liste paginée"
          gherkin: |
            Given un citoyen avec 50 demandes en cours
            When il accède à la liste de ses demandes
            Then la liste affiche les 20 premières demandes par défaut
            And le poids total de la page ne dépasse pas 400 Ko
            And le nombre de requêtes HTTP ne dépasse pas 15
            And le temps de chargement est inférieur à 2 secondes sur une connexion 4G simulée
          critere_rgesn: "06 Frontend, 07 Backend"

        - scenario: "Absence de chargement automatique de contenu"
          gherkin: |
            Given un citoyen sur la page liste
            When il atteint le bas de la première page
            Then aucun chargement automatique de nouvelles demandes n'est déclenché
            And un bouton "Voir plus" est affiché pour charger la page suivante
          critere_rgesn: "04 UX/Interface"

    - id: "US-102-enrichie"
      titre: "Uploader un document justificatif"
      criteres_acceptance_enrichis:
        - scenario: "Compression automatique des images uploadées"
          gherkin: |
            Given un citoyen qui upload une image JPEG de 3 Mo
            When le fichier est traité par le serveur
            Then le fichier est automatiquement compressé et converti en WebP
            And le fichier stocké ne dépasse pas 500 Ko
            And la qualité visuelle reste acceptable (SSIM > 0.9)
          critere_rgesn: "05 Contenus, 07 Backend"

        - scenario: "Limitation de la taille justifiée"
          gherkin: |
            Given un citoyen qui tente d'uploader un fichier de 5 Mo
            When le fichier dépasse la taille maximale autorisée de 2 Mo
            Then un message d'erreur explicatif est affiché
            And le message suggère comment réduire la taille du fichier
          critere_rgesn: "02 Spécification, 05 Contenus"

    - id: "US-103-enrichie"
      titre: "Recevoir des notifications de suivi"
      criteres_acceptance_enrichis:
        - scenario: "Regroupement des notifications"
          gherkin: |
            Given un citoyen avec 3 changements de statut dans la même journée
            When les changements interviennent à des heures différentes
            Then un seul email de synthèse est envoyé en fin de journée
            And l'email liste les 3 changements de statut
          critere_rgesn: "02 Spécification, 04 UX/Interface"
          note: "Évite 2 emails inutiles sur 3 changements = réduction de 66% du volume email"

        - scenario: "Choix du canal de notification"
          gherkin: |
            Given un citoyen qui configure ses préférences de notification
            When il choisit son canal préféré
            Then il peut choisir entre email quotidien, SMS ou notification push
            And le canal par défaut est le moins fréquent (email quotidien)
          critere_rgesn: "02 Spécification"
          note: "SMS = moins de données que l'email HTML. Notification push = moins que les deux."
```

---

## Exercice Chef de projet / Manager

```yaml
exercice_cp:
  titre: "Compléter la section Stratégie de la déclaration d'écoconception"
  duree: 50
  profils: ["Chef de projet", "Manager", "DSI", "Product Manager"]
  livrable: "Section Stratégie de la déclaration d'écoconception + Definition of Done mise à jour + 3 KPIs identifiés"
  contexte: "Vous êtes chef de projet sur MonServicePublicFr. Votre client (collectivité territoriale) va devoir publier une déclaration d'écoconception (loi REEN). Votre mission : préparer la section Stratégie de cette déclaration et définir comment suivre les progrès."
```

### Template déclaration d'écoconception — Section Stratégie

```yaml
template_declaration_strategie:
  titre: "Déclaration d'écoconception — MonServicePublicFr"
  section: "Stratégie"
  champs_a_completer:
    - nom: "Référent écoconception"
      description: "Nom, rôle et responsabilités de la personne en charge de l'écoconception"
      exemple_reponse: |
        Prénom NOM — Lead développeur / Chef de projet technique
        Responsabilités :
        - Suivre le score RGESN trimestriellement
        - Animer les revues écoconception en sprint review
        - Être le point de contact pour les questions environnementales du client

    - nom: "Objectifs environnementaux"
      description: "Objectifs mesurables à atteindre dans les 12 prochains mois"
      exemple_reponse: |
        Objectif 1 : Passer le score EcoIndex de E (38/100) à C (60/100) d'ici 6 mois
        Objectif 2 : Atteindre 50% de conformité RGESN (actuellement ~17%) d'ici 12 mois
        Objectif 3 : Réduire le poids de la page d'accueil de 2,8 Mo à moins de 800 Ko d'ici 3 mois

    - nom: "Indicateurs de suivi"
      description: "KPIs environnementaux suivis régulièrement avec fréquence et responsable"
      exemple_reponse: |
        KPI 1 : Score EcoIndex — Mensuel — Responsable : Lead Dev
        KPI 2 : Score RGESN (% conformité) — Trimestriel — Responsable : Référent écoconception
        KPI 3 : Poids page d'accueil (Ko) — À chaque release — Responsable : CI/CD automatisé

    - nom: "Engagement de l'équipe"
      description: "Texte d'engagement de l'équipe projet envers l'écoconception"
      exemple_reponse: |
        L'équipe projet de MonServicePublicFr s'engage à intégrer les critères d'écoconception
        du RGESN dans son processus de développement. Chaque sprint inclura une revue
        des critères RGESN concernés par les fonctionnalités développées. Un audit complet
        sera réalisé trimestriellement et les résultats seront partagés avec le client.
```

### Definition of Done enrichie

```yaml
dod_enrichie:
  titre: "Definition of Done — MonServicePublicFr"
  version: "v2 — avec critères écoconception"
  criteres_existants:
    - "Code revu par un pair"
    - "Tests unitaires passants (couverture > 80%)"
    - "Tests d'intégration passants"
    - "Documentation mise à jour"
    - "Déployé en environnement de recette"
  criteres_ecoconception_ajoutes:
    - "Score EcoIndex de la page modifiée vérifié (pas de régression)"
    - "Checklist RGESN complétée pour les critères concernés par la feature"
    - "Aucune requête N+1 introduite (vérification EXPLAIN ANALYZE)"
    - "Images ajoutées converties en WebP et poids validé"
    - "Si nouvelle feature : justification d'usage documentée dans la US"

kpis_recommandes:
  - nom: "Score EcoIndex page d'accueil"
    unite: "Lettre A→G / Score 0-100"
    frequence: "Mensuelle et à chaque release majeure"
    source: "ecoindex.fr ou API EcoIndex en CI"
    cible_6mois: "C (≥ 60/100)"
    actuel: "E (38/100)"

  - nom: "Score de conformité RGESN"
    unite: "% de critères conformes sur les critères applicables"
    frequence: "Trimestrielle"
    source: "Tableur RGESN Arcep complété par le référent"
    cible_12mois: "50%"
    actuel: "~17% (basé sur le lab 01)"

  - nom: "Poids page d'accueil"
    unite: "Ko"
    frequence: "À chaque déploiement (CI automatisé)"
    source: "Lighthouse CI dans pipeline GitLab"
    cible_3mois: "< 800 Ko"
    actuel: "2 800 Ko"
```
