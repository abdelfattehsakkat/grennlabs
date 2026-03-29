#!/bin/bash
# Script d'activation HTTPS pour Green IT
# À exécuter une fois le domaine configuré

set -e

echo "🔒 Activation HTTPS pour Green IT"
echo "=================================="
echo ""

# Vérifier si un domaine est fourni
if [ -z "$1" ]; then
    echo "❌ Erreur: Vous devez fournir le nom de domaine"
    echo ""
    echo "Usage: ./scripts/enable-https.sh votre-domaine.com"
    exit 1
fi

DOMAIN=$1

echo "📝 Domaine configuré: $DOMAIN"
echo ""

# Vérifier que nginx.conf existe
if [ ! -f nginx/nginx.conf ]; then
    echo "❌ Erreur: nginx/nginx.conf non trouvé"
    exit 1
fi

echo "🔄 Étape 1: Remplacement du domaine dans nginx.conf..."
sed -i.bak "s/YOUR_DOMAIN/$DOMAIN/g" nginx/nginx.conf

echo "🔄 Étape 2: Décommenter le bloc HTTPS..."
# Décommenter toutes les lignes entre les marqueurs HTTPS
sed -i.bak '/# server {/,/# }/s/^#   /    /' nginx/nginx.conf
sed -i.bak 's/^#   listen 448/    listen 448/' nginx/nginx.conf

echo "🔄 Étape 3: Redémarrage de nginx pour activer acme-challenge..."
docker compose restart nginx

echo ""
echo "⏳ Attente de 5 secondes..."
sleep 5

echo ""
echo "🔐 Étape 4: Obtention des certificats SSL avec Let's Encrypt..."
echo "Commande à exécuter manuellement:"
echo ""
echo "  docker compose exec nginx certbot certonly --webroot \\"
echo "    -w /var/www/certbot \\"
echo "    -d $DOMAIN \\"
echo "    --email votre-email@example.com \\"
echo "    --agree-tos \\"
echo "    --no-eff-email"
echo ""
read -p "Appuyez sur Entrée une fois les certificats obtenus..."

echo ""
echo "🔄 Étape 5: Redémarrage final de nginx avec HTTPS..."
docker compose restart nginx

echo ""
echo "✅ HTTPS activé avec succès !"
echo ""
echo "🌐 Votre site est accessible sur:"
echo "   - HTTP:  http://$DOMAIN:85"
echo "   - HTTPS: https://$DOMAIN:448"
echo ""
echo "📝 N'oubliez pas de mettre à jour votre .env:"
echo "   NEXT_PUBLIC_API_URL=https://$DOMAIN:448/api"
echo "   FRONTEND_URL=https://$DOMAIN:448"
echo ""
