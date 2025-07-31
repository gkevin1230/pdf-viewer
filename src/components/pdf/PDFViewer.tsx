import React, { useEffect, useRef, useState, useCallback } from 'react';
import HTMLFlipBook from 'react-pageflip';
import * as pdfjsLib from 'pdfjs-dist';

// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/pdf.worker.min.js`;

interface PDFViewerProps {
  pdfUrl: string;
  currentPage: number;
  scale: number;
  onPageChange: (page: number) => void;
  onTotalPagesChange: (total: number) => void;
}

const PDFViewer: React.FC<PDFViewerProps> = ({
  pdfUrl,
  currentPage,
  scale,
  onPageChange,
  onTotalPagesChange
}) => {
  const flipBookRef = useRef<any>(null);
  const [pdfDoc, setPdfDoc] = useState<pdfjsLib.PDFDocumentProxy | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [renderedPages, setRenderedPages] = useState<Map<number, string>>(new Map());
  const [isFlipBookReady, setIsFlipBookReady] = useState(false);

  // Load PDF document
  useEffect(() => {
    const loadPdf = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        console.log('Loading PDF from:', pdfUrl);
        
        // Handle different types of PDF URLs
        let loadingTask;
        if (pdfUrl.startsWith('blob:') || pdfUrl.startsWith('http')) {
          // Real uploaded file or external URL
          loadingTask = pdfjsLib.getDocument({
            url: pdfUrl,
            cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@4.0.379/cmaps/',
            cMapPacked: true,
          });
        } else {
          // Mock PDF for demo
          const mockPdf = await createMockPDF();
          setPdfDoc(mockPdf);
          onTotalPagesChange(mockPdf.numPages);
          setIsLoading(false);
          return;
        }
        
        const pdf = await loadingTask.promise;
        console.log('PDF loaded successfully, pages:', pdf.numPages);
        setPdfDoc(pdf);
        onTotalPagesChange(pdf.numPages);
        setIsLoading(false);
      } catch (err) {
        console.error('Error loading PDF:', err);
        setError(`Erreur lors du chargement du PDF: ${err instanceof Error ? err.message : 'Erreur inconnue'}`);
        setIsLoading(false);
      }
    };

    if (pdfUrl) {
      loadPdf();
    }
  }, [pdfUrl, onTotalPagesChange]);

  // Create mock PDF for demo
  const createMockPDF = async () => {
    return {
      numPages: 48,
      getPage: async (pageNum: number) => ({
        getViewport: (params: any) => ({
          width: 595 * (params.scale || 1),
          height: 842 * (params.scale || 1),
          transform: [params.scale || 1, 0, 0, params.scale || 1, 0, 0]
        }),
        render: (renderContext: any) => {
          const { canvasContext, viewport } = renderContext;
          
          // Clear canvas
          canvasContext.fillStyle = 'white';
          canvasContext.fillRect(0, 0, viewport.width, viewport.height);
          
          // Draw page content based on page number
          canvasContext.fillStyle = '#333';
          canvasContext.font = `${24 * (viewport.transform[0] || 1)}px Arial`;
          canvasContext.textAlign = 'center';
          
          if (pageNum === 1) {
            // Cover page
            canvasContext.fillStyle = '#1e40af';
            canvasContext.fillRect(0, 0, viewport.width, viewport.height);
            canvasContext.fillStyle = 'white';
            canvasContext.font = `${36 * (viewport.transform[0] || 1)}px Arial`;
            canvasContext.fillText('CATALOGUE', viewport.width / 2, viewport.height / 3);
            canvasContext.font = `${24 * (viewport.transform[0] || 1)}px Arial`;
            canvasContext.fillText('PRINTEMPS 2024', viewport.width / 2, viewport.height / 2);
          } else if (pageNum <= 5) {
            // Table of contents
            canvasContext.fillText(`Sommaire - Page ${pageNum}`, viewport.width / 2, 100 * (viewport.transform[0] || 1));
            const items = [
              'Collection Printemps .................. 6',
              'Nouveautés ........................... 15',
              'Robes ................................ 20',
              'Accessoires .......................... 30',
              'Soldes ............................... 40'
            ];
            canvasContext.font = `${16 * (viewport.transform[0] || 1)}px Arial`;
            canvasContext.textAlign = 'left';
            items.forEach((item, index) => {
              canvasContext.fillText(item, 100 * (viewport.transform[0] || 1), (200 + index * 40) * (viewport.transform[0] || 1));
            });
          } else {
            // Content pages
            canvasContext.fillText(`Page ${pageNum}`, viewport.width / 2, 100 * (viewport.transform[0] || 1));
            
            // Draw mock product grid
            const cols = 2;
            const rows = 2;
            const itemWidth = (viewport.width - 100 * (viewport.transform[0] || 1)) / cols;
            const itemHeight = (viewport.height - 200 * (viewport.transform[0] || 1)) / rows;
            
            for (let row = 0; row < rows; row++) {
              for (let col = 0; col < cols; col++) {
                const x = 50 * (viewport.transform[0] || 1) + col * itemWidth;
                const y = 150 * (viewport.transform[0] || 1) + row * itemHeight;
                
                // Draw product placeholder
                canvasContext.strokeStyle = '#ddd';
                canvasContext.lineWidth = 2;
                canvasContext.strokeRect(x, y, itemWidth - 20 * (viewport.transform[0] || 1), itemHeight - 20 * (viewport.transform[0] || 1));
                
                // Product name
                canvasContext.fillStyle = '#666';
                canvasContext.font = `${14 * (viewport.transform[0] || 1)}px Arial`;
                canvasContext.textAlign = 'center';
                canvasContext.fillText(
                  `Produit ${row * cols + col + 1}`,
                  x + itemWidth / 2,
                  y + itemHeight - 40 * (viewport.transform[0] || 1)
                );
                
                // Price
                canvasContext.fillStyle = '#1e40af';
                canvasContext.font = `${16 * (viewport.transform[0] || 1)}px Arial`;
                canvasContext.fillText(
                  `${29.99 + (pageNum * 2) + (row * cols + col)}€`,
                  x + itemWidth / 2,
                  y + itemHeight - 20 * (viewport.transform[0] || 1)
                );
              }
            }
          }
          
          // Draw page border
          canvasContext.strokeStyle = '#ddd';
          canvasContext.lineWidth = 1;
          canvasContext.strokeRect(0, 0, viewport.width, viewport.height);
          
          return { promise: Promise.resolve() };
        }
      })
    } as pdfjsLib.PDFDocumentProxy;
  };

  // Render page to canvas and return as data URL
  const renderPageToDataURL = useCallback(async (pageNum: number): Promise<string> => {
    if (!pdfDoc) return '';
    
    // Check if page is already rendered
    if (renderedPages.has(pageNum)) {
      return renderedPages.get(pageNum)!;
    }

    try {
      const page = await pdfDoc.getPage(pageNum);
      const viewport = page.getViewport({ scale: 2.0 }); // Higher resolution for better quality
      
      // Create temporary canvas
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      if (!context) return '';
      
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      
      const renderContext = {
        canvasContext: context,
        viewport: viewport
      };
      
      await page.render(renderContext).promise;
      const dataURL = canvas.toDataURL('image/jpeg', 0.9);
      
      // Cache the rendered page
      setRenderedPages(prev => new Map(prev).set(pageNum, dataURL));
      
      return dataURL;
    } catch (err) {
      console.error('Error rendering page:', pageNum, err);
      return '';
    }
  }, [pdfDoc, renderedPages]);

  // Pre-render pages when PDF is loaded
  useEffect(() => {
    const preRenderPages = async () => {
      if (!pdfDoc || isFlipBookReady) return;

      try {
        console.log('Pre-rendering pages...');
        // Pre-render first 6 pages for immediate display
        const initialPages = Math.min(6, pdfDoc.numPages);
        const pagePromises = [];
        
        for (let i = 1; i <= initialPages; i++) {
          pagePromises.push(renderPageToDataURL(i));
        }
        
        await Promise.all(pagePromises);
        console.log('Initial pages pre-rendered');
        setIsFlipBookReady(true);
        
        // Continue rendering remaining pages in background
        if (pdfDoc.numPages > 6) {
          setTimeout(async () => {
            const remainingPromises = [];
            for (let i = 7; i <= pdfDoc.numPages; i++) {
              remainingPromises.push(renderPageToDataURL(i));
            }
            await Promise.all(remainingPromises);
            console.log('All pages rendered');
          }, 1000);
        }
        
      } catch (err) {
        console.error('Error pre-rendering pages:', err);
        setError('Erreur lors du rendu des pages');
      }
    };

    preRenderPages();
  }, [pdfDoc, renderPageToDataURL, isFlipBookReady]);

  // Handle page change from flipbook
  const handleFlipBookPageChange = useCallback((e: any) => {
    const newPage = e.data + 1; // react-pageflip uses 0-based indexing
    if (newPage !== currentPage) {
      onPageChange(newPage);
    }
  }, [currentPage, onPageChange]);

  // Handle external page change (from controls)
  useEffect(() => {
    if (flipBookRef.current && isFlipBookReady) {
      const pageFlipInstance = flipBookRef.current.pageFlip();
      if (pageFlipInstance) {
      const flipBookPage = currentPage - 1; // Convert to 0-based indexing
        if (pageFlipInstance.getCurrentPageIndex() !== flipBookPage) {
          pageFlipInstance.flip(flipBookPage);
        }
      }
    }
  }, [currentPage, isFlipBookReady]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && currentPage > 1) {
        onPageChange(currentPage - 1);
      } else if (e.key === 'ArrowRight' && pdfDoc && currentPage < pdfDoc.numPages) {
        onPageChange(currentPage + 1);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentPage, pdfDoc, onPageChange]);

  // Create page components for flipbook
  const createPages = () => {
    if (!pdfDoc || !isFlipBookReady) return [];
    
    const pages = [];
    for (let i = 1; i <= pdfDoc.numPages; i++) {
      const pageDataURL = renderedPages.get(i);
      pages.push(
        <div key={i} className="page-wrapper">
          {pageDataURL ? (
            <img
              src={pageDataURL}
              alt={`Page ${i}`}
              className="page-image"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                display: 'block'
              }}
            />
          ) : (
            <div className="page-loading">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
              <p className="text-sm text-gray-600">Chargement page {i}...</p>
            </div>
          )}
        </div>
      );
    }
    return pages;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4 mx-auto"></div>
          <p className="text-lg font-medium">Chargement du catalogue...</p>
          <p className="text-sm text-gray-300 mt-2">Analyse du PDF en cours...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center text-red-400 max-w-md">
          <p className="text-lg font-medium mb-2">Erreur de chargement</p>
          <p className="mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Recharger
          </button>
        </div>
      </div>
    );
  }

  if (!isFlipBookReady) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4 mx-auto"></div>
          <p className="text-lg font-medium">Préparation du flipbook...</p>
          <p className="text-sm text-gray-300 mt-2">Optimisation des pages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-hidden bg-gray-800 flex items-center justify-center p-4">
      <div 
        className="flipbook-container"
        style={{
          transform: `scale(${Math.min(1, scale * 0.8)})`,
          transformOrigin: 'center center'
        }}
      >
        <HTMLFlipBook
          ref={flipBookRef}
          width={400}
          height={600}
          size="stretch"
          minWidth={300}
          maxWidth={500}
          minHeight={400}
          maxHeight={700}
          maxShadowOpacity={0.5}
          showCover={true}
          mobileScrollSupport={true}
          onFlip={handleFlipBookPageChange}
          className="flipbook"
          style={{
            margin: '0 auto'
          }}
          usePortrait={true}
          startPage={0}
          drawShadow={true}
          flippingTime={600}
          useMouseEvents={true}
          swipeDistance={30}
          clickEventForward={true}
          disableFlipByClick={false}
        >
          {createPages()}
        </HTMLFlipBook>
      </div>

      <style jsx>{`
        .flipbook-container {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
        }
        
        .page-wrapper {
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          box-shadow: 0 0 20px rgba(0,0,0,0.2);
        }
        
        .page-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          background: #f9fafb;
        }
        
        .page-image {
          user-select: none;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
};

export default PDFViewer;