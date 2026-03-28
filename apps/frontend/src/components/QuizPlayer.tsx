'use client';

import { useState, useEffect, useCallback } from 'react';
import { api } from '@/lib/api';
import { CheckCircle2, XCircle, Trophy, ChevronRight, Loader2, Clock } from 'lucide-react';

interface Question {
  index: number;
  question: string;
  options: string[];
}

interface QuizMeta {
  id: string;
  totalQuestions: number;
  questions: Question[];
}

interface CorrectionItem {
  questionIndex: number;
  selectedIndex: number;
  correctIndex: number;
  correct: boolean;
  explication: string;
}

interface Result {
  score: number;
  total: number;
  correction: CorrectionItem[];
}

interface Props {
  quizId: string;
  titre: string;
  successThreshold?: number;
}

export default function QuizPlayer({ quizId, titre, successThreshold = 6 }: Props) {
  const [quiz, setQuiz] = useState<QuizMeta | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<{ questionIndex: number; selectedIndex: number }[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    api.get<QuizMeta>(`/quiz/${quizId}`)
      .then(setQuiz)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [quizId]);

  useEffect(() => {
    if (!quiz || result || selected !== null) return;
    setTimeLeft(30);
    const interval = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(interval);
          handleAutoSkip();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [currentIndex, quiz, result]);

  function handleAutoSkip() {
    if (selected !== null) return;
    const q = quiz!.questions[currentIndex];
    const newAnswers = [...answers, { questionIndex: q.index, selectedIndex: -1 }];
    setAnswers(newAnswers);
    if (currentIndex < quiz!.questions.length - 1) {
      setCurrentIndex((i) => i + 1);
      setSelected(null);
    } else {
      submitQuiz(newAnswers);
    }
  }

  function handleSelect(optionIndex: number) {
    if (selected !== null) return;
    setSelected(optionIndex);
  }

  function handleNext() {
    if (selected === null) return;
    const q = quiz!.questions[currentIndex];
    const newAnswers = [...answers, { questionIndex: q.index, selectedIndex: selected }];
    setAnswers(newAnswers);

    if (currentIndex < quiz!.questions.length - 1) {
      setCurrentIndex((i) => i + 1);
      setSelected(null);
    } else {
      submitQuiz(newAnswers);
    }
  }

  async function submitQuiz(finalAnswers: typeof answers) {
    setSubmitting(true);
    try {
      const res = await api.post<Result>(`/quiz/${quizId}/submit`, { answers: finalAnswers });
      setResult(res);
    } catch {
      // Afficher quand même
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 text-green-400 animate-spin" />
      </div>
    );
  }

  if (!quiz) {
    return <div className="card text-red-400">Quiz introuvable</div>;
  }

  if (result) {
    const passed = result.score >= successThreshold;
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Score */}
        <div className={`card text-center ${passed ? 'border-green-800 bg-green-950/20' : 'border-orange-800'}`}>
          <div className="text-5xl font-black text-white mb-2">
            {result.score}<span className="text-slate-500 text-2xl">/{result.total}</span>
          </div>
          <div className={`font-semibold mb-2 ${passed ? 'text-green-400' : 'text-orange-400'}`}>
            {passed ? '✓ Validé' : 'À améliorer'}
          </div>
          <div className="text-slate-400 text-sm">
            {((result.score / result.total) * 100).toFixed(0)}% de bonnes réponses
            {passed && result.score === result.total && (
              <span className="ml-2">🎉 Score parfait !</span>
            )}
          </div>
        </div>

        {/* Correction */}
        <div className="space-y-4">
          <h3 className="text-white font-semibold">Correction détaillée</h3>
          {result.correction.map((c, i) => {
            const q = quiz.questions[c.questionIndex];
            return (
              <div key={i} className={`card ${c.correct ? 'border-green-900' : 'border-red-900'}`}>
                <div className="flex items-start gap-3 mb-3">
                  {c.correct ? (
                    <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  )}
                  <p className="text-white text-sm font-medium">{q.question}</p>
                </div>

                {!c.correct && (
                  <div className="ml-8 mb-2 space-y-1">
                    <div className="text-red-400 text-xs">
                      Votre réponse : {c.selectedIndex >= 0 ? q.options[c.selectedIndex] : 'Sans réponse'}
                    </div>
                    <div className="text-green-400 text-xs">
                      Bonne réponse : {q.options[c.correctIndex]}
                    </div>
                  </div>
                )}

                <div className="ml-8 text-slate-400 text-xs leading-relaxed border-l border-slate-700 pl-3">
                  {c.explication}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  const currentQuestion = quiz.questions[currentIndex];
  const progress = ((currentIndex) / quiz.totalQuestions) * 100;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Progress */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-slate-400 text-sm">
            Question {currentIndex + 1}/{quiz.totalQuestions}
          </span>
          <span className={`flex items-center gap-1 text-sm font-mono ${timeLeft <= 10 ? 'text-orange-400' : 'text-slate-400'}`}>
            <Clock className="w-3.5 h-3.5" />
            {timeLeft}s
          </span>
        </div>
        <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-500 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="card">
        <p className="text-white font-semibold text-lg leading-relaxed">
          {currentQuestion.question}
        </p>
      </div>

      {/* Options */}
      <div className="space-y-3">
        {currentQuestion.options.map((option, i) => {
          let style = 'card-hover border-slate-700 text-slate-300';
          if (selected !== null) {
            if (i === selected) style = 'card border-blue-700 bg-blue-950/30 text-white';
            else style = 'card border-slate-800 text-slate-600 cursor-default';
          }

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={selected !== null}
              className={`w-full text-left p-4 rounded-xl border transition-all duration-150 ${style}`}
            >
              <span className="text-green-500 font-mono text-sm mr-2">
                {String.fromCharCode(65 + i)}.
              </span>
              {option}
            </button>
          );
        })}
      </div>

      {/* Next */}
      {selected !== null && (
        <button
          onClick={handleNext}
          disabled={submitting}
          className="btn-primary w-full justify-center"
        >
          {submitting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : currentIndex < quiz.totalQuestions - 1 ? (
            <>Suivant <ChevronRight className="w-4 h-4" /></>
          ) : (
            <>Voir le résultat <Trophy className="w-4 h-4" /></>
          )}
        </button>
      )}
    </div>
  );
}
