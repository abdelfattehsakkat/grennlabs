'use client';

import { useState, useEffect, useCallback } from 'react';
import { api } from '@/lib/api';
import { useAuth } from '@/lib/auth';
import { Leaf, RefreshCw, Users, CheckCircle2, Clock, Trophy, LogOut } from 'lucide-react';
import Link from 'next/link';

interface QuizSession {
  _id: string;
  userId: { email: string; nom: string; prenom: string; role: string };
  quizId: string;
  score: number;
  completedAt: string;
}

interface LabSession {
  _id: string;
  userId: { email: string; nom: string; prenom: string };
  labId: string;
  completedSteps: number[];
  completedAt?: string;
}

const QUIZ_TOTALS: Record<string, number> = {
  icebreaker: 5,
  'mi-journee': 5,
  final: 10,
};

export default function FormateurDashboard() {
  const { user, logout } = useAuth();
  const [quizSessions, setQuizSessions] = useState<QuizSession[]>([]);
  const [labSessions, setLabSessions] = useState<LabSession[]>([]);
  const [evalStats, setEvalStats] = useState<{ avgRoti: string | null; totalReponses: number } | null>(null);
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const [quiz, lab, stats] = await Promise.all([
        api.get<QuizSession[]>('/quiz/sessions/all'),
        api.get<LabSession[]>('/lab/sessions/all'),
        api.get<any>('/evaluation/stats'),
      ]);
      setQuizSessions(quiz);
      setLabSessions(lab);
      setEvalStats(stats);
      setLastRefresh(new Date());
    } catch {
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    // Polling 3s
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, [fetchData]);

  // Regrouper par stagiaire
  const stagiaires = Array.from(
    new Map(
      quizSessions
        .filter((s) => s.userId)
        .map((s) => [s.userId.email, s.userId])
    ).values()
  );

  function getScores(email: string) {
    return quizSessions.filter((s) => s.userId?.email === email);
  }

  function getLabProgress(email: string) {
    return labSessions.filter((s) => s.userId?.email === email);
  }

  const finalPassed = quizSessions.filter(
    (s) => s.quizId === 'final' && s.score >= 6
  ).length;

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      {/* Nav */}
      <div className="max-w-6xl mx-auto mb-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Leaf className="w-5 h-5 text-green-400" />
          <span className="font-bold text-white">Tableau de bord formateur</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-slate-500 text-xs flex items-center gap-1">
            <RefreshCw className="w-3 h-3" />
            Mis à jour à {lastRefresh.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </span>
          <button onClick={logout} className="text-slate-500 hover:text-red-400 transition-colors">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto space-y-6">
        {/* KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="card text-center">
            <div className="text-3xl font-bold text-white">{stagiaires.length}</div>
            <div className="text-slate-400 text-sm">Participants actifs</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-white">{finalPassed}</div>
            <div className="text-slate-400 text-sm">Quiz final validé</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-white">
              {evalStats?.avgRoti ?? '—'}
            </div>
            <div className="text-slate-400 text-sm">ROTI moyen /5</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-white">
              {evalStats?.totalReponses ?? 0}
            </div>
            <div className="text-slate-400 text-sm">Évaluations reçues</div>
          </div>
        </div>

        {/* Table des participants */}
        <div className="card overflow-x-auto">
          <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
            <Users className="w-4 h-4 text-green-400" />
            Participants en temps réel
          </h2>

          {stagiaires.length === 0 ? (
            <div className="text-slate-500 text-sm py-4 text-center">
              Aucun participant n'a encore commencé de quiz.
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b border-slate-800">
                  <th className="pb-3 text-slate-500 font-medium">Participant</th>
                  <th className="pb-3 text-slate-500 font-medium text-center">Icebreaker</th>
                  <th className="pb-3 text-slate-500 font-medium text-center">Mi-journée</th>
                  <th className="pb-3 text-slate-500 font-medium text-center">Final</th>
                  <th className="pb-3 text-slate-500 font-medium text-center">Labs</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-900">
                {stagiaires.map((s) => {
                  const scores = getScores(s.email);
                  const labs = getLabProgress(s.email);

                  function scoreCell(quizId: string) {
                    const session = scores.find((ss) => ss.quizId === quizId);
                    if (!session) return <td className="py-3 text-center text-slate-700">—</td>;
                    const total = QUIZ_TOTALS[quizId];
                    const passed = quizId === 'final' ? session.score >= 6 : session.score >= Math.ceil(total * 0.6);
                    return (
                      <td className="py-3 text-center">
                        <span className={`font-mono font-bold ${passed ? 'text-green-400' : 'text-orange-400'}`}>
                          {session.score}/{total}
                        </span>
                      </td>
                    );
                  }

                  return (
                    <tr key={s.email}>
                      <td className="py-3">
                        <div className="text-white font-medium">{s.prenom} {s.nom}</div>
                        <div className="text-slate-500 text-xs">{s.email}</div>
                      </td>
                      {scoreCell('icebreaker')}
                      {scoreCell('mi-journee')}
                      {scoreCell('final')}
                      <td className="py-3 text-center text-slate-400">
                        {labs.reduce((acc, l) => acc + (l.completedAt ? 1 : 0), 0)}/2
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* Export CSV simplifié */}
        <div className="flex justify-end">
          <button
            onClick={() => {
              const rows = [['Email', 'Nom', 'Prénom', 'Icebreaker', 'Mi-journée', 'Final']];
              stagiaires.forEach((s) => {
                const scores = getScores(s.email);
                rows.push([
                  s.email, s.nom, s.prenom,
                  String(scores.find((ss) => ss.quizId === 'icebreaker')?.score ?? ''),
                  String(scores.find((ss) => ss.quizId === 'mi-journee')?.score ?? ''),
                  String(scores.find((ss) => ss.quizId === 'final')?.score ?? ''),
                ]);
              });
              const csv = rows.map((r) => r.join(';')).join('\n');
              const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `scores-${new Date().toISOString().split('T')[0]}.csv`;
              a.click();
              URL.revokeObjectURL(url);
            }}
            className="btn-ghost text-sm py-2"
          >
            Exporter CSV
          </button>
        </div>
      </div>
    </div>
  );
}
