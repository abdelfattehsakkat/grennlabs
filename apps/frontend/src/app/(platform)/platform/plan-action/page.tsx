'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { Target, Loader2, CheckCircle2, Download } from 'lucide-react';

type Profil = 'dev' | 'qa' | 'cp';

const EXEMPLES: Record<Profil, { action7j: string; critere7j: string; action30j: string; critere30j: string }> = {
  dev: {
    action7j: 'Ajouter EcoIndex dans ma pipeline de test locale',
    critere7j: 'Frontend 06',
    action30j: 'Ouvrir une MR avec checklist RGESN sur un projet en cours',
    critere30j: 'Tous profils 01',
  },
  qa: {
    action7j: 'Ajouter un critère de poids de page dans ma prochaine US',
    critere7j: 'Spécification 02',
    action30j: 'Proposer NumEcoDiag à mon équipe pour auditer notre service',
    critere30j: 'Stratégie 01',
  },
  cp: {
    action7j: 'Désigner un référent écoconception dans mon équipe',
    critere7j: 'Stratégie 01',
    action30j: 'Inclure un critère RGESN dans notre Definition of Done',
    critere30j: 'Stratégie 01',
  },
};

export default function PlanActionPage() {
  const [profil, setProfil] = useState<Profil>('dev');
  const [nom, setNom] = useState('');
  const [role, setRole] = useState('');
  const [action1, setAction1] = useState('');
  const [critere1, setCritere1] = useState('');
  const [mesure1, setMesure1] = useState('');
  const [action2, setAction2] = useState('');
  const [critere2, setCritere2] = useState('');
  const [mesure2, setMesure2] = useState('');
  const [action3, setAction3] = useState('');
  const [critere3, setCritere3] = useState('');
  const [mesure3, setMesure3] = useState('');
  const [partage, setPartage] = useState('');
  const [saved, setSaved] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    api.get<any>('/action-plan')
      .then((data) => {
        if (!data) return;
        setProfil(data.role || 'dev');
        const a = data.actions || [];
        if (a[0]) { setAction1(a[0].action || ''); setCritere1(a[0].critereRGESN || ''); setMesure1(a[0].mesure || ''); }
        if (a[1]) { setAction2(a[1].action || ''); setCritere2(a[1].critereRGESN || ''); setMesure2(a[1].mesure || ''); }
        if (a[2]) { setAction3(a[2].action || ''); setCritere3(a[2].critereRGESN || ''); setMesure3(a[2].mesure || ''); }
        setPartage(data.partageEquipe || '');
      })
      .catch(() => {});
  }, []);

  function fillExemple() {
    const ex = EXEMPLES[profil];
    setAction1(ex.action7j); setCritere1(ex.critere7j); setMesure1('Tâche créée dans mon board projet');
    setAction2(ex.action30j); setCritere2(ex.critere30j); setMesure2('MR ou ticket créé avec référence RGESN');
    setPartage('Je vais présenter la règle des 80/20 à mon équipe lors de la prochaine réunion.');
  }

  async function handleSave() {
    setSubmitting(true);
    try {
      await api.post('/action-plan', {
        role: profil,
        actions: [
          { periode: '7j', action: action1, critereRGESN: critere1, mesure: mesure1 },
          { periode: '30j', action: action2, critereRGESN: critere2, mesure: mesure2 },
          { periode: '30j', action: action3, critereRGESN: critere3, mesure: mesure3 },
        ],
        partageEquipe: partage,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } finally {
      setSubmitting(false);
    }
  }

  function handlePrint() {
    window.print();
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="mb-8">
        <div className="badge-green mb-3">
          <Target className="w-3 h-3" />
          Plan d'action individuel
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">Mon engagement Green IT</h1>
        <p className="text-slate-400 text-sm">Des actions concrètes, mesurables, dès demain.</p>
      </div>

      {/* Profil */}
      <div className="card mb-6">
        <h3 className="text-slate-400 text-sm font-medium mb-3">Mon profil</h3>
        <div className="flex gap-3">
          {(['dev', 'qa', 'cp'] as Profil[]).map((p) => (
            <button
              key={p}
              onClick={() => setProfil(p)}
              className={`flex-1 py-2 rounded-xl text-sm font-medium transition-colors ${
                profil === p
                  ? 'bg-green-900 text-green-400 border border-green-700'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700 border border-slate-700'
              }`}
            >
              {p === 'dev' ? '⌨️ Dev' : p === 'qa' ? '🔍 QA' : '📊 CP'}
            </button>
          ))}
        </div>
        <button onClick={fillExemple} className="mt-3 text-xs text-green-500 hover:text-green-400 transition-colors underline underline-offset-2">
          Pré-remplir avec des exemples
        </button>
      </div>

      {/* Actions 7 jours */}
      <div className="card mb-4">
        <h3 className="text-white font-semibold mb-4">Dans les 7 prochains jours, je vais :</h3>
        <div className="space-y-3">
          <div>
            <label className="text-slate-400 text-xs mb-1 block">Action</label>
            <input
              value={action1}
              onChange={(e) => setAction1(e.target.value)}
              placeholder="Ex: Ajouter EcoIndex dans ma pipeline..."
              className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-green-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-slate-400 text-xs mb-1 block">Critère RGESN</label>
              <input
                value={critere1}
                onChange={(e) => setCritere1(e.target.value)}
                placeholder="Ex: Frontend 06"
                className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-green-500"
              />
            </div>
            <div>
              <label className="text-slate-400 text-xs mb-1 block">Comment je mesure</label>
              <input
                value={mesure1}
                onChange={(e) => setMesure1(e.target.value)}
                placeholder="Ex: Ticket créé"
                className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-green-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Actions 30 jours */}
      <div className="card mb-4">
        <h3 className="text-white font-semibold mb-4">Dans les 30 prochains jours, je vais :</h3>
        <div className="space-y-4">
          {[
            { action: action2, setAction: setAction2, critere: critere2, setCritere: setCritere2, mesure: mesure2, setMesure: setMesure2 },
            { action: action3, setAction: setAction3, critere: critere3, setCritere: setCritere3, mesure: mesure3, setMesure: setMesure3 },
          ].map((item, i) => (
            <div key={i} className="space-y-3">
              {i > 0 && <hr className="border-slate-800" />}
              <div>
                <label className="text-slate-400 text-xs mb-1 block">Action {i + 2}</label>
                <input
                  value={item.action}
                  onChange={(e) => item.setAction(e.target.value)}
                  placeholder="Décrivez votre action..."
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-green-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 text-xs mb-1 block">Critère RGESN</label>
                  <input
                    value={item.critere}
                    onChange={(e) => item.setCritere(e.target.value)}
                    placeholder="Ex: Backend 07"
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-green-500"
                  />
                </div>
                <div>
                  <label className="text-slate-400 text-xs mb-1 block">Comment je mesure</label>
                  <input
                    value={item.mesure}
                    onChange={(e) => item.setMesure(e.target.value)}
                    placeholder="MR créée, rapport..."
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-green-500"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Partage équipe */}
      <div className="card mb-6">
        <label className="block text-white font-semibold mb-2">
          Une chose que je vais partager à mon équipe dès demain :
        </label>
        <textarea
          value={partage}
          onChange={(e) => setPartage(e.target.value)}
          placeholder="Ex: La règle des 80%..."
          className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-green-500 resize-none h-16"
        />
      </div>

      <div className="flex gap-3">
        <button onClick={handleSave} disabled={submitting} className="btn-primary flex-1 justify-center">
          {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : saved ? <CheckCircle2 className="w-4 h-4" /> : <Target className="w-4 h-4" />}
          {saved ? 'Enregistré !' : 'Enregistrer'}
        </button>
        <button onClick={handlePrint} className="btn-ghost">
          <Download className="w-4 h-4" />
          Imprimer
        </button>
      </div>
    </div>
  );
}
