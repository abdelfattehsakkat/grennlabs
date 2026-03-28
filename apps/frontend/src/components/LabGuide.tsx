'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { LABS, LabData } from '@/data/labs';
import { CheckCircle2, Circle, ChevronRight, BookOpen, Timer, Loader2, ExternalLink } from 'lucide-react';

interface LabSession {
  completedSteps: number[];
  notes: string;
  completedAt?: string;
}

interface Props {
  labId: string;
}

export default function LabGuide({ labId }: Props) {
  const lab = LABS.find((l) => l.id === labId);
  const [session, setSession] = useState<LabSession | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!lab) return;
    api.get<LabSession>(`/lab/${labId}/session`)
      .then((s) => {
        if (s) {
          setSession(s);
          setNotes(s.notes || '');
        }
      })
      .catch(() => {});
  }, [labId]);

  if (!lab) return <div className="card text-red-400">Lab introuvable</div>;

  const completedSteps = session?.completedSteps || [];
  const allDone = completedSteps.length >= lab.totalSteps;

  async function markStep(stepIndex: number) {
    if (completedSteps.includes(stepIndex)) return;
    setSaving(true);
    try {
      const updated = await api.post<LabSession>(`/lab/${labId}/step`, {
        stepIndex,
        notes,
      });
      setSession(updated);
    } catch {
    } finally {
      setSaving(false);
    }
  }

  async function saveNotes() {
    setSaving(true);
    try {
      const currentStep = completedSteps.length > 0 ? completedSteps[completedSteps.length - 1] : 0;
      const updated = await api.post<LabSession>(`/lab/${labId}/step`, {
        stepIndex: currentStep,
        notes,
      });
      setSession(updated);
    } finally {
      setSaving(false);
    }
  }

  const currentStep = lab.steps[activeStep];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Sidebar étapes */}
      <div className="lg:col-span-1">
        <div className="card sticky top-6">
          <h3 className="text-slate-400 text-xs font-mono uppercase tracking-wider mb-3">Étapes</h3>
          <div className="space-y-1">
            {lab.steps.map((step, i) => {
              const done = completedSteps.includes(i);
              const active = i === activeStep;
              return (
                <button
                  key={i}
                  onClick={() => setActiveStep(i)}
                  className={`w-full text-left flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                    active
                      ? 'bg-green-900/50 text-green-400 border border-green-800'
                      : done
                      ? 'text-slate-400'
                      : 'text-slate-500 hover:text-white'
                  }`}
                >
                  {done ? (
                    <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                  ) : (
                    <Circle className="w-4 h-4 flex-shrink-0" />
                  )}
                  <span className="truncate">{step.titre}</span>
                </button>
              );
            })}
          </div>

          {allDone && (
            <div className="mt-4 pt-4 border-t border-slate-800 text-center">
              <CheckCircle2 className="w-6 h-6 text-green-400 mx-auto mb-1" />
              <div className="text-green-400 text-sm font-medium">Lab complété !</div>
            </div>
          )}
        </div>
      </div>

      {/* Contenu étape */}
      <div className="lg:col-span-3 space-y-6">
        {/* Header étape */}
        <div className="card">
          <div className="flex items-center gap-2 mb-2">
            <span className="badge-green">
              <BookOpen className="w-3 h-3" />
              Étape {activeStep + 1}/{lab.totalSteps}
            </span>
            <span className="badge-slate">
              <Timer className="w-3 h-3" />
              {currentStep.duree}
            </span>
          </div>
          <h2 className="text-xl font-bold text-white">{currentStep.titre}</h2>
        </div>

        {/* Consigne */}
        <div className="card">
          <div
            className="lab-content text-slate-300 text-sm leading-relaxed"
            dangerouslySetInnerHTML={{ __html: currentStep.consigne }}
          />
        </div>

        {/* Livrables */}
        {currentStep.livrables && currentStep.livrables.length > 0 && (
          <div className="card border-l-2 border-l-green-700">
            <h4 className="text-green-400 text-sm font-medium mb-2">Livrables attendus</h4>
            <ul className="space-y-1">
              {currentStep.livrables.map((l) => (
                <li key={l} className="flex items-center gap-2 text-sm text-slate-300">
                  <ChevronRight className="w-3 h-3 text-green-500 flex-shrink-0" />
                  {l}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Ressources */}
        {currentStep.ressources && currentStep.ressources.length > 0 && (
          <div className="card">
            <h4 className="text-slate-400 text-sm font-medium mb-2">Ressources</h4>
            {currentStep.ressources.map((r) => (
              <a
                key={r.label}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-green-400 hover:text-green-300 transition-colors"
              >
                <ExternalLink className="w-3 h-3" />
                {r.label}
              </a>
            ))}
          </div>
        )}

        {/* Zone de notes */}
        <div className="card">
          <label className="block text-slate-400 text-sm font-medium mb-2">
            Notes personnelles
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Notez vos observations, verdicts, questions..."
            className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-green-500 transition-colors resize-none h-24"
          />
          <button
            onClick={saveNotes}
            disabled={saving}
            className="mt-2 text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-1"
          >
            {saving ? <Loader2 className="w-3 h-3 animate-spin" /> : null}
            Enregistrer les notes
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setActiveStep((i) => Math.max(0, i - 1))}
            disabled={activeStep === 0}
            className="btn-ghost text-sm py-2 disabled:opacity-30"
          >
            ← Précédent
          </button>

          {!completedSteps.includes(activeStep) ? (
            <button
              onClick={() => markStep(activeStep)}
              disabled={saving}
              className="btn-primary"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
              Marquer comme fait
            </button>
          ) : activeStep < lab.totalSteps - 1 ? (
            <button
              onClick={() => setActiveStep((i) => i + 1)}
              className="btn-primary"
            >
              Étape suivante <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <div className="text-green-400 text-sm font-medium flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              Lab terminé !
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
