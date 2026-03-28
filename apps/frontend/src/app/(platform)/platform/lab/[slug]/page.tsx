import LabGuide from '@/components/LabGuide';
import { LABS } from '@/data/labs';
import { notFound } from 'next/navigation';
import { Beaker } from 'lucide-react';

export default function LabPage({ params }: { params: { slug: string } }) {
  const lab = LABS.find((l) => l.slug === params.slug);
  if (!lab) notFound();

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <div className="badge-green mb-3">
          <Beaker className="w-3 h-3" />
          Atelier pratique
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">{lab.titre}</h1>
        <p className="text-slate-400 text-sm max-w-xl">{lab.objectif}</p>
      </div>
      <LabGuide labId={lab.id} />
    </div>
  );
}

export function generateStaticParams() {
  return LABS.map((l) => ({ slug: l.slug }));
}
