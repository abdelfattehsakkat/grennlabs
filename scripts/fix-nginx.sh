#!/bin/bash
# Script de fix rapide pour nginx Docker
# Remplace la config actuelle par une version HTTP simple (sans SSL)

set -e

echo "🔧 Fix nginx Docker - passage en HTTP simple"
echo "============================================="
echo ""

# Vérifier qu'on est dans le bon répertoire
if [ ! -f "docker-compose.yml" ]; then
    echo "❌ Erreur: docker-compose.yml introuvable"
    echo "   Exécutez ce script depuis la racine du projet"
    exit 1
fi

echo "📋 Sauvegarde de l'ancienne configuration..."
if [ -f "nginx/nginx.conf" ]; then
    cp nginx/nginx.conf nginx/nginx.conf.backup.$(date +%Y%m%d_%H%M%S)
    echo "✅ Backup créé"
fi

echo ""
echo "🔄 Remplacement par la config HTTP simple..."
cp nginx/nginx.conf.http nginx/nginx.conf

echo ""
echo "🔄 Redémarrage de nginx..."
docker compose restart nginx

echo ""
echo "⏳ Attente de 3 secondes..."
sleep 3

echo ""
echo "📊 Statut des conteneurs..."
docker compose ps

echo ""
echo "✅ Fix terminé !"
echo ""
echo "🌐 Testez l'accès :"
echo "   http://51.178.141.50:85"
echo ""
