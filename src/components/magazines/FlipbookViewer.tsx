'use client';

import React, { useState, useRef, forwardRef, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
// @ts-ignore
import HTMLFlipBook from 'react-pageflip';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Usar el worker desde el CDN para evitar problemas de webpack en Next.js
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface FlipbookViewerProps {
  pdfUrl: string;
  title: string;
}

const PageContent = forwardRef<HTMLDivElement, { pageNumber: number, width: number }>((props, ref) => {
  return (
    <div className="bg-white h-full flex items-center justify-center overflow-hidden border border-gray-100 shadow-sm" ref={ref}>
      <Page 
        pageNumber={props.pageNumber} 
        width={props.width}
        renderTextLayer={false}
        renderAnnotationLayer={false}
        className="select-none pointer-events-none"
      />
    </div>
  );
});
PageContent.displayName = 'PageContent';

export const FlipbookViewer: React.FC<FlipbookViewerProps> = ({ pdfUrl, title }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [windowWidth, setWindowWidth] = useState(800);
  const [isClient, setIsClient] = useState(false);
  
  const bookRef = useRef<any>(null);

  useEffect(() => {
    setIsClient(true);
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const onPage = (e: any) => {
    setPageNumber(e.data + 1); // e.data is the page index (0-based)
  };

  const nextButtonClick = () => {
    if (bookRef.current) bookRef.current.pageFlip().flipNext();
  };

  const prevButtonClick = () => {
    if (bookRef.current) bookRef.current.pageFlip().flipPrev();
  };

  if (!isClient) return null;

  // Calculamos el tamaño exacto del libro basado en la pantalla
  const isMobile = windowWidth < 768;
  // Ancho de UNA sola página (el flipbook muestra 2 en desktop)
  const pageWidth = isMobile ? windowWidth - 40 : Math.min(450, (windowWidth - 100) / 2);
  const pageHeight = pageWidth * 1.414; // Proporción estándar (A4/Carta)

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[70vh]">
      
      {/* Controles superiores */}
      <div className="flex items-center justify-between w-full max-w-4xl mb-6 px-4">
        <h2 className="text-xl font-bold text-gray-800 line-clamp-1">{title}</h2>
        <div className="flex items-center gap-4 text-sm font-semibold text-gray-500 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100 shrink-0">
          <span>Página {pageNumber} de {numPages || '--'}</span>
        </div>
      </div>

      <div className="relative flex items-center justify-center w-full max-w-5xl">
        {/* Botón Anterior */}
        <button 
          onClick={prevButtonClick}
          disabled={pageNumber <= 1}
          className="absolute left-0 md:-left-12 z-10 p-3 bg-white/80 hover:bg-white text-[#522B8B] rounded-full shadow-lg border border-purple-100 disabled:opacity-30 transition-all backdrop-blur-md"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Visor de PDF y Flipbook */}
        <div className="shadow-2xl ring-1 ring-black/5 bg-gray-900 flex items-center justify-center overflow-hidden rounded-lg">
          <Document
            file={pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={
              <div className="flex flex-col items-center justify-center p-20 text-white min-h-[500px]">
                <Loader2 className="w-10 h-10 animate-spin mb-4" />
                <p className="font-bold animate-pulse">Cargando páginas y optimizando resolución...</p>
              </div>
            }
          >
            {numPages && (
              <>
                <style>{`
                  .react-pdf__Page__canvas {
                    width: 100% !important;
                    height: 100% !important;
                    object-fit: fill;
                  }
                  .react-pdf__Page {
                    width: 100% !important;
                    height: 100% !important;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                  }
                `}</style>
                {/* @ts-ignore */}
                <HTMLFlipBook
                  width={pageWidth}
                  height={pageHeight}
                  size="fixed"
                  showCover={true}
                  mobileScrollSupport={true}
                  onFlip={onPage}
                  ref={bookRef}
                  className="flipbook-component mx-auto"
                  style={{ margin: '0 auto', backgroundColor: '#111827' }}
                  useMouseEvents={true}
                >
                  {Array.from(new Array(numPages), (el, index) => (
                    <PageContent key={`page_${index + 1}`} pageNumber={index + 1} width={pageWidth} />
                  ))}
                </HTMLFlipBook>
              </>
            )}
          </Document>
        </div>

        {/* Botón Siguiente */}
        <button 
          onClick={nextButtonClick}
          disabled={pageNumber >= (numPages || 1)}
          className="absolute right-0 md:-right-12 z-10 p-3 bg-white/80 hover:bg-white text-[#522B8B] rounded-full shadow-lg border border-purple-100 disabled:opacity-30 transition-all backdrop-blur-md"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
      
    </div>
  );
};
