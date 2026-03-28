---
id: lab-02
type: atelier
duree: 1h15
total_steps: 3
profils: dev | qa | cp
service_fictif: MonServicePublicFr (même que lab-01)
fichier_app: apps/frontend/src/data/labs.ts (objet id: 'lab-02')
---

# Lab 02 — Atelier pratique multi-profils

## Angle Développeur
### Anti-patterns à corriger (Spring Boot + React)
1. Requête N+1 JPA → JOIN FETCH → Critère Backend 07
2. Image PNG 2Mo → WebP + lazy loading → Critère Contenus 05
3. Appel API à chaque render → useMemo / Redis → Critère Frontend 06

**Livrable :** Commentaires de MR avec référence RGESN

## Angle QA / Analyste
### User stories à réécrire (ajout critères acceptance verts)
1. "Afficher liste des demandes" → ajouter : poids de page < 500Ko, < 50 requêtes HTTP
2. "Uploader un document" → ajouter : compression auto, format WebP
3. "Recevoir une notification" → ajouter : pas d'email inutile, canal le moins impactant

**Livrable :** 3 US en format Gherkin avec critères mesurables

## Angle Chef de projet / Manager
### Section Stratégie déclaration d'écoconception
1. Désigner référent écoconception (nom + rôle)
2. Définir 3 KPIs trimestriels (ex: EcoIndex ≥ B, score RGESN ≥ 60%, nb serveurs réduit)
3. Rédiger engagement équipe 5 lignes

**Livrable :** Template déclaration d'écoconception officielle

## Notes pour l'agent AI
Le champ `consigne` HTML du step 1 doit afficher les 3 profil-cards côte à côte
Le step 2 doit contenir des extraits de code (balises `<pre><code>`) pour le profil Dev
et les user stories pour QA
