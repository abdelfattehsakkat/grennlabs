# Green IT Formation — Structure du projet

## Vue d'ensemble

Ce dossier contient l'intégralité du contenu pédagogique de la formation **Green IT & Écoconception Numérique (RGESN)** au format Markdown.
Ces fichiers sont la **source de vérité** pour la plateforme Next.js à construire.

---

## Structure des fichiers

```
content/
├── plan-de-cours.md              # Document maître — timing, objectifs, vue d'ensemble
├── module-01-enjeux.md           # Théorie : enjeux, scopes GHG, réglementation
├── module-02-rgesn.md            # Théorie : RGESN, 9 thématiques, matrice profils
├── module-03-mesurer.md          # Théorie : outils de mesure par profil, démo live
├── quiz/
│   ├── quiz-icebreaker.md        # 5 questions d'entrée (non noté)
│   ├── quiz-mi-journee.md        # 5 questions de consolidation (noté)
│   └── quiz-final.md             # 10 questions d'évaluation (noté, attestation)
├── labs/
│   ├── lab-01-audit-rgesn.md    # Audit collectif — service fictif, 12 critères
│   └── lab-02-pratique.md       # Atelier par profil (Dev / QA / CP)
└── ressources/
    └── ressources.md             # Liens officiels + glossaire
```

---

## Convention des fichiers

Chaque fichier commence par un **frontmatter YAML** qui fournit les métadonnées structurées.
Le contenu pédagogique suit en Markdown avec des **blocs YAML imbriqués** pour les données structurées (questions, critères, exemples de code).

### Frontmatter commun

```yaml
---
id: string                    # Identifiant unique — utilisé pour les routes Next.js
titre: string                 # Titre affiché dans l'interface
type: theorie|quiz|lab|ressource
duree: number                 # Durée en minutes
profils: [all|dev|qa|cp]      # Publics concernés
objectif: string              # Objectif pédagogique
---
```

### Types de contenu

| Type | Frontmatter clé | Composant Next.js suggéré |
|---|---|---|
| `theorie` | `slides_count`, `ressources` | `ModulePlayer` |
| `quiz` | `scoring`, `seuil_reussite`, `affichage_resultats` | `QuizPlayer` |
| `lab` | `groupes`, `livrable`, `plateforme.composant` | `LabGuide` |
| `ressource` | — | `RessourcePage` |

---

## Architecture plateforme suggérée (Next.js App Router)

```
platform/
├── app/
│   ├── page.tsx                    # Accueil / tableau de bord
│   ├── formation/
│   │   ├── page.tsx                # Programme de la journée
│   │   └── [moduleId]/page.tsx    # Affichage d'un module théorique
│   ├── quiz/
│   │   └── [quizId]/page.tsx      # Lecteur de quiz interactif
│   ├── lab/
│   │   └── [labId]/page.tsx       # Guide de lab avec exercices
│   ├── ressources/
│   │   └── page.tsx               # Liens et glossaire
│   └── evaluation/
│       └── page.tsx               # Formulaire d'évaluation de la formation
├── components/
│   ├── ModulePlayer.tsx            # Lecteur de module théorique
│   ├── QuizPlayer.tsx              # Composant quiz avec scoring
│   ├── LabGuide.tsx                # Guide de lab par profil
│   ├── ProfilSelector.tsx          # Sélecteur de profil (Dev/QA/CP)
│   ├── ProgressBar.tsx             # Progression dans la journée
│   └── RatingForm.tsx             # Formulaire d'évaluation à chaud
├── lib/
│   ├── content.ts                  # Parseur des fichiers .md avec gray-matter
│   ├── quiz.ts                     # Logique de scoring et correction
│   └── types.ts                    # Types TypeScript des entités
└── content/ → symlink vers ../content/
```

---

## Guide de parsing pour l'IA

### Lire le frontmatter

```typescript
// lib/content.ts
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export function getContent(filename: string) {
  const filePath = path.join(process.cwd(), 'content', filename)
  const raw = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)
  return { frontmatter: data, content }
}
```

### Parser les blocs YAML imbriqués dans le Markdown

Les fichiers contiennent des blocs de données structurées entre balises de code yaml :

````markdown
```yaml
questions:
  - id: "q1"
    enonce: "Question..."
    options:
      - id: "a"
        texte: "Réponse A"
        correct: false
```
````

Pour les extraire et les utiliser dans React :

```typescript
import yaml from 'js-yaml'

function extractYamlBlocks(markdown: string): Record<string, unknown>[] {
  const yamlBlockRegex = /```yaml\n([\s\S]*?)```/g
  const blocks: Record<string, unknown>[] = []
  let match

  while ((match = yamlBlockRegex.exec(markdown)) !== null) {
    try {
      const parsed = yaml.load(match[1])
      if (parsed && typeof parsed === 'object') {
        blocks.push(parsed as Record<string, unknown>)
      }
    } catch (e) {
      console.error('Erreur parsing YAML block:', e)
    }
  }

  return blocks
}
```

---

## Types TypeScript recommandés

```typescript
// lib/types.ts

export type Profil = 'all' | 'dev' | 'qa' | 'cp'
export type ContentType = 'theorie' | 'quiz' | 'lab' | 'ressource'
export type ConformiteRGESN = 'C' | 'NC' | 'NA'
export type AffichageResultats = 'apres_chaque_question' | 'apres_correction_collective'

export interface ContentFrontmatter {
  id: string
  titre: string
  type: ContentType
  duree: number
  profils: Profil[]
  objectif: string
  ordre?: number
  scoring?: boolean
  seuil_reussite?: number
  score_max?: number
  attestation?: boolean
  affichage_resultats?: AffichageResultats
}

export interface QuizOption {
  id: string
  texte: string
  correct: boolean
  note?: string
}

export interface QuizQuestion {
  id: string
  ordre: number
  enonce: string
  type: 'choix_unique' | 'choix_multiple' | 'classement'
  options: QuizOption[]
  explication: string
  source?: string
  points?: number
  module_source?: string
}

export interface LabCritere {
  id: string
  numero: number
  thematique: string
  intitule: string
  description_evaluateur: string
  indices_disponibles: string[]
  reponse_correcte: string
  reponse_acceptable?: string[]
  justification_formateur: string
  niveau_difficulte: string
  effet_pedagogique: string
}

export interface ScoreMessage {
  plage: [number, number]
  titre: string
  message: string
  action: string
}
```

---

## Fonctionnalités de la plateforme

### Priorité 1 — MVP

| Fonctionnalité | Page | Composant | Source MD |
|---|---|---|---|
| Afficher le programme de la journée | `/formation` | `ProgrammePage` | `plan-de-cours.md` |
| Lire un module théorique | `/formation/[id]` | `ModulePlayer` | `module-0x-*.md` |
| Jouer un quiz avec correction | `/quiz/[id]` | `QuizPlayer` | `quiz/*.md` |
| Afficher un guide de lab | `/lab/[id]` | `LabGuide` | `labs/*.md` |
| Télécharger le support PDF | `/ressources` | `DownloadButton` | Fichier PDF généré |
| Évaluation à chaud de la formation | `/evaluation` | `RatingForm` | Formulaire custom |

### Priorité 2 — V1.1

| Fonctionnalité | Description |
|---|---|
| Sélection de profil | L'utilisateur choisit Dev / QA / CP au début — affichage adapté |
| Score et attestation | Quiz final noté, attestation PDF générée si score ≥ 6/10 |
| Progression dans la journée | Barre de progression visuelle sur l'ensemble des blocs |
| Historique des scores | Sauvegarde locale (localStorage) des scores de quiz |

### Priorité 3 — V2

| Fonctionnalité | Description |
|---|---|
| Espace formateur | Dashboard avec résultats agrégés des quiz par session |
| Authentification | Accès réservé aux salariés de l'ESN (SSO ou code d'accès) |
| Mode hors ligne | PWA pour utilisation sans connexion en salle de formation |

---

## Dépendances npm recommandées

```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "gray-matter": "^4.0.3",
    "js-yaml": "^4.1.0",
    "remark": "^15.0.0",
    "remark-html": "^16.0.0",
    "jspdf": "^2.5.1"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "@types/js-yaml": "^4.0.9",
    "tailwindcss": "^3.4.0"
  }
}
```
