#!/bin/bash
# Script de configuration du domaine greenitlabs.tn
# À exécuter sur la VPS une fois le domaine acheté et DNS configuré

set -e

echo "🌐 Configuration du domaine greenitlabs.tn"
echo "=========================================="
echo ""

# Vérifier si on est sur la VPS
if [ ! -d "/etc/nginx/sites-available" ]; then
    echo "❌ Erreur: Ce script doit être exécuté sur la VPS"
    echo "   /etc/nginx/sites-available n'existe pas"
    exit 1
fi

DOMAIN="greenitlabs.tn"
NGINX_AVAILABLE="/etc/nginx/sites-available/$DOMAIN"
NGINX_ENABLED="/etc/nginx/sites-enabled/$DOMAIN"
TEMPLATE="nginx/greenitlabs.tn.template"

# Étape 1 : Vérifier que le template existe
if [ ! -f "$TEMPLATE" ]; then
    echo "❌ Erreur: Template nginx introuvable : $TEMPLATE"
    echo "   Assurez-vous d'être dans le répertoire du projet"
    exit 1
fi

echo "✅ Template trouvé : $TEMPLATE"
echo ""

# Étape 2 : Copier le template
echo "📋 Copie du template vers /etc/nginx/sites-available..."
sudo cp "$TEMPLATE" "$NGINX_AVAILABLE"
echo "✅ Template copié"
echo ""

# Étape 3 : Créer le lien symbolique
if [ -L "$NGINX_ENABLED" ]; then
    echo "⚠️  Le site est déjà activé"
else
    echo "🔗 Activation du site..."
    sudo ln -s "$NGINX_AVAILABLE" "$NGINX_ENABLED"
    echo "✅ Site activé"
fi
echo ""

# Étape 4 : Tester la configuration
echo "🧪 Test de la configuration nginx..."
if sudo nginx -t; then
    echo "✅ Configuration nginx valide"
else
    echo "❌ Erreur dans la configuration nginx"
    echo "   Vérifiez les logs ci-dessus"
    exit 1
fi
echo ""

# Étape 5 : Recharger nginx
echo "🔄 Rechargement de nginx..."
sudo systemctl reload nginx
echo "✅ Nginx rechargé"
echo ""

# Étape 6 : Vérifier que les conteneurs tournent
echo "🐳 Vérification des conteneurs Docker..."
if docker ps | grep -q "greenit-frontend.*Up"; then
    echo "✅ Frontend : OK (port 3005)"
else
    echo "⚠️  Frontend non démarré"
fi

if docker ps | grep -q "greenit-backend.*Up"; then
    echo "✅ Backend : OK (port 3006)"
else
    echo "⚠️  Backend non démarré"
fi
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Configuration terminée !"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "🌐 Votre site est accessible sur : http://$DOMAIN"
echo ""
echo "📝 Prochaines étapes :"
echo ""
echo "1️⃣  Tester le site HTTP :"
echo "   curl -I http://$DOMAIN"
echo ""
echo "2️⃣  Obtenir les certificats SSL :"
echo "   sudo certbot --nginx -d $DOMAIN -d www.$DOMAIN"
echo ""
echo "3️⃣  Mettre à jour le .env du projet :"
echo "   NEXT_PUBLIC_API_URL=https://$DOMAIN/api"
echo "   FRONTEND_URL=https://$DOMAIN"
echo ""
echo "4️⃣  Reconstruire et redémarrer :"
echo "   docker compose down"
echo "   docker compose up -d --build"
echo ""
