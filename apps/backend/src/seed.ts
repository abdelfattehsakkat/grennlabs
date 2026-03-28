/**
 * Script de création du premier compte admin.
 * À exécuter UNE SEULE FOIS après le premier déploiement :
 *
 *   docker compose exec backend node dist/seed.js
 *
 * Le compte créé : admin@greenit.com
 * Le mot de passe initial sera communiqué séparément.
 * Pensez à le changer dès la première connexion.
 */

import * as path from 'path';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import * as bcrypt from 'bcryptjs';

// Charge le .env du répertoire où tourne le script (apps/backend/)
dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27022/greenit';

const UserSchema = new mongoose.Schema(
  {
    email:        { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    nom:          { type: String, required: true },
    prenom:       { type: String, required: true },
    role:         { type: String, enum: ['stagiaire', 'formateur', 'admin'], default: 'stagiaire' },
    actif:        { type: Boolean, default: true },
  },
  { timestamps: true },
);

const UserModel = mongoose.model('User', UserSchema);

// ─── Identifiants du premier admin ───────────────────────────────────────────
const ADMIN_EMAIL    = 'admin@greenit.com';
const ADMIN_PASSWORD = 'admin123';
// ─────────────────────────────────────────────────────────────────────────────

async function seed(): Promise<void> {
  console.log(`Connexion à MongoDB : ${MONGO_URI}`);
  await mongoose.connect(MONGO_URI);

  const existing = await UserModel.findOne({ email: ADMIN_EMAIL });
  if (existing) {
    console.log(`Admin déjà existant (${ADMIN_EMAIL}) — rien à faire.`);
    await mongoose.disconnect();
    process.exit(0);
  }

  const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 12);
  await UserModel.create({
    email:        ADMIN_EMAIL,
    passwordHash,
    nom:          'Admin',
    prenom:       'Green IT',
    role:         'admin',
    actif:        true,
  });

  console.log(`✓ Admin créé : ${ADMIN_EMAIL}`);
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err: Error) => {
  console.error('Erreur seed :', err.message);
  process.exit(1);
});
