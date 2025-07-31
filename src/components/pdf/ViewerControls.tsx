import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  ZoomOut, 
  Download, 
  Share2, 
  Search,
  Menu,
  Maximize,
  RotateCw,
  Home,
  Printer
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Catalog } from '../../stores/catalogStore';
import ShareModal from './ShareModal';

interface ViewerControlsProps {
  currentPage: number;
  totalPages: number;
  scale: number;
  onPageChange: (page: number) => void;
  onScaleChange: (scale: number) => void;
  onToggleSidebar: () => void;
  catalog: Catalog;
}

const ViewerControls: React.FC<ViewerControlsProps> = ({
  currentPage,
  totalPages,
  scale,
  onPageChange,
  onScaleChange,
  onToggleSidebar,
  catalog
}) => {
  const [showShareModal, setShowShareModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handleZoomIn = () => {
    onScaleChange(Math.min(4, scale + 0.25));
  };

  const handleZoomOut = () => {
    onScaleChange(Math.max(0.25, scale - 0.25));
  };

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleDownload = () => {
    // Download the actual PDF file
    const link = document.createElement('a');
    link.href = catalog.pdfUrl;
    link.download = `${catalog.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf`;
    link.target = '_blank';
    link.click();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <div className="bg-gray-800 border-b border-gray-700 px-4 py-2 flex items-center justify-between">
        {/* Left section */}
        <div className="flex items-center space-x-4">
          <Link
            to="/"
            className="text-white hover:text-gray-300 transition-colors"
            title="Retour à l'accueil"
          >
            <Home className="h-5 w-5" />
          </Link>
          
          <button
            onClick={onToggleSidebar}
            className="text-white hover:text-gray-300 transition-colors"
            title="Menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="text-white">
            <span className="font-medium">{catalog.title}</span>
          </div>
        </div>

        {/* Center section - Navigation */}
        <div className="flex items-center space-x-2">
          <button
            onClick={handlePrevPage}
            disabled={currentPage <= 1}
            className="p-2 text-white hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed rounded transition-colors"
            title="Page précédente"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <div className="flex items-center space-x-2 text-white">
            <input
              type="number"
              value={currentPage}
              onChange={(e) => {
                const page = parseInt(e.target.value);
                if (page >= 1 && page <= totalPages) {
                  onPageChange(page);
                }
              }}
              className="w-16 px-2 py-1 bg-gray-700 text-white rounded text-center text-sm"
              min={1}
              max={totalPages}
            />
            <span className="text-sm">/ {totalPages}</span>
          </div>

          <button
            onClick={handleNextPage}
            disabled={currentPage >= totalPages}
            className="p-2 text-white hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed rounded transition-colors"
            title="Page suivante"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-2">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 pr-3 py-1 bg-gray-700 text-white rounded text-sm w-32 focus:w-48 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Zoom controls */}
          <div className="flex items-center space-x-1 bg-gray-700 rounded">
            <button
              onClick={handleZoomOut}
              className="p-2 text-white hover:bg-gray-600 rounded-l transition-colors"
              title="Zoom arrière"
            >
              <ZoomOut className="h-4 w-4" />
            </button>
            <span className="px-2 text-white text-sm min-w-[3rem] text-center">
              {Math.round(scale * 100)}%
            </span>
            <button
              onClick={handleZoomIn}
              className="p-2 text-white hover:bg-gray-600 rounded-r transition-colors"
              title="Zoom avant"
            >
              <ZoomIn className="h-4 w-4" />
            </button>
          </div>

          {/* Action buttons */}
          <button
            onClick={handlePrint}
            className="p-2 text-white hover:bg-gray-700 rounded transition-colors"
            title="Imprimer"
          >
            <Printer className="h-4 w-4" />
          </button>

          <button
            onClick={handleDownload}
            className="p-2 text-white hover:bg-gray-700 rounded transition-colors"
            title="Télécharger"
          >
            <Download className="h-4 w-4" />
          </button>

          <button
            onClick={() => setShowShareModal(true)}
            className="p-2 text-white hover:bg-gray-700 rounded transition-colors"
            title="Partager"
          >
            <Share2 className="h-4 w-4" />
          </button>

          <button
            onClick={handleFullscreen}
            className="p-2 text-white hover:bg-gray-700 rounded transition-colors"
            title="Plein écran"
          >
            <Maximize className="h-4 w-4" />
          </button>
        </div>
      </div>

      {showShareModal && (
        <ShareModal
          catalog={catalog}
          onClose={() => setShowShareModal(false)}
        />
      )}
    </>
  );
};

export default ViewerControls;