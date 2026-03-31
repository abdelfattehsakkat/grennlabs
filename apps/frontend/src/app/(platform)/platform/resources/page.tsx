'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { FileDown, FolderOpen, Loader2 } from 'lucide-react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3006';

export default function ResourcesPage() {
  const [files, setFiles] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/resources')
      .then((data: any) => setFiles((data.files || []).filter((f: string) => !f.startsWith('.'))))
      .catch(() => setFiles([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <FolderOpen className="w-6 h-6 text-green-400" />
        <h1 className="text-xl font-bold text-white">Ressources</h1>
      </div>

      {loading ? (
        <div className="flex items-center gap-2 text-slate-400">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span className="text-sm">Chargement...</span>
        </div>
      ) : files.length === 0 ? (
        <p className="text-slate-500 text-sm">Aucune ressource disponible.</p>
      ) : (
        <div className="space-y-1">
          {files.map((file) => (
            <a
              key={file}
              href={`${API_BASE}/api/resources/download/${encodeURIComponent(file)}`}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <FileDown className="w-4 h-4 flex-shrink-0 text-slate-500" />
              <span className="text-sm">{file}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
