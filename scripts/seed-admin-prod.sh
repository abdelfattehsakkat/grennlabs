#!/bin/bash
# Script de seed pour production VPS
# Crée un compte admin par défaut dans le conteneur Docker backend

set -e

echo "🌱 Création du compte admin en production..."

# Vérifier que le backend est en cours d'exécution
if ! docker ps | grep -q "greenit-backend"; then
    echo "❌ Erreur: Le conteneur backend n'est pas en cours d'exécution"
    echo "Lancez d'abord: docker compose up -d"
    exit 1
fi

# Créer le compte admin dans le conteneur
docker exec greenit-backend node -e "
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

async function seed() {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      console.error('❌ MONGO_URI non défini dans l\'environnement');
      process.exit(1);
    }
    
    console.log('📡 Connexion à MongoDB...');
    await mongoose.connect(uri);
    console.log('✅ Connecté à MongoDB');
    
    // Définir le schéma User
    const UserSchema = new mongoose.Schema(
      {
        email:        { type: String, required: true, unique: true, lowercase: true, trim: true },
        passwordHash: { type: String, required: true },
        nom:          { type: String, required: true },
        prenom:       { type: String, required: true },
        role:         { type: String, enum: ['stagiaire', 'formateur', 'admin'], default: 'stagiaire' },
        actif:        { type: Boolean, default: true },
      },
      { timestamps: true }
    );
    
    const User = mongoose.model('User', UserSchema);
    
    // Vérifier si l'admin existe déjà
    const existingAdmin = await User.findOne({ email: 'admin@greenit.com' });
    if (existingAdmin) {
      console.log('ℹ️  Admin existe déjà: admin@greenit.com');
      await mongoose.disconnect();
      process.exit(0);
    }
    
    // Créer l'admin avec mot de passe hashé
    const passwordHash = await bcrypt.hash('admin123', 12);
    await User.create({
      email: 'admin@greenit.com',
      passwordHash,
      nom: 'Admin',
      prenom: 'Green IT',
      role: 'admin',
      actif: true
    });
    
    console.log('✅ Admin créé: admin@greenit.com / admin123');
    console.log('⚠️  IMPORTANT: Changez ce mot de passe après la première connexion !');
    
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('❌ Erreur:', err.message);
    process.exit(1);
  }
}

seed();
"

echo ""
echo "✅ Seed terminé avec succès !"
echo ""
echo "📝 Identifiants de connexion:"
echo "   Email: admin@greenit.com"
echo "   Mot de passe: admin123"
echo ""
echo "⚠️  IMPORTANT: Changez ce mot de passe après la première connexion !"
