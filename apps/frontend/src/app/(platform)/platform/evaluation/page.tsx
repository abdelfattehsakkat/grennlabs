'use client';

import { useState } from 'react';
import { api } from '@/lib/api';
import { Star, CheckCircle2, Loader2 } from 'lucide-react';

const CRITERES = [
  { key: 'contenu', label: 'Qualité du contenu pédagogique' },
  { key: 'formateur', label: 'Clarté des explications du formateur' },
  { key: 'exercices', label: 'Pertinence des exercices pratiques' },
  { key: 'utilite', label: 'Utilité pour mon travail quotidien' },
  { key: 'plateforme', label: 'Qualité de la plateforme (quiz/labs)' },
];

function StarRating({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          className="transition-transform hover:scale-110"
        >
          <Star
            className={`w-6 h-6 ${
              star <= (hovered || value) ? 'text-yellow-400 fill-yellow-400' : 'text-slate-600'
            }`}
          />
        </button>
      ))}
    </div>
  );
}

export default function EvaluationPage() {
  const [rotiScore, setRotiScore] = useState(0);
  const [rotiComment, setRotiComment] = useState('');
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [plusAppris, setPlusAppris] = useState('');
  const [aApprofondir, setAApprofondir] = useState('');
  const [recommande, setRecommande] = useState('');
  const [step, setStep] = useState<'roti' | 'formation' | 'done'>('roti');
  const [submitting, setSubmitting] = useState(false);

  async function submitRoti() {
    if (!rotiScore) return;
    setSubmitting(true);
    try {
      await api.post('/evaluation/roti', { score: rotiScore, commentaire: rotiComment });
      setStep('formation');
    } finally {
      setSubmitting(false);
    }
  }

  async function submitFormation() {
    setSubmitting(true);
    try {
      await api.post('/evaluation/formation', {
        ratings,
        plusAppris,
        aApprofondir,
        recommanderait: recommande || 'peut-etre',
      });
      setStep('done');
    } finally {
      setSubmitting(false);
    }
  }

  if (step === 'done') {
    return (
      <div className="p-6 max-w-xl mx-auto text-center">
        <CheckCircle2 className="w-16 h-16 text-green-400 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-white mb-2">Merci pour votre évaluation !</h1>
        <p className="text-slate-400">Vos retours nous aident à améliorer la prochaine session.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <div className="mb-8">
        <div className="badge-green mb-3">
          <Star className="w-3 h-3" />
          Évaluation de la formation
        </div>
        <h1 className="text-2xl font-bold text-white">
          {step === 'roti' ? 'Note ROTI' : 'Satisfaction de la formation'}
        </h1>
        <div className="flex gap-2 mt-3">
          <div className={`h-1 flex-1 rounded-full ${step === 'roti' ? 'bg-green-500' : 'bg-green-500'}`} />
          <div className={`h-1 flex-1 rounded-full ${step === 'formation' ? 'bg-green-500' : 'bg-slate-700'}`} />
        </div>
      </div>

      {step === 'roti' && (
        <div className="space-y-6">
          <div className="card">
            <h2 className="text-white font-semibold mb-2">ROTI — Return On Time Invested</h2>
            <p className="text-slate-400 text-sm mb-6">
              Le temps passé dans cette formation était-il un bon investissement ?
              <br />
              <span className="text-slate-500">1 = Perte de temps total · 5 = Excellent investissement</span>
            </p>
            <div className="flex gap-4 justify-center">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  onClick={() => setRotiScore(n)}
                  className={`w-12 h-12 rounded-xl font-bold text-lg transition-all duration-150 ${
                    rotiScore === n
                      ? 'bg-green-600 text-white scale-110'
                      : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
            {rotiScore > 0 && (
              <div className="text-center mt-3 text-slate-500 text-sm">
                {['', 'Perte de temps', 'Peu utile', 'Correct', 'Bien', 'Excellent !'][rotiScore]}
              </div>
            )}
          </div>

          <div className="card">
            <label className="block text-slate-400 text-sm font-medium mb-2">
              Commentaire (optionnel)
            </label>
            <textarea
              value={rotiComment}
              onChange={(e) => setRotiComment(e.target.value)}
              placeholder="Ce qui vous a le plus marqué..."
              className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-green-500 resize-none h-20"
            />
          </div>

          <button
            onClick={submitRoti}
            disabled={!rotiScore || submitting}
            className="btn-primary w-full justify-center disabled:opacity-40"
          >
            {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            Continuer →
          </button>
        </div>
      )}

      {step === 'formation' && (
        <div className="space-y-6">
          <div className="card space-y-5">
            {CRITERES.map((c) => (
              <div key={c.key} className="flex items-center justify-between gap-4">
                <span className="text-slate-300 text-sm flex-1">{c.label}</span>
                <StarRating
                  value={ratings[c.key] || 0}
                  onChange={(v) => setRatings((r) => ({ ...r, [c.key]: v }))}
                />
              </div>
            ))}
          </div>

          <div className="card space-y-4">
            <div>
              <label className="block text-slate-400 text-sm font-medium mb-1">
                Ce que j'ai le plus appris aujourd'hui
              </label>
              <textarea
                value={plusAppris}
                onChange={(e) => setPlusAppris(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-green-500 resize-none h-16"
              />
            </div>
            <div>
              <label className="block text-slate-400 text-sm font-medium mb-1">
                Ce que j'aurais voulu approfondir
              </label>
              <textarea
                value={aApprofondir}
                onChange={(e) => setAApprofondir(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-green-500 resize-none h-16"
              />
            </div>
            <div>
              <label className="block text-slate-400 text-sm font-medium mb-2">
                Je recommanderais cette formation à un collègue
              </label>
              <div className="flex gap-3">
                {['oui', 'non', 'peut-etre'].map((v) => (
                  <button
                    key={v}
                    onClick={() => setRecommande(v)}
                    className={`flex-1 py-2 rounded-xl text-sm font-medium transition-colors capitalize ${
                      recommande === v
                        ? 'bg-green-900 text-green-400 border border-green-700'
                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700 border border-slate-700'
                    }`}
                  >
                    {v === 'peut-etre' ? 'Peut-être' : v.charAt(0).toUpperCase() + v.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={submitFormation}
            disabled={submitting}
            className="btn-primary w-full justify-center"
          >
            {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
            Soumettre l'évaluation
          </button>
        </div>
      )}
    </div>
  );
}
