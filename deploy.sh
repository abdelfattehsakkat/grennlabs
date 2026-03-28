#!/bin/bash
set -e

REPO_URL="https://github.com/abdelfattehsakkat/grennlabs.git"
APP_DIR="${APP_DIR:-/opt/grennlabs}"

echo "=== GreenLabs — Script de déploiement ==="

# ── Premier déploiement : clone si le dossier n'existe pas ──────────────────
if [ ! -d "$APP_DIR/.git" ]; then
  echo "[INFO] Dossier $APP_DIR absent ou non initialisé — clonage du repo..."
  git clone "$REPO_URL" "$APP_DIR"
  cd "$APP_DIR"

  if [ ! -f ".env" ]; then
    cp .env.example .env
    echo ""
    echo "⚠️  Fichier .env créé depuis .env.example."
    echo "    Veuillez l'éditer avant de continuer :"
    echo "    nano $APP_DIR/.env"
    echo ""
    echo "    Variables obligatoires :"
    echo "      JWT_SECRET         — au moins 32 caractères aléatoires"
    echo "      FRONTEND_URL       — ex: https://votre-domaine.com"
    echo "      NEXT_PUBLIC_API_URL — ex: https://votre-domaine.com/api"
    echo ""
    exit 0
  fi
else
  # ── Mise à jour : pull + rebuild ──────────────────────────────────────────
  cd "$APP_DIR"
  echo "[INFO] Mise à jour du code depuis origin/main..."
  git pull origin main
fi

# ── Vérifier que .env existe ──────────────────────────────────────────────
if [ ! -f ".env" ]; then
  echo "❌ Fichier .env manquant. Copiez .env.example et renseignez les valeurs :"
  echo "   cp .env.example .env && nano .env"
  exit 1
fi

# ── Rebuild et redémarrage ────────────────────────────────────────────────
echo "[INFO] Rebuild et démarrage des conteneurs..."
docker compose up -d --build --remove-orphans

# ── Nettoyage des images obsolètes ───────────────────────────────────────
docker image prune -f

echo ""
echo "✅ Déploiement terminé !"
docker compose ps
