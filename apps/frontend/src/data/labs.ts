export interface LabData {
  id: string;
  slug: string;
  titre: string;
  duree: string;
  objectif: string;
  totalSteps: number;
  steps: {
    index: number;
    titre: string;
    duree: string;
    consigne: string; // HTML
    livrables?: string[];
    ressources?: { label: string; url?: string }[];
  }[];
}

export const LABS: LabData[] = [
  {
    id: 'lab-01',
    slug: 'lab-01',
    titre: 'Audit collectif RGESN',
    duree: '1h15',
    objectif: 'Savoir utiliser le tableur RGESN officiel pour évaluer un service numérique fictif. Comprendre la logique Conforme / Non conforme / Non applicable.',
    totalSteps: 3,
    steps: [
      {
        index: 0,
        titre: 'Présentation du service fictif',
        duree: '5 min',
        consigne: `
          <p>Vous allez auditer <strong>"MonServicePublicFr"</strong> — un portail permettant aux citoyens de déposer et suivre leurs demandes de documents administratifs.</p>
          <h4>Stack technique</h4>
          <ul>
            <li>Frontend : React 18, Create React App (pas de SSR)</li>
            <li>Backend : Spring Boot 3, Java 17 — base PostgreSQL 15</li>
            <li>Cache : Redis 7 en place, utilisé uniquement pour les sessions</li>
            <li>Hébergement : AWS eu-west-3 (Paris) — aucun CDN</li>
          </ul>
          <h4>Métriques connues</h4>
          <ul>
            <li>50 000 utilisateurs/mois — 280 000 pages vues</li>
            <li>Score EcoIndex : <strong>E (38/100)</strong></li>
            <li>Poids page d'accueil : <strong>2 800 Ko</strong></li>
            <li>Requêtes HTTP page d'accueil : <strong>67</strong></li>
            <li>Score Lighthouse Performance : <strong>42/100</strong></li>
          </ul>
          <h4>Éléments notables</h4>
          <ul>
            <li>Carousel automatique sur la home avec autoplay non désactivable</li>
            <li>Images PNG non compressées — la plus lourde : 2,1 Mo</li>
            <li>Requêtes N+1 identifiées sur le listing des demandes</li>
            <li>Redis en place mais utilisé uniquement pour les sessions</li>
            <li>Aucun référent écoconception désigné — aucun indicateur suivi</li>
            <li>12 packages npm inutilisés identifiés à l'audit</li>
          </ul>
          <p><strong>Votre mission</strong> : évaluer les 12 critères ci-dessous et décider pour chacun — <strong>Conforme (C) / Non conforme (NC) / Non applicable (NA)</strong> — avec une justification courte.</p>
        `,
      },
      {
        index: 1,
        titre: 'Audit des 12 critères RGESN',
        duree: '50 min',
        consigne: `
          <p>Travaillez en groupes de 3-4. Pour chaque critère, lisez les indices et posez votre verdict :</p>
          <table>
            <thead>
              <tr><th>#</th><th>Critère</th><th>Thématique</th><th>Indices</th><th>Réponse attendue</th></tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Un référent écoconception est désigné dans l'équipe</td>
                <td>Stratégie (01)</td>
                <td>Aucun rôle de ce type n'est mentionné dans l'organisation</td>
                <td><strong>NC</strong> — aucun référent désigné</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Les fonctionnalités sont justifiées par des données d'usage réelles</td>
                <td>Spécification (02)</td>
                <td>Carousel sur la home — son utilisation n'est pas mentionnée. Des analytics existent (50k users/mois).</td>
                <td><strong>Ambigu / NC</strong> — à débattre</td>
              </tr>
              <tr>
                <td>3</td>
                <td>L'architecture est adaptée à la charge réelle du service</td>
                <td>Architecture (03)</td>
                <td>AWS avec auto-scaling disponible, 50k users/mois (~1700/jour)</td>
                <td><strong>C</strong> — dimensionnement adapté</td>
              </tr>
              <tr>
                <td>4</td>
                <td>Aucune action automatique n'est déclenchée sans action utilisateur</td>
                <td>UX/Interface (04)</td>
                <td>Carousel avec autoplay non désactivable sur la page d'accueil</td>
                <td><strong>NC</strong> — autoplay explicite</td>
              </tr>
              <tr>
                <td>5</td>
                <td>Les images sont optimisées avant mise en ligne</td>
                <td>Contenus (05)</td>
                <td>Images PNG non compressées, la plus lourde : 2,1 Mo. Poids total page : 2 800 Ko.</td>
                <td><strong>NC</strong> — PNG 2,1 Mo non compressé</td>
              </tr>
              <tr>
                <td>6</td>
                <td>Le nombre de requêtes HTTP est minimisé</td>
                <td>Frontend (06)</td>
                <td>67 requêtes HTTP sur la page d'accueil. Pas de CDN. CRA sans SSR.</td>
                <td><strong>NC</strong> — 67 req &gt; seuil recommandé de 30</td>
              </tr>
              <tr>
                <td>7</td>
                <td>Un système de cache serveur est utilisé sur les données fréquentes</td>
                <td>Backend (07)</td>
                <td>Redis 7 en place mais utilisé uniquement pour les sessions</td>
                <td><strong>NC</strong> — Redis mal utilisé (sessions ≠ données métier)</td>
              </tr>
              <tr>
                <td>8</td>
                <td>Les requêtes à la base de données sont optimisées</td>
                <td>Backend (07)</td>
                <td>Requêtes N+1 identifiées sur le listing des demandes (1 requête par statut)</td>
                <td><strong>NC</strong> — N+1 explicitement identifié</td>
              </tr>
              <tr>
                <td>9</td>
                <td>L'hébergeur publie son bilan carbone</td>
                <td>Hébergement (08)</td>
                <td>AWS eu-west-3 (Paris). AWS publie son rapport de durabilité annuel.</td>
                <td><strong>C</strong> — AWS publie son rapport environnemental</td>
              </tr>
              <tr>
                <td>10</td>
                <td>La durée de conservation des données est définie et appliquée</td>
                <td>Backend (07)</td>
                <td>Politique de rétention des données non documentée</td>
                <td><strong>NC</strong> — aucune politique de rétention</td>
              </tr>
              <tr>
                <td>11</td>
                <td>Le service fonctionne sur des équipements anciens (3 ans et plus)</td>
                <td>UX/Interface (04)</td>
                <td>Testé uniquement sur iPhone 12 et Samsung récents</td>
                <td><strong>NC</strong> — non testé sur équipements anciens</td>
              </tr>
              <tr>
                <td>12</td>
                <td>Les dépendances logicielles inutilisées sont supprimées</td>
                <td>Architecture (03)</td>
                <td>Audit npm révèle 12 packages inutilisés</td>
                <td><strong>NC</strong> — 12 dépendances inutiles identifiées</td>
              </tr>
            </tbody>
          </table>
          <p class="message-formateur">Conseil formateur : Sur les cas ambigus (critère 2, 7), insistez sur la justification. Poser la question : "Quelle preuve apporteriez-vous à un auditeur officiel ?"</p>
        `,
        livrables: ['Tableau de verdicts complet pour les 12 critères', 'Identification des 2 critères les plus impactants à corriger en priorité'],
        ressources: [
          { label: 'Tableur RGESN officiel Arcep (.xlsx)', url: 'https://www.arcep.fr/uploads/tx_gspublication/referentiel_general_ecoconception_des_services_numeriques_version_2024.pdf' },
          { label: 'NumEcoDiag — outil de diagnostic DINUM', url: 'https://ecoresponsable.numerique.gouv.fr/numecodiag/' },
        ],
      },
      {
        index: 2,
        titre: 'Restitution et débat',
        duree: '20 min',
        consigne: `
          <p>Chaque groupe présente <strong>2 critères Non conformes</strong> qu'il a identifiés, avec la justification et la correction proposée.</p>
          <h4>Points de débat attendus</h4>
          <ul>
            <li><strong>Critère 7 (cache)</strong> : Redis est présent mais "mal utilisé". Est-ce NC ou C ? Quelle est la limite entre "présent" et "utilisé correctement" ?</li>
            <li><strong>Critère 2 (fonctionnalités justifiées)</strong> : Comment prouver qu'une fonctionnalité répond à un vrai besoin ? Analytics ? Spec ? Test utilisateur ?</li>
            <li><strong>Critère 6 (67 requêtes)</strong> : Y a-t-il un seuil absolu dans le RGESN ? (Non — c'est du jugement contextuel)</li>
          </ul>
          <h4>Synthèse</h4>
          <p>Score de conformité estimé : <strong>2 C sur 12 critères = ~17% de conformité sur le périmètre audité</strong>. En comparaison, un service bien conçu atteint 60-70%.</p>
          <p class="message-formateur">Vous venez de faire votre premier audit RGESN. Ce que vous avez fait là, c'est exactement le travail d'un référent écoconception en phase de diagnostic. La différence avec un expert : la vitesse et la profondeur des justifications.</p>
        `,
      },
    ],
  },
  {
    id: 'lab-02',
    slug: 'lab-02',
    titre: 'Atelier pratique multi-profils',
    duree: '1h15',
    objectif: 'Appliquer les acquis sur un cas concret ancré dans votre métier quotidien. Repartir avec un livrable réel.',
    totalSteps: 3,
    steps: [
      {
        index: 0,
        titre: 'Choisissez votre angle selon votre profil',
        duree: '5 min',
        consigne: `
          <p>Même service fictif "MonServicePublicFr", 3 angles selon votre rôle :</p>
          <div class="profil-cards">
            <div class="profil-card profil-dev">
              <h4>Développeur</h4>
              <p>Identifier 3 non-conformités RGESN dans du code Spring Boot + React, et proposer les corrections.</p>
            </div>
            <div class="profil-card profil-qa">
              <h4>QA / Analyste</h4>
              <p>Réécrire 3 user stories en ajoutant des critères d'acceptance environnementaux mesurables.</p>
            </div>
            <div class="profil-card profil-cp">
              <h4>Chef de projet / Manager</h4>
              <p>Compléter la section Stratégie de la déclaration d'écoconception du service fictif.</p>
            </div>
          </div>
        `,
      },
      {
        index: 1,
        titre: 'Exercice central (50 min)',
        duree: '50 min',
        consigne: `
          <h4>Angle Développeur — Audit de code Spring Boot + React</h4>
          <p>Identifiez les non-conformités RGESN dans ces extraits et rédigez vos commentaires de MR (critère RGESN + correction proposée) :</p>
          <pre><code>// UserDemandeController.java

// PROBLÈME 1 — SELECT * sans pagination (thématique 07 Backend)
@GetMapping("/liste")
public List&lt;Demande&gt; getAllDemandes() {
    return demandeRepository.findAll(); // SELECT * sans LIMIT
}

// PROBLÈME 2 — Requête N+1 (thématique 07 Backend)
@GetMapping("/liste-avec-statuts")
public List&lt;DemandeDto&gt; getDemandesAvecStatuts() {
    List&lt;Demande&gt; demandes = demandeRepository.findAll();
    return demandes.stream()
        .map(d -&gt; {
            Statut statut = statutRepository.findById(d.getStatutId()) // N requêtes !
                .orElse(null);
            return new DemandeDto(d, statut);
        }).collect(Collectors.toList());
}

// PROBLÈME 3 — Calcul répété sans cache (thématique 07 Backend)
@GetMapping("/statistiques")
public StatistiquesDto getStatistiques() {
    // Recalculé à chaque appel — endpoint appelé toutes les 30s
    long total = demandeRepository.count();
    long enCours = demandeRepository.countByStatut("EN_COURS");
    return new StatistiquesDto(total, enCours);
}</code></pre>
          <pre><code>// PageAccueil.jsx

// PROBLÈME 4 — Polling API sans contrôle de visibilité (thématique 04 UX)
useEffect(() => {
    const fetchStats = async () =&gt; { ... };
    fetchStats();
    const interval = setInterval(fetchStats, 30000); // Même onglet inactif !
    return () =&gt; clearInterval(interval);
}, []);

// PROBLÈME 5 — Image PNG non optimisée, sans lazy loading ni alt (thématique 05)
import heroBanner from './assets/banner.png'; // 2,1 Mo !
&lt;img src={heroBanner} style={{ width: '100%' }} /&gt;

// PROBLÈME 6 — Carousel autoplay sans contrôle utilisateur (thématique 04 UX)
&lt;Carousel autoPlay interval={2000} infiniteLoop showControls={false}&gt;</code></pre>

          <h4>Angle QA / Analyste — User Stories à enrichir</h4>
          <p>Ajoutez des critères d'acceptance environnementaux mesurables à ces 3 US :</p>
          <ul>
            <li><strong>US-101</strong> : "En tant que citoyen, je veux voir la liste de mes demandes en cours" — ajouter : pagination, poids max, nb requêtes max</li>
            <li><strong>US-102</strong> : "En tant que citoyen, je veux uploader un document justificatif" — ajouter : compression auto, taille max justifiée (2 Mo max, pas 10 Mo)</li>
            <li><strong>US-103</strong> : "En tant que citoyen, je veux recevoir des notifications" — ajouter : regroupement des emails, choix du canal</li>
          </ul>
          <p>Exemple enrichi pour US-101 :</p>
          <pre><code>Given un citoyen avec 50 demandes en cours
When il accède à la liste de ses demandes
Then la liste affiche les 20 premières par défaut
And le poids total de la page ne dépasse pas 400 Ko
And le nombre de requêtes HTTP ne dépasse pas 15
And le temps de chargement est inférieur à 2s sur 4G simulée</code></pre>

          <h4>Angle CP / Manager — Déclaration d'écoconception (section Stratégie)</h4>
          <ul>
            <li>Désignez un référent écoconception avec son rôle et ses responsabilités</li>
            <li>Définissez 3 objectifs mesurables à 6 et 12 mois (ex : EcoIndex E → C en 6 mois, conformité 17% → 50% en 12 mois)</li>
            <li>Listez 3 KPIs de suivi avec fréquence et responsable (EcoIndex mensuel, score RGESN trimestriel, poids page en CI)</li>
            <li>Enrichissez la Definition of Done avec les critères écoconception (vérification EcoIndex, checklist RGESN, images en WebP)</li>
          </ul>
        `,
        livrables: [
          'Dev : 6 commentaires de MR avec critère RGESN référencé et correction proposée',
          'QA : 3 user stories en format Gherkin avec critères d\'acceptance environnementaux mesurables',
          'CP : section Stratégie de la déclaration d\'écoconception + DoD enrichie + 3 KPIs',
        ],
      },
      {
        index: 2,
        titre: 'Restitution croisée',
        duree: '20 min',
        consigne: `
          <p>5 minutes par groupe pour présenter votre livrable.</p>
          <p>Question de débat croisé : <strong>Comment ces 3 angles (Dev, QA, CP) se complètent-ils pour améliorer l'écoconception d'un service ?</strong></p>
          <p>Objectif : montrer que l'écoconception n'est pas que technique — elle se joue dans les specs, la gouvernance ET le code.</p>
        `,
      },
    ],
  },
];
