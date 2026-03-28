'use client';

import { useAuth } from '@/lib/auth';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { CheckCircle2, Clock, Trophy, ArrowRight, Leaf } from 'lucide-react';
import { PROGRAMME } from '@/data/modules';

interface QuizSession {
  quizId: string;
  score: number;
  completedAt: string;
}

const QUIZ_THRESHOLDS: Record<string, number> = {
  icebreaker: 3,
  'mi-journee': 4,
  final: 6,
};

export default function DashboardPage() {
  const { user } = useAuth();
  const [quizSessions, setQuizSessions] = useState<QuizSession[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get<QuizSession[]>('/quiz/sessions/me')
      .then(setQuizSessions)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const getQuizSession = (quizId: string) => quizSessions.find((s) => s.quizId === quizId);
  const finalSession = getQuizSession('final');
  const finalPassed = finalSession && finalSession.score >= 6;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-green-400 mb-2">
          <Leaf className="w-4 h-4" />
          <span className="text-sm font-mono">Tableau de bord</span>
        </div>
        <h1 className="text-2xl font-bold text-white">
          Bonjour, {user?.prenom} 👋
        </h1>
        <p className="text-slate-400 mt-1">
          Formation Green IT & Écoconception RGESN 2024
        </p>
      </div>

      {/* Badge si quiz final réussi */}
      {finalPassed && (
        <div className="card border-green-800 bg-green-950/30 flex items-center gap-4 mb-6">
          <Trophy className="w-8 h-8 text-yellow-400 flex-shrink-0" />
          <div>
            <div className="text-white font-bold">Formation complétée — {finalSession!.score}/10</div>
            <div className="text-slate-400 text-sm">Vous avez validé la formation Green IT & RGESN 2024.</div>
          </div>
        </div>
      )}

      {/* Scores quiz */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {['icebreaker', 'mi-journee', 'final'].map((quizId) => {
          const session = getQuizSession(quizId);
          const threshold = QUIZ_THRESHOLDS[quizId];
          const total = quizId === 'final' ? 10 : 5;
          const passed = session && session.score >= threshold;

          return (
            <div key={quizId} className={`card ${passed ? 'border-green-800' : ''}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-400 text-sm capitalize">{quizId.replace('-', ' ')}</span>
                {passed ? (
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                ) : session ? (
                  <span className="text-orange-400 text-xs">À améliorer</span>
                ) : (
                  <Clock className="w-4 h-4 text-slate-600" />
                )}
              </div>
              {session ? (
                <div className="text-2xl font-bold text-white">
                  {session.score}/{total}
                  <span className="text-slate-500 text-sm font-normal ml-2">
                    {((session.score / total) * 100).toFixed(0)}%
                  </span>
                </div>
              ) : (
                <div className="text-slate-600 text-sm">Non commencé</div>
              )}
            </div>
          );
        })}
      </div>

      {/* Programme de la journée */}
      <h2 className="text-white font-semibold mb-4">Programme de la journée</h2>
      <div className="space-y-2">
        {PROGRAMME.map((bloc, i) => {
          if (!bloc.slug) {
            return (
              <div key={i} className="flex items-center gap-4 text-slate-600 text-sm py-2 px-4">
                <span className="font-mono w-14">{bloc.horaire}</span>
                <span>{bloc.titre}</span>
              </div>
            );
          }

          const isQuiz = bloc.type === 'quiz';
          const quizId = isQuiz ? bloc.slug.split('/').pop()! : null;
          const quizDone = quizId ? !!getQuizSession(quizId) : false;

          return (
            <Link
              key={i}
              href={bloc.slug}
              className="flex items-center gap-4 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 rounded-xl px-4 py-3 transition-colors group"
            >
              <span className="text-green-500 font-mono text-sm w-14">{bloc.horaire}</span>
              <span className="flex-1 text-slate-200 text-sm group-hover:text-white transition-colors">{bloc.titre}</span>
              <div className="flex items-center gap-2">
                {quizDone && <CheckCircle2 className="w-4 h-4 text-green-400" />}
                <span className="text-slate-600 text-xs">{bloc.duree}</span>
                <ArrowRight className="w-3 h-3 text-slate-600 group-hover:text-green-400 transition-colors" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
