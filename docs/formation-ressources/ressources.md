---
id: ressources-liens-officiels
titre: "Ressources officielles et outils"
type: ressource
profils: [all]
---

# Ressources officielles

## Référentiels et textes officiels

```yaml
referentiels:
  - nom: "RGESN 2024 — PDF complet"
    description: "Référentiel Général d'Écoconception des Services Numériques, version 2024. 78 critères, 9 thématiques."
    url: "https://www.arcep.fr/uploads/tx_gspublication/referentiel_general_ecoconception_des_services_numeriques_version_2024.pdf"
    format: "PDF"
    editeur: "Arcep / DINUM / MiNumEco / INR"
    gratuit: true

  - nom: "Tableur autoévaluation RGESN (.xlsx)"
    description: "Outil officiel de déclaration et d'autoévaluation RGESN. À utiliser pour auditer un service."
    url: "https://www.arcep.fr/fileadmin/user_upload/nos-sujets/environnement/rgesn_2024_outil_declaration_ecoconception.xlsx"
    format: "XLSX"
    editeur: "Arcep"
    gratuit: true

  - nom: "Tableur autoévaluation RGESN (.ods)"
    description: "Version ODS du tableur officiel (compatible LibreOffice)."
    url: "https://www.arcep.fr/fileadmin/user_upload/nos-sujets/environnement/rgesn_2024_outil_declaration_ecoconception.ods"
    format: "ODS"
    editeur: "Arcep"
    gratuit: true

  - nom: "Loi REEN — Texte intégral"
    description: "Loi n° 2021-1485 du 15 novembre 2021 visant à réduire l'empreinte environnementale du numérique en France."
    url: "https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000044553808"
    format: "Web"
    editeur: "Légifrance"
    gratuit: true
```

## Outils de mesure

```yaml
outils_mesure:
  - nom: "EcoIndex"
    description: "Score A→G d'écoconception d'une page web basé sur DOM, requêtes HTTP et poids."
    url: "https://www.ecoindex.fr"
    type: "Web — gratuit"
    profils: ["Développeur", "QA"]
    integration_ci: true
    api_disponible: true

  - nom: "NumEcoDiag"
    description: "Outil officiel DINUM basé sur le RGESN. Questionnaire guidé avec rapport PDF exportable."
    url: "https://ecoresponsable.numerique.gouv.fr/numecodiag/"
    type: "Web — gratuit — officiel"
    profils: ["Tous"]
    integration_ci: false

  - nom: "Lighthouse"
    description: "Audit de performance, accessibilité et SEO. Intégré à Chrome DevTools."
    url: "https://developer.chrome.com/docs/lighthouse/overview/"
    type: "Chrome DevTools — gratuit"
    profils: ["Développeur", "QA"]
    integration_ci: true
    cli: "npm install -g @lhci/cli"

  - nom: "CodeCarbon"
    description: "Librairie Python pour mesurer l'empreinte CO₂ d'un script (GPU/CPU/RAM)."
    url: "https://codecarbon.io"
    type: "Librairie Python — open source"
    profils: ["Développeur Backend", "Data Scientist"]
    installation: "pip install codecarbon"

  - nom: "Scaphandre"
    description: "Agent système qui mesure la consommation énergétique réelle d'un process Linux."
    url: "https://github.com/hubblo-org/scaphandre"
    type: "CLI Linux — open source (Rust)"
    profils: ["Développeur Backend", "DevOps"]

  - nom: "Cloud Carbon Footprint"
    description: "Dashboard open source d'empreinte carbone pour AWS, Azure et GCP."
    url: "https://www.cloudcarbonfootprint.org"
    type: "Open source — auto-hébergeable"
    profils: ["DevOps", "Chef de projet"]

  - nom: "Webpack Bundle Analyzer"
    description: "Visualisation du poids du bundle JavaScript pour identifier les dépendances inutiles."
    url: "https://github.com/webpack-contrib/webpack-bundle-analyzer"
    type: "npm — open source"
    profils: ["Développeur Frontend"]
    installation: "npm install --save-dev webpack-bundle-analyzer"

  - nom: "Boavizta API"
    description: "API open source pour calculer l'empreinte environnementale du matériel informatique."
    url: "https://github.com/Boavizta/boaviztapi"
    type: "API REST — open source"
    profils: ["Développeur", "DevOps"]
```

## Formations et communautés

```yaml
formations_communautes:
  - nom: "Fresque du Numérique"
    description: "Atelier collaboratif de 2h pour comprendre l'impact environnemental du numérique. Format fresque participative."
    url: "https://www.fresquedunumerique.io"
    duree: "2h"
    gratuit: true
    format: "Présentiel ou distanciel"
    recommandation: "Idéal pour lancer une démarche en équipe avant cette formation"

  - nom: "GreenIT.fr"
    description: "Référence française du numérique responsable. Rapports, guides, 115 bonnes pratiques."
    url: "https://www.greenit.fr"
    type: "Communauté / Blog"

  - nom: "INR — Institut du Numérique Responsable"
    description: "Porteur du GR491 et de la certification Practitioner Green IT."
    url: "https://institutnr.org"
    type: "Association"

  - nom: "MiNumEco"
    description: "Mission interministérielle numérique écoresponsable. Porteur des guides officiels et de NumEcoDiag."
    url: "https://ecoresponsable.numerique.gouv.fr"
    type: "Organisme public"

  - nom: "Practitioner Green IT"
    description: "Certification reconnue en France pour les praticiens du numérique responsable."
    url: "https://greenit.fr/formation/"
    type: "Certification payante"
    recommandation: "Pour aller plus loin après cette formation"
```

---
id: ressources-glossaire
titre: "Glossaire Green IT / RGESN"
type: ressource
profils: [all]
---

# Glossaire

```yaml
termes:
  - terme: "ACV (Analyse du Cycle de Vie)"
    definition: "Méthode d'évaluation de l'impact environnemental d'un produit ou service sur l'ensemble de son cycle de vie : fabrication, transport, usage, fin de vie."
    synonymes: ["LCA (Life Cycle Assessment)"]

  - terme: "Base Carbone"
    definition: "Base de données officielle de l'ADEME référençant les facteurs d'émission de GES pour calculer les empreintes carbone. Disponible sur bilans-ges.ademe.fr."

  - terme: "Bilan GES"
    definition: "Inventaire des émissions et absorptions de gaz à effet de serre d'une organisation sur une période donnée, généralement exprimé en tonnes de CO₂ équivalent (tCO₂e)."

  - terme: "CO₂e (CO₂ équivalent)"
    definition: "Unité de mesure qui normalise l'impact climatique de différents gaz à effet de serre en les convertissant en équivalent CO₂. Permet de comparer des gaz d'impacts différents (CH4, N2O, etc.)."

  - terme: "CSRD"
    definition: "Corporate Sustainability Reporting Directive. Directive européenne (2024) imposant aux grandes entreprises de publier un rapport de durabilité détaillé incluant leur impact environnemental et social."
    lien: "https://finance.ec.europa.eu/capital-markets-union-and-financial-markets/company-reporting-and-auditing/company-reporting/corporate-sustainability-reporting_en"

  - terme: "EcoIndex"
    definition: "Indicateur d'écoconception d'une page web, exprimé par une note de A (meilleur) à G (pire) calculée à partir du nombre d'éléments DOM, du nombre de requêtes HTTP et du poids total de la page."

  - terme: "Empreinte carbone"
    definition: "Quantité totale de gaz à effet de serre émise directement ou indirectement par une activité, exprimée en kgCO₂e ou tCO₂e."

  - terme: "Empreinte numérique"
    definition: "Ensemble des impacts environnementaux liés à l'utilisation du numérique : émissions de GES, consommation d'eau, utilisation de ressources minérales."

  - terme: "ESN"
    definition: "Entreprise de Services du Numérique. Anciennement appelée SSII (Société de Services en Ingénierie Informatique). Prestataire de services informatiques (développement, conseil, intégration)."

  - terme: "Écoconception"
    definition: "Démarche qui intègre les critères environnementaux dans la conception d'un produit ou service, dès les premières phases du projet."

  - terme: "Facteur d'émission"
    definition: "Valeur qui permet de convertir une donnée d'activité (kWh consommés, km parcourus...) en émissions de GES (kgCO₂e). Exemple : 1 kWh électrique en France = 0,052 kgCO₂e (mix 2023)."

  - terme: "GES (Gaz à Effet de Serre)"
    definition: "Gaz qui contribuent à l'effet de serre et au réchauffement climatique. Les principaux sont le CO₂, le méthane (CH4) et le protoxyde d'azote (N2O)."

  - terme: "GHG Protocol"
    definition: "Greenhouse Gas Protocol. Standard international de comptabilisation et de reporting des émissions de GES des organisations. Définit les 3 scopes d'émission."
    lien: "https://ghgprotocol.org"

  - terme: "GR491"
    definition: "Référentiel de 516 bonnes pratiques pour un numérique responsable, porté par l'INR. Couvre 3 piliers : People, Planet, Prosperity. Disponible uniquement en ligne sur gr491.isit-europe.org."

  - terme: "INR"
    definition: "Institut du Numérique Responsable. Association française qui promeut un numérique plus responsable. Porteur du GR491 et de la certification Practitioner Green IT."

  - terme: "Loi REEN"
    definition: "Loi française n° 2021-1485 du 15 novembre 2021 visant à Réduire l'Empreinte Environnementale du Numérique. Impose progressivement des obligations de déclaration d'écoconception pour les services numériques publics."

  - terme: "MiNumEco"
    definition: "Mission interministérielle numérique écoresponsable. Porteur des guides et référentiels officiels du gouvernement français sur le numérique responsable, dont NumEcoDiag."

  - terme: "Numérique responsable"
    definition: "Démarche globale visant à réduire l'empreinte environnementale, sociale et économique du numérique. Inclut l'écoconception, l'allongement de la durée de vie des équipements, et la sobriété numérique."

  - terme: "PUE (Power Usage Effectiveness)"
    definition: "Indicateur d'efficacité énergétique d'un datacenter. Ratio entre l'énergie totale consommée et l'énergie consommée uniquement par les serveurs. Un PUE de 1,0 est parfait (impossible en pratique). Un PUE de 1,2 est excellent."

  - terme: "RGESN"
    definition: "Référentiel Général d'Écoconception des Services Numériques. Référentiel officiel français de 78 critères (version 2024) pour concevoir des services numériques moins impactants. Porté par Arcep, DINUM, MiNumEco et INR."

  - terme: "Requête N+1"
    definition: "Anti-pattern de développement où N requêtes supplémentaires sont exécutées pour chaque élément d'une liste, au lieu d'une seule requête optimisée. Exemple : 1 requête pour la liste + 1 requête par élément pour ses détails."

  - terme: "Scope 1"
    definition: "Dans le GHG Protocol : émissions directes produites par les sources détenues ou contrôlées par l'organisation. Ex : générateurs, climatisation, véhicules de société."

  - terme: "Scope 2"
    definition: "Dans le GHG Protocol : émissions indirectes liées à la production d'énergie achetée (électricité, chaleur, vapeur). Ex : facture électrique du datacenter."

  - terme: "Scope 3"
    definition: "Dans le GHG Protocol : toutes les autres émissions indirectes dans la chaîne de valeur. Ex : fabrication des équipements, cloud, déplacements professionnels, télétravail. Représente souvent >80% de l'empreinte totale."

  - terme: "Sobriété numérique"
    definition: "Principe qui consiste à réduire l'usage du numérique aux besoins réels, en évitant les fonctionnalités inutiles, les équipements superflus et les usages non essentiels."

  - terme: "WebP"
    definition: "Format d'image développé par Google offrant une compression supérieure au JPEG et PNG avec une qualité visuelle équivalente. Réduction de poids de 25-80% selon les images. Supporté par tous les navigateurs modernes."
```
