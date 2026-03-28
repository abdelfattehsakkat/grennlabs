import { MODULES } from '@/data/modules';
import { notFound } from 'next/navigation';
import { BookOpen, Clock } from 'lucide-react';
import ModuleSlides from '@/components/ModuleSlides';

const TYPE_LABELS: Record<string, string> = {
  theorie: 'Théorie',
  atelier: 'Atelier',
  quiz: 'Quiz',
  exercice: 'Exercice',
};

export default function ModulePage({ params }: { params: { slug: string } }) {
  const module = MODULES.find((m) => m.slug === params.slug);
  if (!module) notFound();

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header module */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="badge-green">
            <BookOpen className="w-3 h-3" />
            {TYPE_LABELS[module.type]}
          </span>
          <span className="badge-slate">
            <Clock className="w-3 h-3" />
            {module.duree}
          </span>
          <span className="text-slate-500 text-xs font-mono">{module.horaire}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">{module.titre}</h1>
      </div>

      <ModuleSlides sections={module.sections} ressources={module.ressources} />
    </div>
  );
}

export function generateStaticParams() {
  return MODULES.map((m) => ({ slug: m.slug }));
}
