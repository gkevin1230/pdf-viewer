import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCatalogStore } from '../../stores/catalogStore';
import PDFViewer from '../../components/pdf/PDFViewer';
import ViewerControls from '../../components/pdf/ViewerControls';
import ViewerSidebar from '../../components/pdf/ViewerSidebar';
import PasswordPrompt from '../../components/pdf/PasswordPrompt';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const CatalogViewer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { catalogs, setCurrentCatalog, currentCatalog } = useCatalogStore();
  const [showSidebar, setShowSidebar] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [scale, setScale] = useState(1);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const catalog = catalogs.find(c => c.id === id);

  useEffect(() => {
    if (catalog) {
      setCurrentCatalog(catalog);
      // Check authentication for password-protected catalogs
      if (catalog.visibility === 'password') {
        const isAuth = sessionStorage.getItem(`catalog_auth_${catalog.id}`) === 'true';
        setIsAuthenticated(isAuth);
      } else {
        setIsAuthenticated(true);
      }
    }
    setLoading(false);
  }, [catalog, setCurrentCatalog]);

  const handlePasswordSubmit = (password: string) => {
    if (catalog && catalog.password === password) {
      setIsAuthenticated(true);
      sessionStorage.setItem(`catalog_auth_${catalog.id}`, 'true');
    } else {
      alert('Mot de passe incorrect');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <LoadingSpinner size="lg" className="text-white" />
      </div>
    );
  }

  if (!catalog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Catalogue non trouvé</h1>
          <p className="text-gray-400">Le catalogue demandé n'existe pas ou n'est plus disponible.</p>
        </div>
      </div>
    );
  }

  if (catalog.visibility === 'password' && !isAuthenticated) {
    return <PasswordPrompt onSubmit={handlePasswordSubmit} />;
  }

  return (
    <div className="h-screen bg-gray-900 flex flex-col overflow-hidden">
      {/* Controls */}
      <ViewerControls
        currentPage={currentPage}
        totalPages={totalPages}
        scale={scale}
        onPageChange={setCurrentPage}
        onScaleChange={setScale}
        onToggleSidebar={() => setShowSidebar(!showSidebar)}
        catalog={catalog}
      />

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <ViewerSidebar
          isOpen={showSidebar}
          catalog={catalog}
          currentPage={currentPage}
          onPageSelect={setCurrentPage}
          onClose={() => setShowSidebar(false)}
        />

        {/* PDF Viewer */}
        <div className="flex-1 bg-gray-800">
          <PDFViewer
            pdfUrl={catalog.pdfUrl}
            currentPage={currentPage}
            scale={scale}
            onPageChange={setCurrentPage}
            onTotalPagesChange={setTotalPages}
          />
        </div>
      </div>
    </div>
  );
};

export default CatalogViewer;