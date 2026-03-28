export interface ModuleData {
  id: string;
  slug: string;
  titre: string;
  duree: string;
  type: 'theorie' | 'atelier' | 'quiz' | 'exercice';
  horaire: string;
  sections: {
    titre: string;
    contenu: string; // HTML
    messageFormateur?: string;
  }[];
  ressources?: { label: string; url: string }[];
}

export const MODULES: ModuleData[] = [
  {
    id: 'module-01',
    slug: 'enjeux-numerique',
    titre: "Les enjeux du numérique responsable",
    duree: '45 min',
    type: 'theorie',
    horaire: '08h50 → 09h35',
    sections: [
      {
        titre: "L'empreinte réelle du numérique",
        contenu: `
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-number">~4%</div>
              <div class="stat-label">des émissions mondiales de GES</div>
              <div class="stat-source">GreenIT.fr 2023</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">+8%/an</div>
              <div class="stat-label">croissance des émissions numériques</div>
              <div class="stat-source">The Shift Project</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">34 Mds</div>
              <div class="stat-label">équipements numériques dans le monde</div>
              <div class="stat-source">GreenIT.fr 2023</div>
            </div>
          </div>

          <h4>La règle des 80/20 — ce que personne ne vous a dit</h4>
          <p><strong>80% de l'empreinte carbone du numérique vient de la fabrication</strong> des équipements, pas de leur usage électrique. Éteindre son écran la nuit ne sauvera pas la planète. Garder son téléphone 5 ans au lieu de 2, si.</p>

          <h4>Répartition de l'empreinte par poste</h4>
          <div class="bar-chart">
            <div class="bar-row">
              <div class="bar-label">Terminaux</div>
              <div class="bar-track">
                <div class="bar-fill bg-green-500" style="width:70%"></div>
              </div>
              <div class="bar-value text-green-400 font-bold">70%</div>
            </div>
            <div class="bar-row">
              <div class="bar-label">Réseaux</div>
              <div class="bar-track">
                <div class="bar-fill bg-blue-500" style="width:20%"></div>
              </div>
              <div class="bar-value text-blue-400 font-bold">20%</div>
            </div>
            <div class="bar-row">
              <div class="bar-label">Datacenters</div>
              <div class="bar-track">
                <div class="bar-fill bg-slate-500" style="width:10%"></div>
              </div>
              <div class="bar-value text-slate-400 font-bold">10%</div>
            </div>
          </div>
          <p class="text-slate-500 text-xs">Source : GreenIT.fr 2023 — fabrication des équipements incluse</p>

          <h4>Exemples concrets pour ancrer les ordres de grandeur</h4>
          <table>
            <thead><tr><th>Action numérique</th><th>Émissions</th><th>Équivalent</th></tr></thead>
            <tbody>
              <tr><td>Fabriquer un smartphone neuf</td><td class="text-orange-400 font-bold">70 kgCO₂e</td><td>350 km en voiture</td></tr>
              <tr><td>1 an d'usage du même smartphone</td><td class="text-green-400 font-bold">1,5 kgCO₂e</td><td>7,5 km en voiture</td></tr>
              <tr><td>1h de visioconférence HD</td><td>150 gCO₂e</td><td>800 m en voiture — Source : Carbon Trust</td></tr>
              <tr><td>1h de streaming vidéo HD</td><td>36 gCO₂e</td><td>L'<strong>écran</strong> consomme plus que le datacenter</td></tr>
              <tr><td>1 email avec PJ 1 Mo → 10 dest.</td><td class="text-orange-400 font-bold">19 gCO₂e</td><td>vs 4 gCO₂e sans PJ — Source : ADEME</td></tr>
              <tr><td>1 recherche Google</td><td>0,2 gCO₂e</td><td>Mais × 8,5 milliards/jour dans le monde</td></tr>
            </tbody>
          </table>

          <div class="insight-box-green">
            <p class="text-green-300 font-semibold">💡 Contre-intuitif</p>
            <p class="text-green-200 text-xs mt-1">Pendant 1h de streaming, <strong>l'écran de l'utilisateur</strong> consomme bien plus que le datacenter et le réseau réunis. Une TV 55 pouces = 100 à 150W en continu. Le datacenter est optimisé et mutualisé entre des millions d'utilisateurs.</p>
          </div>
        `,
        messageFormateur: "Le levier n°1 ce n'est pas d'éteindre les serveurs. C'est de garder les équipements plus longtemps et d'éviter de créer des services inutiles. Un service numérique qui n'est pas créé a une empreinte carbone de zéro.",
      },
      {
        titre: "Les scopes GHG Protocol appliqués au SI",
        contenu: `
          <p>Le <strong>GHG Protocol</strong> structure l'empreinte carbone d'une organisation en 3 niveaux pour éviter les doubles comptages.</p>

          <h4>Les 3 scopes — visualisation</h4>
          <div class="insight-box">
            <div class="flex flex-col gap-3">
              <div class="flex items-start gap-3">
                <div class="flex-shrink-0 w-16 h-8 flex items-center justify-center rounded-lg bg-red-950 border border-red-900 text-red-400 font-bold text-sm">S1</div>
                <div>
                  <p class="text-white font-medium text-sm">Émissions directes <span class="text-slate-500 text-xs font-normal">— &lt;5% pour une ESN</span></p>
                  <p class="text-slate-400 text-xs">Datacenter on-premise, groupes électrogènes, climatisation des locaux, véhicules de l'entreprise</p>
                </div>
              </div>
              <div class="flex items-start gap-3">
                <div class="flex-shrink-0 w-16 h-8 flex items-center justify-center rounded-lg bg-orange-950 border border-orange-900 text-orange-400 font-bold text-sm">S2</div>
                <div>
                  <p class="text-white font-medium text-sm">Électricité achetée <span class="text-slate-500 text-xs font-normal">— 5 à 15% pour une ESN</span></p>
                  <p class="text-slate-400 text-xs">Facture électrique du datacenter, électricité des bureaux. Dépend fortement du mix énergétique du pays hébergeur.</p>
                </div>
              </div>
              <div class="flex items-start gap-3">
                <div class="flex-shrink-0 w-16 h-8 flex items-center justify-center rounded-lg bg-green-950 border border-green-800 text-green-400 font-bold text-sm">S3</div>
                <div>
                  <p class="text-white font-medium text-sm">Autres émissions indirectes <span class="text-orange-400 text-xs font-semibold">&gt;80% pour une ESN</span></p>
                  <p class="text-slate-400 text-xs">Fabrication des laptops et smartphones, cloud AWS/Azure/GCP, réseau internet (FAI), déplacements professionnels, télétravail des salariés</p>
                </div>
              </div>
            </div>
          </div>

          <h4>Exercice — Quel scope pour chaque poste ?</h4>
          <table>
            <thead><tr><th>Poste</th><th>Scope</th><th>Pourquoi</th></tr></thead>
            <tbody>
              <tr><td>Laptop fourni à un développeur</td><td class="text-green-400 font-bold">S3</td><td>Fabrication = émissions amont</td></tr>
              <tr><td>Facture électrique du datacenter on-premise</td><td class="text-orange-400 font-bold">S2</td><td>Électricité achetée à un tiers</td></tr>
              <tr><td>Serveur physique en salle serveur ESN</td><td class="text-red-400 font-bold">S1</td><td>Asset directement détenu</td></tr>
              <tr><td>Instance AWS EC2 pour un projet client</td><td class="text-green-400 font-bold">S3</td><td>Cloud = émissions indirectes aval</td></tr>
              <tr><td>Vol Paris-Lyon pour une mission consultant</td><td class="text-green-400 font-bold">S3</td><td>Déplacement professionnel</td></tr>
              <tr><td>Climatisation salle serveur</td><td class="text-red-400 font-bold">S1</td><td>Émission directe dans les locaux</td></tr>
            </tbody>
          </table>

          <div class="insight-box-orange">
            <p class="text-orange-300 font-semibold">⚠️ L'angle mort des ESN</p>
            <p class="text-orange-200 text-xs mt-1">La plupart des ESN ne mesurent que S1 + S2 = moins de 20% de leur empreinte réelle. Le scope 3, c'est là où tout se joue — et c'est précisément là que vos décisions techniques ont le plus d'impact.</p>
          </div>
        `,
        messageFormateur: "Si votre ESN ne mesure que ses factures d'électricité, elle voit moins de 20% de son empreinte réelle. Le scope 3, c'est là où tout se joue — et c'est là que vos décisions techniques ont le plus d'impact.",
      },
      {
        titre: "Le cadre réglementaire — ce qui est en train de changer",
        contenu: `
          <h4>Chronologie réglementaire</h4>
          <div class="flow-row">
            <div class="flow-box">2021<br/><span class="text-green-400 text-xs font-bold">Loi REEN</span></div>
            <div class="flow-arrow">→</div>
            <div class="flow-box">2022<br/><span class="text-blue-400 text-xs font-bold">RGESN v1</span></div>
            <div class="flow-arrow">→</div>
            <div class="flow-box">2024<br/><span class="text-purple-400 text-xs font-bold">CSRD + RGESN v2</span></div>
            <div class="flow-arrow">→</div>
            <div class="flow-box-green">Aujourd'hui<br/><span class="text-green-300 text-xs font-bold">AO publics</span></div>
          </div>

          <table>
            <thead><tr><th>Texte</th><th>Portée</th><th>Contenu</th><th>Impact ESN</th></tr></thead>
            <tbody>
              <tr>
                <td><strong class="text-white">Loi REEN (2021)</strong></td>
                <td><span class="text-blue-400 text-xs">🇫🇷 France</span></td>
                <td>Obligations de déclaration d'écoconception pour services numériques publics</td>
                <td>Les clients publics doivent publier une déclaration RGESN — <strong>ils vont l'exiger dans les AO</strong></td>
              </tr>
              <tr>
                <td><strong class="text-white">RGESN 2024</strong></td>
                <td><span class="text-blue-400 text-xs">🇫🇷 France</span></td>
                <td>78 critères, 9 thématiques — porté par Arcep, DINUM, MiNumEco, INR</td>
                <td>Standard de facto pour tout projet numérique public en France</td>
              </tr>
              <tr>
                <td><strong class="text-white">CSRD (2024)</strong></td>
                <td><span class="text-purple-400 text-xs">🇪🇺 Europe</span></td>
                <td>Reporting ESG obligatoire — commence &gt;500 salariés, puis PME</td>
                <td>Grandes ESN déjà concernées. Les sous-traitants seront sollicités pour leurs données.</td>
              </tr>
              <tr>
                <td><strong class="text-white">Directive Ecodesign</strong></td>
                <td><span class="text-purple-400 text-xs">🇪🇺 Europe</span></td>
                <td>Obligations d'écoconception sur les produits physiques</td>
                <td>Impact indirect sur les choix d'équipements recommandés aux clients</td>
              </tr>
            </tbody>
          </table>

          <div class="insight-box">
            <p class="text-slate-300 text-xs font-semibold mb-2">Points de vigilance :</p>
            <ul>
              <li class="text-slate-400 text-xs">✗ Le RGESN n'est <strong>pas encore obligatoire pour les ESN privées</strong> — c'est faux de le dire</li>
              <li class="text-slate-400 text-xs">✗ Ne pas confondre RGESN (écoconception) et GR491 (numérique responsable au sens large, 516 critères)</li>
              <li class="text-slate-400 text-xs">✗ La conformité RGESN ne suffit pas à répondre à la CSRD — ce sont deux périmètres différents</li>
            </ul>
          </div>
        `,
        messageFormateur: "La loi REEN ne touche pas encore les ESN directement. Mais vos clients publics, eux, doivent publier une déclaration d'écoconception. Ils vont vous la demander dans les AO. La question n'est pas 'est-ce qu'on va devoir le faire', c'est 'quand'. C'est maintenant qu'il faut se former.",
      },
    ],
    ressources: [
      { label: 'GreenIT.fr — Rapport numérique responsable 2023', url: 'https://www.greenit.fr' },
      { label: 'ADEME — Empreinte environnementale du numérique en France', url: 'https://www.ademe.fr' },
    ],
  },
  {
    id: 'module-02',
    slug: 'rgesn',
    titre: "Le RGESN : référentiel et 9 thématiques",
    duree: '50 min',
    type: 'theorie',
    horaire: '09h35 → 10h25',
    sections: [
      {
        titre: "Qu'est-ce que le RGESN ? Positionnement et idées reçues",
        contenu: `
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-number">78</div>
              <div class="stat-label">critères RGESN 2024</div>
              <div class="stat-source">Arcep / DINUM 2024</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">9</div>
              <div class="stat-label">thématiques dont IA (nouveau)</div>
              <div class="stat-source">vs 8 en version 2022</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">3</div>
              <div class="stat-label">niveaux : C / NC / NA</div>
              <div class="stat-source">Conforme / Non conforme / N/A</div>
            </div>
          </div>

          <h4>Porteurs officiels</h4>
          <div class="flow-row">
            <div class="flow-box-green">Arcep</div>
            <div class="flow-arrow">+</div>
            <div class="flow-box-green">DINUM</div>
            <div class="flow-arrow">+</div>
            <div class="flow-box-green">MiNumEco</div>
            <div class="flow-arrow">+</div>
            <div class="flow-box-green">INR</div>
          </div>

          <h4>RGESN vs autres référentiels</h4>
          <table>
            <thead><tr><th>Référentiel</th><th>Critères</th><th>Cible</th><th>Obligatoire</th></tr></thead>
            <tbody>
              <tr><td><strong class="text-white">RGESN 2024</strong></td><td class="text-green-400 font-bold">78</td><td>Équipes projet, devs, CP</td><td class="text-orange-400">Services publics (REEN)</td></tr>
              <tr><td>GR491 (INR)</td><td class="text-slate-400">516</td><td>DSI, RSE, organisations</td><td class="text-green-400">Non</td></tr>
              <tr><td>115 BP GreenIT.fr</td><td class="text-slate-400">115</td><td>Développeurs web</td><td class="text-green-400">Non</td></tr>
            </tbody>
          </table>

          <h4>Ce que le RGESN n'est pas</h4>
          <div class="insight-box">
            <ul>
              <li class="text-slate-300 text-xs mb-1"><span class="text-red-400 mr-1">✗</span> <strong>Ce n'est pas une certification</strong> — il n'existe aucun label RGESN</li>
              <li class="text-slate-300 text-xs mb-1"><span class="text-red-400 mr-1">✗</span> <strong>Pas obligatoire pour les ESN privées</strong> — pour l'instant</li>
              <li class="text-slate-300 text-xs mb-1"><span class="text-red-400 mr-1">✗</span> <strong>100% de conformité n'est pas l'objectif</strong> — certains critères sont NA selon le contexte</li>
              <li class="text-slate-300 text-xs"><span class="text-red-400 mr-1">✗</span> <strong>Pas un remplacement des bonnes pratiques</strong> — il les complète avec une dimension environnementale</li>
            </ul>
          </div>
        `,
      },
      {
        titre: "Les 9 thématiques en détail",
        contenu: `
          <table>
            <thead><tr><th>#</th><th>Thématique</th><th>Critères</th><th>Profils clés</th><th>Message clé</th></tr></thead>
            <tbody>
              <tr><td class="text-green-400 font-mono">01</td><td><strong class="text-white">Stratégie</strong></td><td>8</td><td>CP, Manager</td><td>Sans sponsor, rien ne tient dans le temps</td></tr>
              <tr><td class="text-green-400 font-mono">02</td><td><strong class="text-white">Spécification</strong></td><td>8</td><td>Analyste, QA, PO</td><td>La feature la plus écoconçue est celle qu'on n'a pas développée</td></tr>
              <tr><td class="text-green-400 font-mono">03</td><td><strong class="text-white">Architecture</strong></td><td>9</td><td>Dev, Tech Lead</td><td>Un service surdimensionné consomme inutilement 24h/24</td></tr>
              <tr><td class="text-green-400 font-mono">04</td><td><strong class="text-white">UX / Interface</strong></td><td>9</td><td>Dev Frontend, UX</td><td>Scroll infini, autoplay, notifications push — consomment en permanence</td></tr>
              <tr><td class="text-green-400 font-mono">05</td><td><strong class="text-white">Contenus</strong></td><td>7</td><td>Dev, Analyste</td><td>1 image PNG 2Mo → WebP 200Ko = 10× moins de bande passante</td></tr>
              <tr><td class="text-green-400 font-mono">06</td><td><strong class="text-white">Frontend</strong></td><td>9</td><td>Dev Frontend</td><td>Un bundle 2Mo sur mobile 3G = 10s de chargement, batterie vidée</td></tr>
              <tr><td class="text-green-400 font-mono">07</td><td><strong class="text-white">Backend</strong></td><td>9</td><td>Dev Backend, DBA</td><td>Un N+1 sur 1M appels/jour = 999M requêtes inutiles</td></tr>
              <tr><td class="text-green-400 font-mono">08</td><td><strong class="text-white">Hébergement</strong></td><td>7</td><td>Dev, DevOps</td><td>France vs Virginie = ×10 sur l'empreinte carbone d'une même instance</td></tr>
              <tr><td class="text-orange-400 font-mono">09</td><td><strong class="text-white">Algorithmie / IA</strong> <span class="text-orange-400 text-xs">NOUVEAU</span></td><td>6</td><td>Dev, Data</td><td>GPT-4 pour formater une date = pelleteuse pour déplacer un crayon</td></tr>
            </tbody>
          </table>

          <h4>Anatomie d'une fiche critère</h4>
          <div class="insight-box">
            <p class="text-white text-xs font-semibold mb-2">Exemple — Critère 7.3 : "Mettre en cache les données calculées côté serveur"</p>
            <div class="space-y-1">
              <div class="flex gap-2"><span class="text-slate-500 text-xs w-28 flex-shrink-0">Thématique</span><span class="text-slate-300 text-xs">Backend (07)</span></div>
              <div class="flex gap-2"><span class="text-slate-500 text-xs w-28 flex-shrink-0">Objectif</span><span class="text-slate-300 text-xs">Éviter de recalculer des données identiques à chaque requête</span></div>
              <div class="flex gap-2"><span class="text-slate-500 text-xs w-28 flex-shrink-0">Moyen de test</span><span class="text-slate-300 text-xs">Vérifier présence Redis/Memcached + mesurer cache hit rate (cible &gt;50%)</span></div>
              <div class="flex gap-2"><span class="text-slate-500 text-xs w-28 flex-shrink-0">Profils</span><span class="text-slate-300 text-xs">Dev Backend, Architecte</span></div>
              <div class="flex gap-2"><span class="text-slate-500 text-xs w-28 flex-shrink-0">Non conforme</span><span class="text-red-300 text-xs">Endpoint /api/stats qui recalcule tout depuis la BDD à chaque appel</span></div>
              <div class="flex gap-2"><span class="text-slate-500 text-xs w-28 flex-shrink-0">Conforme</span><span class="text-green-300 text-xs">Même endpoint avec Redis TTL 5 min — 99% des appels ne touchent pas la BDD</span></div>
            </div>
          </div>
        `,
      },
      {
        titre: "Matrice profils × thématiques",
        contenu: `
          <p>Identifiez en un coup d'œil les thématiques qui vous concernent directement :</p>
          <table>
            <thead><tr><th>Profil</th><th>01<br/>Strat</th><th>02<br/>Spec</th><th>03<br/>Archi</th><th>04<br/>UX</th><th>05<br/>Content</th><th>06<br/>Front</th><th>07<br/>Back</th><th>08<br/>Héberg</th><th>09<br/>IA</th></tr></thead>
            <tbody>
              <tr><td><strong>Dev Backend</strong></td><td>★</td><td>—</td><td class="text-green-400 font-bold">★★</td><td>—</td><td>★</td><td>—</td><td class="text-green-400 font-bold">★★</td><td>★</td><td class="text-green-400 font-bold">★★</td></tr>
              <tr><td><strong>Dev Frontend</strong></td><td>★</td><td>—</td><td>★</td><td class="text-green-400 font-bold">★★</td><td class="text-green-400 font-bold">★★</td><td class="text-green-400 font-bold">★★</td><td>—</td><td>—</td><td>★</td></tr>
              <tr><td><strong>QA / Testeur</strong></td><td>★</td><td class="text-green-400 font-bold">★★</td><td>—</td><td class="text-green-400 font-bold">★★</td><td>★</td><td>★</td><td>★</td><td>—</td><td>—</td></tr>
              <tr><td><strong>Analyste / PO</strong></td><td class="text-green-400 font-bold">★★</td><td class="text-green-400 font-bold">★★</td><td>★</td><td class="text-green-400 font-bold">★★</td><td class="text-green-400 font-bold">★★</td><td>—</td><td>—</td><td>—</td><td>★</td></tr>
              <tr><td><strong>CP / Manager</strong></td><td class="text-green-400 font-bold">★★</td><td class="text-green-400 font-bold">★★</td><td>★</td><td>—</td><td>—</td><td>—</td><td>—</td><td class="text-green-400 font-bold">★★</td><td>★</td></tr>
            </tbody>
          </table>
          <p class="text-slate-500 text-xs mt-2">★★ = thématique principale (impact direct sur votre travail) — ★ = secondaire — — = peu concerné</p>

          <h4>Exemple par profil — ce que ça change concrètement</h4>
          <div class="insight-box">
            <ul>
              <li class="text-slate-300 text-xs mb-2"><strong class="text-white">Dev Backend →</strong> Thématiques 03, 07, 09 : design de cache Redis, éviter les N+1, choisir le bon algo ML, paginer les API</li>
              <li class="text-slate-300 text-xs mb-2"><strong class="text-white">Dev Frontend →</strong> Thématiques 04, 05, 06 : désactiver autoplay, convertir images en WebP, tree-shaking du bundle JS</li>
              <li class="text-slate-300 text-xs mb-2"><strong class="text-white">QA/Analyste →</strong> Thématiques 02, 04 : challenger chaque feature (vraiment nécessaire ?), écrire des critères d'acceptance environnementaux</li>
              <li class="text-slate-300 text-xs"><strong class="text-white">CP/Manager →</strong> Thématiques 01, 02, 08 : désigner un référent, choisir une région cloud sobre, mettre des KPIs verts dans la DoD</li>
            </ul>
          </div>
        `,
      },
    ],
    ressources: [
      { label: 'RGESN 2024 PDF (Arcep)', url: 'https://www.arcep.fr' },
      { label: 'NumEcoDiag (DINUM)', url: 'https://ecoresponsable.numerique.gouv.fr/numecodiag' },
    ],
  },
  {
    id: 'module-03',
    slug: 'mesurer',
    titre: "Mesurer l'empreinte numérique",
    duree: '40 min',
    type: 'theorie',
    horaire: '13h30 → 14h10',
    sections: [
      {
        titre: "Pourquoi mesurer — deux types de métriques",
        contenu: `
          <div class="insight-box">
            <p class="text-white font-semibold text-sm">Principe fondamental</p>
            <p class="text-slate-300 text-xs mt-1">On ne peut améliorer que ce qu'on mesure. Sans baseline, impossible d'objectiver les progrès face à un DSI ou un client.</p>
          </div>

          <h4>Impact direct vs proxies techniques</h4>
          <table>
            <thead><tr><th>Type</th><th>Unités</th><th>Avantages</th><th>Inconvénients</th><th>Outils</th></tr></thead>
            <tbody>
              <tr>
                <td><strong class="text-white">Impact direct</strong></td>
                <td>gCO₂e, kWh</td>
                <td>Parle aux décideurs, comparable entre services</td>
                <td>Complexe, difficile en CI/CD</td>
                <td>CodeCarbon, Cloud Carbon Footprint</td>
              </tr>
              <tr>
                <td><strong class="text-white">Proxies techniques</strong></td>
                <td>Score A→G, nb requêtes, Ko</td>
                <td class="text-green-400">Automatisables en CI, actionnables par les devs</td>
                <td>Corrélation imparfaite avec l'empreinte réelle</td>
                <td>EcoIndex, Lighthouse, DevTools</td>
              </tr>
            </tbody>
          </table>

          <h4>Les 7 métriques clés</h4>
          <table>
            <thead><tr><th>Métrique</th><th>Unité</th><th>Cible</th><th>Outil</th><th>Profil</th></tr></thead>
            <tbody>
              <tr><td><strong class="text-white">Score EcoIndex</strong></td><td>A → G</td><td class="text-green-400">≥ 75/100 (B)</td><td>ecoindex.fr / API</td><td>Dev Frontend, QA</td></tr>
              <tr><td>Poids de page</td><td>Ko</td><td class="text-green-400">&lt; 500 Ko</td><td>Lighthouse, DevTools</td><td>Dev Frontend, QA</td></tr>
              <tr><td>Requêtes HTTP</td><td>Nombre</td><td class="text-green-400">&lt; 30</td><td>DevTools &gt; Network</td><td>Dev Frontend, QA</td></tr>
              <tr><td>Score Lighthouse Perf</td><td>0-100</td><td class="text-green-400">&gt; 80</td><td>Chrome DevTools</td><td>Dev Frontend, QA</td></tr>
              <tr><td>Empreinte CO₂ code</td><td>gCO₂e/run</td><td>Baseline → −20%/iter</td><td>CodeCarbon (Python)</td><td>Dev Backend, Data</td></tr>
              <tr><td>Empreinte cloud</td><td>tCO₂e/mois</td><td>Dashboard + alertes</td><td>Cloud Carbon Footprint</td><td>DevOps, CP</td></tr>
              <tr><td>Score RGESN</td><td>% conformité</td><td>Progression continue</td><td>NumEcoDiag, tableur Arcep</td><td>Tous</td></tr>
            </tbody>
          </table>

          <h4>EcoIndex — comment ça marche</h4>
          <div class="flow-row">
            <div class="flow-box">Nb éléments DOM</div>
            <div class="flow-arrow">+</div>
            <div class="flow-box">Nb requêtes HTTP</div>
            <div class="flow-arrow">+</div>
            <div class="flow-box">Poids total (Ko)</div>
            <div class="flow-arrow">→</div>
            <div class="flow-box-green">Score 0-100 → A à G</div>
          </div>
          <p class="text-slate-500 text-xs">Plus les valeurs sont basses, meilleur est le score. Un score A = service sobre et bien optimisé.</p>
        `,
      },
      {
        titre: "Les outils par profil",
        contenu: `
          <h4>Développeurs</h4>
          <table>
            <thead><tr><th>Outil</th><th>Type</th><th>Usage</th><th>Intégration CI</th></tr></thead>
            <tbody>
              <tr>
                <td><strong class="text-white">EcoIndex</strong></td>
                <td>Web gratuit</td>
                <td>Score A→G en 30s sur une URL publique</td>
                <td class="text-green-400">API disponible</td>
              </tr>
              <tr>
                <td><strong class="text-white">Lighthouse CI</strong></td>
                <td>CLI open source</td>
                <td>Audit Performance, LCP, CLS à chaque déploiement</td>
                <td class="text-green-400">Natif GitLab/GitHub CI</td>
              </tr>
              <tr>
                <td><strong class="text-white">CodeCarbon</strong></td>
                <td>Library Python</td>
                <td>Empreinte CO₂ d'un script ML/data</td>
                <td class="text-green-400">Décorateur <code>@track_emissions</code></td>
              </tr>
              <tr>
                <td><strong class="text-white">Scaphandre</strong></td>
                <td>Agent Rust</td>
                <td>Conso énergétique réelle d'un process Linux</td>
                <td class="text-green-400">Prometheus / Grafana</td>
              </tr>
            </tbody>
          </table>

          <pre>from codecarbon import track_emissions

@track_emissions(country_iso_code="FRA")
def train_model():
    # Votre code d'entraînement ici
    pass
# → génère emissions.csv avec gCO₂e par run</pre>

          <h4>QA et Analystes</h4>
          <table>
            <thead><tr><th>Outil</th><th>Usage</th></tr></thead>
            <tbody>
              <tr><td><strong class="text-white">NumEcoDiag (DINUM)</strong></td><td>Questionnaire guidé RGESN → rapport PDF exportable. 20-45 min pour un service complet. <span class="text-green-400">Officiel, gratuit.</span></td></tr>
              <tr><td>EcoIndex</td><td>Tester avant/après une feature pour mesurer l'impact concret</td></tr>
              <tr><td>Lighthouse (F12)</td><td>Audit complet d'une page — partager le rapport avec l'équipe dev</td></tr>
            </tbody>
          </table>

          <h4>Chefs de projet et Managers</h4>
          <table>
            <thead><tr><th>Outil</th><th>Usage</th></tr></thead>
            <tbody>
              <tr><td><strong class="text-white">Cloud Carbon Footprint</strong></td><td>Dashboard open source — empreinte consolidée AWS / Azure / GCP par service et région</td></tr>
              <tr><td>NumEcoDiag</td><td>Rapport PDF exportable pour le reporting DSI ou une réponse à AO</td></tr>
              <tr><td>Tableur RGESN Arcep (.xlsx)</td><td>Suivi de conformité par sprint ou phase projet. Renseigner C / NC / NA par critère.</td></tr>
            </tbody>
          </table>

          <h4>Démo live — 3 outils en 10 minutes</h4>
          <div class="insight-box-green">
            <ol class="text-green-200 text-xs space-y-2 list-decimal list-inside">
              <li>Ouvrir <strong>ecoindex.fr</strong> — entrer l'URL du site de votre ESN — lire le score ensemble</li>
              <li>Ouvrir <strong>Chrome DevTools F12 &gt; Lighthouse</strong> sur le même site — lancer un audit Performance</li>
              <li>Ouvrir <strong>NumEcoDiag</strong> — parcourir les 5 premières questions — montrer le rapport final</li>
            </ol>
            <p class="text-green-400 text-xs mt-3 font-semibold">Ces 3 outils sont gratuits, sans installation, et officiels pour deux d'entre eux. Aucune raison de ne pas s'en servir dès demain.</p>
          </div>
        `,
        messageFormateur: "Votre outil de premier audit : NumEcoDiag. Gratuit, officiel DINUM, 20 minutes pour un service complet. Ouvrez-le dès maintenant sur votre service actuel.",
      },
    ],
    ressources: [
      { label: 'EcoIndex', url: 'https://ecoindex.fr' },
      { label: 'NumEcoDiag (DINUM)', url: 'https://ecoresponsable.numerique.gouv.fr/numecodiag' },
      { label: 'CodeCarbon', url: 'https://codecarbon.io' },
    ],
  },
];

export const PROGRAMME = [
  { horaire: '08h30', titre: 'Accueil & Icebreaker', type: 'quiz', duree: '20 min', slug: '/platform/quiz/icebreaker' },
  { horaire: '08h50', titre: 'Module 01 — Enjeux du numérique', type: 'theorie', duree: '45 min', slug: '/platform/module/enjeux-numerique' },
  { horaire: '09h35', titre: 'Module 02 — Le RGESN', type: 'theorie', duree: '50 min', slug: '/platform/module/rgesn' },
  { horaire: '10h25', titre: 'Pause', type: 'pause', duree: '15 min', slug: null },
  { horaire: '10h40', titre: 'Lab 01 — Audit collectif RGESN', type: 'atelier', duree: '1h15', slug: '/platform/lab/lab-01' },
  { horaire: '11h55', titre: 'Quiz mi-journée', type: 'quiz', duree: '15 min', slug: '/platform/quiz/mi-journee' },
  { horaire: '12h20', titre: 'Déjeuner', type: 'pause', duree: '1h10', slug: null },
  { horaire: '13h30', titre: 'Module 03 — Mesurer l\'empreinte', type: 'theorie', duree: '40 min', slug: '/platform/module/mesurer' },
  { horaire: '14h10', titre: 'Lab 02 — Atelier multi-profils', type: 'atelier', duree: '1h15', slug: '/platform/lab/lab-02' },
  { horaire: '15h35', titre: 'Plan d\'action individuel', type: 'exercice', duree: '20 min', slug: '/platform/plan-action' },
  { horaire: '15h55', titre: 'Quiz final', type: 'quiz', duree: '20 min', slug: '/platform/quiz/final' },
  { horaire: '16h20', titre: 'Évaluation de la formation', type: 'formulaire', duree: '10 min', slug: '/platform/evaluation' },
];
