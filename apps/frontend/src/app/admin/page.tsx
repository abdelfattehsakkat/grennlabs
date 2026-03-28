'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { useAuth } from '@/lib/auth';
import { Leaf, UserPlus, Users, CheckCircle2, XCircle, Loader2, LogOut, Eye, EyeOff } from 'lucide-react';

interface User {
  _id: string;
  email: string;
  nom: string;
  prenom: string;
  role: string;
  actif: boolean;
  createdAt: string;
}

export default function AdminPage() {
  const { user, logout } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ email: '', password: '', nom: '', prenom: '', role: 'stagiaire' });
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  async function fetchUsers() {
    try {
      const data = await api.get<User[]>('/users');
      setUsers(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchUsers(); }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setError(''); setSuccess('');
    setCreating(true);
    try {
      await api.post('/users', form);
      setSuccess(`Compte créé pour ${form.prenom} ${form.nom}. Communiquez ce mot de passe manuellement : "${form.password}"`);
      setForm({ email: '', password: '', nom: '', prenom: '', role: 'stagiaire' });
      await fetchUsers();
    } catch (err: any) {
      setError(err.message || 'Erreur lors de la création');
    } finally {
      setCreating(false);
    }
  }

  async function toggleActif(u: User) {
    try {
      await api.patch(`/users/${u._id}/${u.actif ? 'desactiver' : 'activer'}`);
      await fetchUsers();
    } catch {}
  }

  const ROLE_BADGE: Record<string, string> = {
    stagiaire: 'badge-slate',
    formateur: 'bg-blue-950 text-blue-400 badge border border-blue-900',
    admin: 'bg-red-950 text-red-400 badge border border-red-900',
  };

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Nav */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <Leaf className="w-5 h-5 text-green-400" />
            <span className="font-bold text-white">Administration</span>
          </div>
          <button onClick={logout} className="text-slate-500 hover:text-red-400 transition-colors">
            <LogOut className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Formulaire création */}
          <div className="lg:col-span-1">
            <div className="card">
              <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
                <UserPlus className="w-4 h-4 text-green-400" />
                Créer un compte
              </h2>

              <form onSubmit={handleCreate} className="space-y-3">
                <div>
                  <label className="text-slate-400 text-xs mb-1 block">Prénom</label>
                  <input
                    value={form.prenom}
                    onChange={(e) => setForm({ ...form, prenom: e.target.value })}
                    required
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-green-500"
                  />
                </div>
                <div>
                  <label className="text-slate-400 text-xs mb-1 block">Nom</label>
                  <input
                    value={form.nom}
                    onChange={(e) => setForm({ ...form, nom: e.target.value })}
                    required
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-green-500"
                  />
                </div>
                <div>
                  <label className="text-slate-400 text-xs mb-1 block">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-green-500"
                  />
                </div>
                <div>
                  <label className="text-slate-400 text-xs mb-1 block">Mot de passe temporaire</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                      required
                      minLength={8}
                      placeholder="Min. 8 caractères"
                      className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-3 py-2 pr-10 text-sm focus:outline-none focus:border-green-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="text-slate-400 text-xs mb-1 block">Rôle</label>
                  <select
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-green-500"
                  >
                    <option value="stagiaire">Stagiaire</option>
                    <option value="formateur">Formateur</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                {error && (
                  <div className="bg-red-950 border border-red-800 text-red-400 rounded-xl px-3 py-2 text-xs">
                    {error}
                  </div>
                )}
                {success && (
                  <div className="bg-green-950 border border-green-800 text-green-400 rounded-xl px-3 py-2 text-xs leading-relaxed">
                    {success}
                  </div>
                )}

                <button type="submit" disabled={creating} className="btn-primary w-full justify-center text-sm py-2">
                  {creating ? <Loader2 className="w-4 h-4 animate-spin" /> : <UserPlus className="w-4 h-4" />}
                  {creating ? 'Création...' : 'Créer le compte'}
                </button>
              </form>
            </div>
          </div>

          {/* Liste des utilisateurs */}
          <div className="lg:col-span-2">
            <div className="card overflow-x-auto">
              <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Users className="w-4 h-4 text-green-400" />
                Utilisateurs ({users.length})
              </h2>

              {loading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="w-6 h-6 text-green-400 animate-spin" />
                </div>
              ) : (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left border-b border-slate-800">
                      <th className="pb-3 text-slate-500 font-medium">Utilisateur</th>
                      <th className="pb-3 text-slate-500 font-medium">Rôle</th>
                      <th className="pb-3 text-slate-500 font-medium text-center">Statut</th>
                      <th className="pb-3"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-900">
                    {users.map((u) => (
                      <tr key={u._id}>
                        <td className="py-3">
                          <div className="text-white font-medium">{u.prenom} {u.nom}</div>
                          <div className="text-slate-500 text-xs">{u.email}</div>
                        </td>
                        <td className="py-3">
                          <span className={ROLE_BADGE[u.role] || 'badge-slate'}>
                            {u.role}
                          </span>
                        </td>
                        <td className="py-3 text-center">
                          {u.actif ? (
                            <CheckCircle2 className="w-4 h-4 text-green-400 mx-auto" />
                          ) : (
                            <XCircle className="w-4 h-4 text-red-400 mx-auto" />
                          )}
                        </td>
                        <td className="py-3 text-right">
                          {u.role !== 'admin' && (
                            <button
                              onClick={() => toggleActif(u)}
                              className={`text-xs px-3 py-1 rounded-lg border transition-colors ${
                                u.actif
                                  ? 'border-red-900 text-red-500 hover:bg-red-950'
                                  : 'border-green-900 text-green-500 hover:bg-green-950'
                              }`}
                            >
                              {u.actif ? 'Désactiver' : 'Activer'}
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
