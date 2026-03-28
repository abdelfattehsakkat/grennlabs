import Link from 'next/link';
import { Leaf, Zap, Users, BookOpen, CheckCircle2, ArrowRight, Target, TrendingUp, Shield } from 'lucide-react';

const CHIFFRES = [
  { valeur: '4%', label: 'des émissions mondiales de GES', source: 'GreenIT.fr 2023', detail: 'En hausse de +8%/an — l\'aviation c\'est 2,5%' },
  { valeur: '80%', label: 'vient de la fabrication', source: 'ADEME 2022', detail: 'Pas des serveurs — des équipements utilisateurs' },
  { valeur: '78', label: 'critères RGESN 2024', source: 'Arcep/DINUM', detail: 'Répartis en 9 thématiques actionnables' },
  { valeur: '1 jour', label: 'pour maîtriser les fondamentaux', source: 'Notre formation', detail: 'Théorie + labs + outils concrets' },
];

const THEMATIQUES = [
  { num: '01', titre: 'Stratégie', profil: 'CP, Manager', couleur: 'emerald' },
  { num: '02', titre: 'Spécification', profil: 'QA, Analyste', couleur: 'green' },
  { num: '03', titre: 'Architecture', profil: 'Dev, Tech Lead', couleur: 'teal' },
  { num: '04', titre: 'UX / Interface', profil: 'Dev Frontend', couleur: 'emerald' },
  { num: '05', titre: 'Contenus', profil: 'Dev, Analyste', couleur: 'green' },
  { num: '06', titre: 'Frontend', profil: 'Dev Frontend', couleur: 'teal' },
  { num: '07', titre: 'Backend', profil: 'Dev Backend', couleur: 'emerald' },
  { num: '08', titre: 'Hébergement', profil: 'Dev, DevOps', couleur: 'green' },
  { num: '09', titre: 'Algorithmie / IA', profil: 'Dev, Data', couleur: 'teal' },
];

const PROFILS = [
  {
    icon: '⌨️',
    titre: 'Développeurs',
    pourcentage: '60%',
    modules: ['Thématiques Frontend & Backend (06, 07)', 'Architecture & Hébergement', 'EcoIndex & CodeCarbon en CI/CD', 'Critères d\'acceptance environnementaux'],
  },
  {
    icon: '🔍',
    titre: 'QA / Analystes',
    pourcentage: '30%',
    modules: ['Sobriété fonctionnelle dans les specs', 'User stories avec critères verts', 'NumEcoDiag pour auditer un service', 'Mesure avant/après une fonctionnalité'],
  },
  {
    icon: '📊',
    titre: 'Chefs de projet',
    pourcentage: '10%',
    modules: ['Loi REEN & CSRD — impact AO publics', 'Désigner un référent écoconception', 'KPIs environnementaux trimestriels', 'Déclaration d\'écoconception officielle'],
  },
];

const PROGRAMME = [
  { moment: 'Matin', titre: 'Icebreaker + Tronc commun (3 modules)', type: 'theorie', duree: '3h' },
  { moment: 'Matin', titre: 'Lab 01 — Audit collectif RGESN + Quiz mi-journée', type: 'atelier', duree: '1h30' },
  { moment: 'Après-midi', titre: 'Lab 02 — Atelier pratique multi-profils', type: 'atelier', duree: '1h15' },
  { moment: 'Fin de journée', titre: 'Plan d\'action individuel + Quiz final + Évaluation', type: 'exercice', duree: '55 min' },
];

const TYPE_COLORS: Record<string, string> = {
  quiz: 'bg-purple-900/50 text-purple-300 border-purple-800',
  theorie: 'bg-blue-900/50 text-blue-300 border-blue-800',
  atelier: 'bg-green-900/50 text-green-300 border-green-800',
  exercice: 'bg-orange-900/50 text-orange-300 border-orange-800',
  formulaire: 'bg-slate-800 text-slate-300 border-slate-700',
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur border-b border-slate-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Leaf className="w-5 h-5 text-green-400" />
            <span className="font-bold text-white">Green IT Formation</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="#programme" className="hidden sm:block text-sm text-slate-400 hover:text-white transition-colors">
              Programme
            </Link>
            <Link href="/login" className="btn-primary text-sm py-2 px-4">
              Accéder à la plateforme
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-24 pb-16 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="text-center max-w-4xl mx-auto">
          <div className="badge-green mb-6 mx-auto w-fit">
            <Leaf className="w-3 h-3" />
            Référentiel RGESN 2024 — Arcep / DINUM / MiNumEco
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
            Formez vos équipes au{' '}
            <span className="gradient-text">numérique responsable</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10">
            1 journée de formation intensive pour que vos développeurs, QA et chefs de projet
            maîtrisent le RGESN et repartent avec des outils concrets.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="#programme" className="btn-primary">
              Voir le programme <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/login" className="btn-ghost">
              Accéder à la plateforme
            </Link>
          </div>
        </div>

        {/* Partenaires */}
        <div className="mt-16 flex flex-wrap justify-center gap-8 opacity-40">
          {['Arcep', 'DINUM', 'MiNumEco', 'ADEME', 'GreenIT.fr'].map((p) => (
            <span key={p} className="text-slate-500 font-mono text-sm">{p}</span>
          ))}
        </div>
      </section>

      {/* Chiffres chocs */}
      <section className="py-16 px-4 sm:px-6 bg-slate-900/50 border-y border-slate-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center text-slate-500 text-sm font-mono uppercase tracking-wider mb-10">
            Pourquoi le Green IT n'est plus optionnel
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CHIFFRES.map((c) => (
              <div key={c.valeur} className="card text-center group hover:border-green-800 transition-colors">
                <div className="text-4xl sm:text-5xl font-black gradient-text mb-2">{c.valeur}</div>
                <div className="text-white font-semibold mb-1">{c.label}</div>
                <div className="text-slate-500 text-xs mb-3">{c.detail}</div>
                <div className="text-green-600 text-xs font-mono">{c.source}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Profils */}
      <section className="py-20 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="section-title mb-4">
            Une formation pensée pour{' '}
            <span className="gradient-text">votre ESN</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            3 profils, 1 tronc commun, des modules adaptés. Chaque participant repart avec des actions actionnables dès le lendemain.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROFILS.map((p) => (
            <div key={p.titre} className="card hover:border-green-800 transition-colors">
              <div className="text-3xl mb-3">{p.icon}</div>
              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-white font-bold text-lg">{p.titre}</h3>
                <span className="badge-slate">{p.pourcentage} des participants</span>
              </div>
              <ul className="space-y-2">
                {p.modules.map((m) => (
                  <li key={m} className="flex items-start gap-2 text-sm text-slate-400">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* 9 Thématiques RGESN */}
      <section className="py-20 px-4 sm:px-6 bg-slate-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-title mb-4">
              Les{' '}
              <span className="gradient-text">9 thématiques RGESN</span>{' '}
              couvertes
            </h2>
            <p className="text-slate-400">
              78 critères organisés par domaine — chaque participant identifie ceux qui s'appliquent à son rôle.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
            {THEMATIQUES.map((t) => (
              <div key={t.num} className="card-hover">
                <div className="text-green-500 font-mono text-xs mb-2">{t.num}</div>
                <div className="text-white font-semibold mb-1">{t.titre}</div>
                <div className="text-slate-500 text-xs">{t.profil}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programme */}
      <section id="programme" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="section-title mb-4">
            Programme de la journée
          </h2>
          <p className="text-slate-400">7h de formation en présentiel ou visio — 8h30 → 16h30</p>
        </div>

        <div className="space-y-2 max-w-3xl mx-auto">
          {PROGRAMME.map((bloc, i) => (
            <div
              key={i}
              className="flex items-center gap-4 bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 hover:border-slate-700 transition-colors"
            >
              <div className="text-green-500 font-mono text-sm w-28 flex-shrink-0">{bloc.moment}</div>
              <div className="flex-1 text-white text-sm font-medium">{bloc.titre}</div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-slate-500 text-xs">{bloc.duree}</span>
                <span className={`badge border text-xs ${TYPE_COLORS[bloc.type] || ''}`}>
                  {bloc.type}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Plateforme */}
      <section className="py-20 px-4 sm:px-6 bg-slate-900/50 border-y border-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="badge-green mb-4">
                <Zap className="w-3 h-3" />
                Plateforme incluse
              </div>
              <h2 className="section-title mb-6">
                Une plateforme interactive{' '}
                <span className="gradient-text">pensée Green IT</span>
              </h2>
              <p className="text-slate-400 mb-8">
                La plateforme elle-même applique les principes qu'elle enseigne : contenu optimisé, 
                design sobre, zéro ressource inutile. Parce que donner l'exemple, c'est la première leçon.
              </p>
              <ul className="space-y-3">
                {[
                  'Quiz interactifs avec correction immédiate et sources',
                  'Labs guidés avec livrables concrets par profil',
                  'Note ROTI — Return On Time Invested',
                  'Plan d\'action individuel téléchargeable',
                  'Dashboard formateur en temps réel',
                  'Score et attestation de complétion',
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: <Target className="w-6 h-6" />, titre: 'Quiz adaptatifs', desc: '3 quiz chronométrés, correction immédiate' },
                { icon: <BookOpen className="w-6 h-6" />, titre: 'Labs guidés', desc: '2 ateliers avec livrables réels' },
                { icon: <TrendingUp className="w-6 h-6" />, titre: 'Suivi progression', desc: 'Dashboard individuel et formateur' },
                { icon: <Shield className="w-6 h-6" />, titre: 'Sobre & sécurisé', desc: 'Hébergé sur VPS OVH France' },
              ].map((f) => (
                <div key={f.titre} className="card">
                  <div className="text-green-400 mb-3">{f.icon}</div>
                  <div className="text-white font-semibold text-sm mb-1">{f.titre}</div>
                  <div className="text-slate-500 text-xs">{f.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-24 px-4 sm:px-6 max-w-4xl mx-auto text-center">
        <div className="badge-green mb-6 mx-auto w-fit">
          <Users className="w-3 h-3" />
          8 à 20 participants — présentiel ou visio
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white mb-6">
          Prêt à former votre équipe ?
        </h2>
        <p className="text-slate-400 mb-10 max-w-xl mx-auto">
          Contactez-nous pour planifier une session. Délai de traitement : 48h.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="mailto:contact@greenit-formation.fr" className="btn-primary">
            Demander un devis <ArrowRight className="w-4 h-4" />
          </a>
          <Link href="/login" className="btn-ghost">
            Déjà inscrit ? Se connecter
          </Link>
        </div>
      </section>

      {/* Footer sobre */}
      <footer className="border-t border-slate-900 py-8 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-600 text-sm">
          <div className="flex items-center gap-2">
            <Leaf className="w-4 h-4 text-green-800" />
            <span>Green IT Formation — Référentiel RGESN 2024</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs">Hébergé en France · OVH VPS</span>
            <Link href="/login" className="hover:text-slate-400 transition-colors">Connexion</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
