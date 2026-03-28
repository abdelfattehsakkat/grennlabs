# GreenLabs Platform

Plateforme de formation Green IT — NestJS (backend) + Next.js (frontend) + MongoDB + Nginx.

## Architecture

```
grennlabs/
├── apps/
│   ├── backend/        # API NestJS (port 3006)
│   └── frontend/       # Next.js (port 3005)
├── nginx/              # Reverse proxy (ports 85 / 448)
├── docker-compose.yml          # Production
├── docker-compose.local.yml    # Dev local (sans nginx)
├── deploy.sh                   # Script de déploiement VPS
└── .env.example                # Variables d'environnement à remplir
```

---

## 1. Prérequis

| Outil | Version minimale |
|-------|-----------------|
| Docker | 24+ |
| Docker Compose | v2 (inclus dans Docker Desktop) |
| Git | 2+ |

---

## 2. Déploiement en local (dev)

```bash
# 1. Cloner le repo
git clone https://github.com/abdelfattehsakkat/grennlabs.git
cd grennlabs

# 2. Créer le fichier .env
cp .env.example .env
# Éditer .env : renseigner JWT_SECRET (au moins 32 caractères aléatoires)

# 3. Démarrer sans nginx (mode local)
docker compose -f docker-compose.yml -f docker-compose.local.yml up -d --build

# 4. Vérifier que tout tourne
docker compose ps
```

Accès :
- Frontend : http://localhost:3005
- API : http://localhost:3006
- MongoDB (dev) : localhost:27022

---

## 3. Premier déploiement sur VPS

```bash
# 1. Se connecter en SSH
ssh user@<IP_VPS>

# 2. Cloner le repo
git clone https://github.com/abdelfattehsakkat/grennlabs.git
cd grennlabs

# 3. Créer .env de production
cp .env.example .env
nano .env
# Renseigner :
#   JWT_SECRET=<64 chars aléatoires>
#   FRONTEND_URL=https://votre-domaine.com
#   NEXT_PUBLIC_API_URL=https://votre-domaine.com/api

# 4. S'assurer que les certificats SSL sont dans nginx/certs/
#    (Let's Encrypt ou certificats manuels)

# 5. Lancer le déploiement
chmod +x deploy.sh
./deploy.sh
```

Accès :
- Frontend : https://votre-domaine.com (port 448) ou http (port 85)
- API : https://votre-domaine.com/api

---

## 4. Mises à jour sur VPS (re-déploiement)

Le script `deploy.sh` gère tout : pull + rebuild + restart.

```bash
cd grennlabs
./deploy.sh
```

Ce script :
1. `git pull origin main` — récupère le dernier code
2. `docker compose up -d --build --remove-orphans` — rebuild uniquement les images modifiées
3. `docker image prune -f` — nettoie les vieilles images
4. Affiche l'état des conteneurs

---

## 5. Variables d'environnement

| Variable | Description | Exemple |
|----------|-------------|---------|
| `JWT_SECRET` | Clé secrète JWT **(obligatoire, min 32 chars)** | `openssl rand -hex 32` |
| `JWT_EXPIRES_IN` | Durée validité token | `8h` |
| `MONGO_URI` | URI MongoDB (interne Docker) | `mongodb://mongodb:27017/greenit` |
| `FRONTEND_URL` | URL du frontend (pour CORS) | `https://votre-domaine.com` |
| `NEXT_PUBLIC_API_URL` | URL de l'API vue du browser | `https://votre-domaine.com/api` |
| `PORT` | Port du serveur Next.js | `3005` |

---

## 6. Commandes utiles

```bash
# Voir les logs en direct
docker compose logs -f

# Logs d'un seul service
docker compose logs -f backend
docker compose logs -f frontend

# Redémarrer un service
docker compose restart backend

# Arrêter tout
docker compose down

# Arrêter et supprimer les volumes (⚠️ efface la base MongoDB)
docker compose down -v
```

---

## 7. GitHub Actions (CI/CD)

À chaque push sur `main`, GitHub Actions construit et publie automatiquement les images Docker sur **GitHub Container Registry (GHCR)** :

- `ghcr.io/abdelfattehsakkat/grennlabs-backend:latest`
- `ghcr.io/abdelfattehsakkat/grennlabs-frontend:latest`

Pour utiliser ces images pré-buildées sur le VPS plutôt que de rebuilder :

```yaml
# Dans docker-compose.yml, remplacer "build:" par "image:" :
backend:
  image: ghcr.io/abdelfattehsakkat/grennlabs-backend:latest

frontend:
  image: ghcr.io/abdelfattehsakkat/grennlabs-frontend:latest
```
