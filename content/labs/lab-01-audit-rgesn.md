---
id: lab-01
type: atelier
duree: 1h15
total_steps: 4
service_fictif: MonServicePublicFr
fichier_app: apps/frontend/src/data/labs.ts (objet id: 'lab-01')
---

# Lab 01 — Audit collectif RGESN

## Service fictif "MonServicePublicFr"
- Portail de demande de documents administratifs
- Stack : React / Spring Boot / PostgreSQL / AWS Paris
- 50 000 utilisateurs/mois, mobile-first
- Équipe : 4 devs, 1 QA, 1 CP — sans référent écoconception

## 12 critères à auditer (Conforme / Non conforme / N/A)

| # | Critère | Thématique | Verdict attendu |
|---|---------|------------|-----------------|
| 1 | Référent écoconception désigné | Stratégie | Non conforme |
| 2 | Fonctionnalités justifiées par besoin réel | Spécification | Ambigu |
| 3 | Architecture adaptée à la charge | Architecture | Conforme |
| 4 | Pas d'actions auto sans utilisateur | UX | Non conforme (autoplay) |
| 5 | Images optimisées | Contenus | Non conforme (PNG 2Mo) |
| 6 | Nb de requêtes HTTP minimisé | Frontend | Ambigu (127 requêtes) |
| 7 | Cache serveur utilisé | Backend | Conforme (Redis) |
| 8 | Requêtes BDD optimisées | Backend | Non conforme (N+1) |
| 9 | Hébergeur publie bilan carbone | Hébergement | Conforme (AWS) |
| 10 | Durée conservation données définie | Backend | Non conforme |
| 11 | Service fonctionne sur équipements anciens | UX | Ambigu |
| 12 | Empreinte mesurée et suivie | Stratégie | Non conforme |

## Notes pour l'agent AI
Ce tableau sert à peupler les steps du lab-01 dans labs.ts
Chaque `consigne` HTML doit présenter les critères sous forme de tableau interactif
