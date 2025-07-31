import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './i18n/config';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Navbar from './components/layout/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/auth/LoginPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import CatalogUpload from './pages/admin/CatalogUpload';
import CatalogStats from './pages/admin/CatalogStats';
import CatalogViewer from './pages/viewer/CatalogViewer';
import EmbedViewer from './pages/viewer/EmbedViewer';
import CatalogList from './pages/CatalogList';

function App() {
  const { i18n } = useTranslation();

  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<><Navbar /><HomePage /></>} />
              <Route path="/login" element={<><Navbar /><LoginPage /></>} />
              <Route path="/catalogs" element={<><Navbar /><CatalogList /></>} />
              <Route path="/catalog/:id" element={<CatalogViewer />} />
              <Route path="/embed/:id" element={<EmbedViewer />} />
              
              {/* Protected admin routes */}
              <Route path="/admin" element={
                <ProtectedRoute>
                  <Navbar />
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              <Route path="/admin/upload" element={
                <ProtectedRoute>
                  <Navbar />
                  <CatalogUpload />
                </ProtectedRoute>
              } />
              <Route path="/admin/stats/:id" element={
                <ProtectedRoute>
                  <Navbar />
                  <CatalogStats />
                </ProtectedRoute>
              } />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;