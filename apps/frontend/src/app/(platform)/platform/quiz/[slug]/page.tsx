import QuizPlayer from '@/components/QuizPlayer';
import { notFound } from 'next/navigation';
import { Zap } from 'lucide-react';

const QUIZ_CONFIG: Record<string, { titre: string; threshold: number }> = {
  icebreaker: { titre: 'Quiz Icebreaker — Déconstruire les idées reçues', threshold: 3 },
  'mi-journee': { titre: 'Quiz Mi-journée — Consolider les acquis', threshold: 4 },
  final: { titre: 'Quiz Final — Validation de la formation', threshold: 6 },
};

export default function QuizPage({ params }: { params: { slug: string } }) {
  const config = QUIZ_CONFIG[params.slug];
  if (!config) notFound();

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="badge-green mb-3">
          <Zap className="w-3 h-3" />
          Quiz interactif
        </div>
        <h1 className="text-2xl font-bold text-white">{config.titre}</h1>
        {params.slug === 'final' && (
          <p className="text-slate-400 text-sm mt-2">
            Seuil de validation : 6/10. Le score sera enregistré pour attestation.
          </p>
        )}
      </div>
      <QuizPlayer
        quizId={params.slug}
        titre={config.titre}
        successThreshold={config.threshold}
      />
    </div>
  );
}

export function generateStaticParams() {
  return Object.keys(QUIZ_CONFIG).map((slug) => ({ slug }));
}
