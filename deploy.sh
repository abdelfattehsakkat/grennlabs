#!/bin/bash
set -e

echo "=== Déploiement Green IT Platform ==="

# Pull le dernier code
git pull origin main

# Rebuild et redémarrer les services modifiés
docker compose up -d --build --remove-orphans

# Nettoyer les images orphelines
docker image prune -f

echo "=== Déploiement terminé ==="
docker compose ps
