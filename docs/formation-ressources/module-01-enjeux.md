---
id: module-01-enjeux
titre: "Les enjeux du numérique responsable"
ordre: 1
duree: 45
type: theorie
profils: [all]
objectif: "Comprendre l'impact réel du numérique, la règle des 80/20, les scopes GHG Protocol, et le cadre réglementaire français."
slides_count: 15
ressources:
  - label: "Rapport numérique responsable GreenIT.fr 2023"
    url: "https://greenit.fr/etude-empreinte-environnementale-du-numerique-mondial/"
  - label: "ADEME — Empreinte environnementale du numérique en France"
    url: "https://www.ademe.fr/numerique"
  - label: "Arcep — Rapport sur l'empreinte environnementale du numérique 2023"
    url: "https://www.arcep.fr/nos-sujets/numerique-et-environnement.html"
---

# Module 01 — Les enjeux du numérique responsable

## 1.1 — L'empreinte réelle du numérique

### Messages clés

- Le numérique représente environ 4% des émissions mondiales de gaz à effet de serre, en croissance de 8% par an
- La règle des 80/20 : 80% de l'empreinte vient de la fabrication des équipements, 20% seulement de l'usage
- Les 3 postes dominants dans l'ordre : terminaux utilisateurs, réseaux, datacenters
- Contre-intuitif : la 5G, le cloud et le streaming ne sont pas les premiers responsables

### Chiffres à retenir

```yaml
chiffres:
  - valeur: "~4%"
    description: "des émissions mondiales de GES dues au numérique"
    source: "GreenIT.fr 2023"
  - valeur: "+8%/an"
    description: "croissance des émissions numériques mondiales"
    source: "The Shift Project"
  - valeur: "80%"
    description: "de l'empreinte d'un terminal vient de sa fabrication"
    source: "ADEME 2022"
  - valeur: "34 milliards"
    description: "d'équipements numériques dans le monde"
    source: "GreenIT.fr 2023"
```

### Exemples concrets (à utiliser en formation)

```yaml
exemples:
  - objet: "Smartphone neuf"
    fabrication_kgco2e: 70
    usage_par_an_kgco2e: 1.5
    message: "Garder son téléphone 1 an de plus = économiser 70 kgCO₂e"
  - objet: "1h de visioconférence"
    emission_gco2e: 150
    equivalent: "800 mètres en voiture thermique"
    source: "Carbon Trust"
  - objet: "1 email sans pièce jointe (10 destinataires)"
    emission_gco2e: 4
    source: "ADEME"
  - objet: "1 email avec pièce jointe 1Mo"
    emission_gco2e: 19
    source: "ADEME"
  - objet: "1h de streaming vidéo HD"
    emission_gco2e: 36
    note: "L'écran consomme plus que le réseau et le datacenter réunis"
    source: "The Shift Project"
  - objet: "1 recherche Google"
    emission_gco2e: 0.2
    note: "Mais 8,5 milliards de recherches/jour dans le monde"
    source: "Google Environmental Report"
```

### Message formateur

> "Le levier n°1 ce n'est pas d'éteindre les serveurs. C'est de garder les équipements plus longtemps et d'éviter de créer des services inutiles. Un service numérique qui n'est pas créé a une empreinte carbone de zéro."

### Répartition de l'empreinte par poste

```yaml
repartition_empreinte:
  - poste: "Terminaux utilisateurs"
    part_percent: 70
    detail: "Fabrication des smartphones, PC, tablettes, écrans"
  - poste: "Réseaux"
    part_percent: 20
    detail: "Infrastructure fibre, 4G/5G, routeurs, équipements actifs"
  - poste: "Datacenters"
    part_percent: 10
    detail: "Serveurs, stockage, refroidissement"
```

---

## 1.2 — Les scopes GHG Protocol appliqués au SI

### Messages clés

- Le GHG Protocol divise les émissions en 3 scopes pour éviter les doubles comptages
- Pour une ESN, plus de 80% de l'empreinte est en scope 3 — souvent ignoré car difficile à mesurer
- Scope 3 ne veut pas dire hors de contrôle : les choix d'architecture, de stack et d'équipements le réduisent directement

### Définition des scopes

```yaml
scopes:
  - numero: 1
    nom: "Émissions directes"
    description: "Émissions produites directement par l'organisation"
    exemples_SI:
      - "Datacenter on-premise avec groupes électrogènes"
      - "Véhicules de l'entreprise"
      - "Climatisation des locaux"
    part_ESN_percent: "<5"

  - numero: 2
    nom: "Émissions indirectes — énergie achetée"
    description: "Électricité, chaleur ou vapeur achetée à un tiers"
    exemples_SI:
      - "Facture électrique du datacenter"
      - "Électricité des bureaux et salles serveur"
    part_ESN_percent: "5-15"
    note: "Dépend fortement du mix énergétique du pays hébergeur"

  - numero: 3
    nom: "Autres émissions indirectes"
    description: "Toutes les émissions liées à la chaîne de valeur"
    exemples_SI:
      - "Fabrication des laptops et smartphones des salariés"
      - "Cloud AWS / Azure / GCP"
      - "Réseau internet (FAI)"
      - "Déplacements professionnels"
      - "Télétravail des salariés"
    part_ESN_percent: ">80"
```

### Exercice rapide en formation (5 min)

```yaml
exercice_scopes:
  consigne: "Pour chacun des postes suivants, indiquez le scope GHG correspondant (1, 2 ou 3)"
  items:
    - poste: "Laptop fourni à un développeur"
      reponse: 3
      explication: "Fabrication = scope 3 (amont)"
    - poste: "Facture électrique du datacenter on-premise"
      reponse: 2
      explication: "Électricité achetée = scope 2"
    - poste: "Serveur physique dans la salle serveur de l'ESN"
      reponse: 1
      explication: "Asset direct = scope 1"
    - poste: "Instance AWS EC2 utilisée pour un projet client"
      reponse: 3
      explication: "Cloud = scope 3 (aval)"
    - poste: "Vol Paris-Lyon pour une mission consultant"
      reponse: 3
      explication: "Déplacement = scope 3"
    - poste: "Smartphone perso utilisé en 2FA"
      reponse: 3
      explication: "Équipement utilisateur = scope 3"
    - poste: "Climatisation de la salle serveur"
      reponse: 1
      explication: "Émission directe des locaux = scope 1"
    - poste: "Télétravail d'un salarié (électricité domicile)"
      reponse: 3
      explication: "Scope 3 aval selon le protocole GHG"
```

### Message formateur

> "Si votre ESN ne mesure que ses factures d'électricité, elle voit moins de 20% de son empreinte réelle. Le scope 3, c'est là où tout se joue — et c'est là que vos décisions techniques ont le plus d'impact."

---

## 1.3 — Le cadre réglementaire français

### Messages clés

- La réglementation crée la demande : vos clients vont vous demander du RGESN dans les appels d'offres
- La loi REEN est française, la CSRD est européenne — elles se complètent
- Ce n'est pas encore obligatoire pour les ESN privées, mais c'est une question de mois/années

### Textes réglementaires

```yaml
reglementation:
  - nom: "Loi REEN"
    nom_complet: "Loi visant à Réduire l'Empreinte Environnementale du Numérique"
    annee: 2021
    portee: "France"
    contenu: "Obligations progressives de déclaration d'écoconception pour les services numériques publics"
    impact_ESN: "Les clients publics doivent publier une déclaration d'écoconception basée sur le RGESN — ils vont l'exiger dans les AO"
    lien: "https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000044553808"

  - nom: "RGESN"
    nom_complet: "Référentiel Général d'Écoconception des Services Numériques"
    annee_v1: 2022
    annee_v2: 2024
    portee: "France"
    porteurs: ["Arcep", "DINUM", "MiNumEco", "INR"]
    contenu: "78 critères d'écoconception répartis en 9 thématiques"
    impact_ESN: "Standard de facto pour les projets numériques publics en France"
    lien: "https://www.arcep.fr/nos-sujets/numerique-et-environnement.html"

  - nom: "CSRD"
    nom_complet: "Corporate Sustainability Reporting Directive"
    annee: 2024
    portee: "Union Européenne"
    contenu: "Obligation de reporting ESG pour les grandes entreprises (>500 salariés d'abord, puis PME)"
    impact_ESN: "Les grandes ESN (Capgemini, Sopra, Atos...) doivent déjà reporter. Les sous-traitants seront sollicités pour fournir leurs données."
    lien: "https://finance.ec.europa.eu/capital-markets-union-and-financial-markets/company-reporting-and-auditing/company-reporting/corporate-sustainability-reporting_en"

  - nom: "Directive Ecodesign"
    nom_complet: "EU Ecodesign for Sustainable Products Regulation"
    annee: 2024
    portee: "Union Européenne"
    contenu: "Obligations d'écoconception sur les produits physiques mis sur le marché européen"
    impact_ESN: "Impact indirect sur les choix d'équipements recommandés aux clients"
```

### Message formateur

> "La loi REEN ne touche pas encore les ESN directement. Mais vos clients publics, eux, doivent publier une déclaration d'écoconception. Ils vont vous la demander dans les AO. La question n'est pas 'est-ce qu'on va devoir le faire', c'est 'quand'. C'est maintenant qu'il faut se former."

### Points de vigilance formateur

```yaml
points_vigilance:
  - "Ne pas dire que le RGESN est obligatoire pour les ESN privées — c'est faux aujourd'hui"
  - "Ne pas confondre RGESN (écoconception) et GR491 (numérique responsable au sens large)"
  - "Ne pas promettre que la conformité RGESN suffit pour répondre à la CSRD — ce sont deux périmètres différents"
  - "La loi REEN a des décrets d'application progressifs — vérifier la date de la formation pour ajuster"
```
