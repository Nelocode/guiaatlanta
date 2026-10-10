'use client';

import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';

const FlipbookViewer = dynamic(
  () => import('./FlipbookViewer').then(mod => mod.FlipbookViewer),
  { 
    ssr: false,
    loading: () => (
      <div className="flex flex-col items-center justify-center p-20 text-[#522B8B] min-h-[500px]">
        <Loader2 className="w-10 h-10 animate-spin mb-4" />
        <p className="font-bold animate-pulse">Iniciando visor interactivo...</p>
      </div>
    )
  }
);

export default function FlipbookWrapper({ pdfUrl, title }: { pdfUrl: string, title: string }) {
  return <FlipbookViewer pdfUrl={pdfUrl} title={title} />;
}
