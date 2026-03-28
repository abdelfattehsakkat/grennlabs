'use client';

import { useEffect, useState, useCallback } from 'react';
import { ExternalLink, ChevronLeft, ChevronRight, Lightbulb } from 'lucide-react';

type Section = {
  titre: string;
  contenu: string;
  messageFormateur?: string;
};

type Ressource = {
  label: string;
  url: string;
};

export default function ModuleSlides({
  sections,
  ressources,
}: {
  sections: Section[];
  ressources?: Ressource[];
}) {
  const [current, setCurrent] = useState(0);
  const total = sections.length;

  const prev = useCallback(() => setCurrent((c) => Math.max(c - 1, 0)), []);
  const next = useCallback(() => setCurrent((c) => Math.min(c + 1, total - 1)), [total]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next();
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') prev();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [next, prev]);

  const section = sections[current];
  const isFirst = current === 0;
  const isLast = current === total - 1;

  return (
    <div className="space-y-4">
      {/* Progress bar + counter */}
      <div className="flex items-center gap-2">
        {sections.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            title={sections[i].titre}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current
                ? 'flex-[3] bg-green-400'
                : i < current
                ? 'flex-1 bg-green-900'
                : 'flex-1 bg-slate-700 hover:bg-slate-500'
            }`}
            aria-label={`Section ${i + 1} : ${sections[i].titre}`}
          />
        ))}
        <span className="ml-3 text-slate-500 text-xs font-mono whitespace-nowrap">
          {current + 1} / {total}
        </span>
      </div>

      {/* Slide card */}
      <div className="card min-h-[540px] flex flex-col">
        <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
          <span className="text-green-500 font-mono text-sm bg-green-950/50 px-2.5 py-1 rounded border border-green-900 flex-shrink-0">
            {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
          {section.titre}
        </h2>

        <div
          className="module-content text-slate-200 text-base leading-relaxed flex-1"
          dangerouslySetInnerHTML={{ __html: section.contenu }}
        />

        {section.messageFormateur && (
          <div className="mt-8 border-l-2 border-green-500 pl-5 bg-green-950/30 rounded-r-xl py-4 pr-5">
            <div className="flex items-center gap-2 text-green-400 text-xs font-semibold mb-2 uppercase tracking-widest">
              <Lightbulb className="w-3.5 h-3.5" />
              Ce qu&apos;il faut retenir
            </div>
            <p className="text-green-100 text-sm leading-relaxed">{section.messageFormateur}</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={prev}
          disabled={isFirst}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            isFirst
              ? 'text-slate-700 cursor-not-allowed'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          Précédent
        </button>

        <span className="text-slate-700 text-xs hidden sm:block">← → pour naviguer</span>

        <button
          onClick={next}
          disabled={isLast}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            isLast
              ? 'text-slate-700 cursor-not-allowed'
              : 'bg-green-900/50 text-green-300 hover:bg-green-900 border border-green-800'
          }`}
        >
          Suivant
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Resources — visible on last slide */}
      {isLast && ressources && ressources.length > 0 && (
        <div className="card mt-2">
          <h3 className="text-slate-400 text-sm font-medium mb-3 flex items-center gap-2">
            <ExternalLink className="w-3.5 h-3.5" />
            Ressources officielles
          </h3>
          <div className="space-y-2">
            {ressources.map((r) => (
              <a
                key={r.label}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-green-400 hover:text-green-300 transition-colors"
              >
                <ExternalLink className="w-3 h-3 flex-shrink-0" />
                {r.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
