'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { Leaf, LogOut, LayoutDashboard, BookOpen, Beaker, Target, ClipboardList, Star, Zap } from 'lucide-react';

const NAV_ITEMS = [
  { href: '/platform/dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
  { href: '/platform/quiz/icebreaker', label: 'Quiz Icebreaker', icon: Zap },
  { href: '/platform/module/enjeux-numerique', label: 'Module 01 — Enjeux', icon: BookOpen },
  { href: '/platform/module/rgesn', label: 'Module 02 — RGESN', icon: BookOpen },
  { href: '/platform/lab/lab-01', label: 'Lab 01 — Audit RGESN', icon: Beaker },
  { href: '/platform/quiz/mi-journee', label: 'Quiz mi-journée', icon: Zap },
  { href: '/platform/module/mesurer', label: 'Module 03 — Mesurer', icon: BookOpen },
  { href: '/platform/lab/lab-02', label: 'Lab 02 — Multi-profils', icon: Beaker },
  { href: '/platform/plan-action', label: 'Plan d\'action', icon: Target },
  { href: '/platform/quiz/final', label: 'Quiz final', icon: Zap },
  { href: '/platform/evaluation', label: 'Évaluation', icon: Star },
];

export default function PlatformLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col fixed h-full hidden lg:flex">
        <div className="p-4 border-b border-slate-800">
          <Link href="/" className="flex items-center gap-2">
            <Leaf className="w-5 h-5 text-green-400" />
            <span className="font-bold text-white text-sm">Green IT Formation</span>
          </Link>
        </div>

        <nav className="flex-1 p-3 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm mb-0.5 transition-colors ${
                  active
                    ? 'bg-green-900/50 text-green-400 border border-green-800'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800">
          {user && (
            <div className="flex items-center justify-between">
              <div>
                <div className="text-white text-sm font-medium">{user.prenom} {user.nom}</div>
                <div className="text-slate-500 text-xs capitalize">{user.role}</div>
              </div>
              <button onClick={logout} className="text-slate-500 hover:text-red-400 transition-colors" title="Se déconnecter">
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 lg:ml-64 min-h-screen">
        {children}
      </main>
    </div>
  );
}
