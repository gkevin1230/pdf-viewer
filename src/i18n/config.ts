import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  fr: {
    translation: {
      // Navigation
      home: 'Accueil',
      catalogs: 'Catalogues',
      admin: 'Administration',
      login: 'Connexion',
      logout: 'Déconnexion',
      
      // Common
      loading: 'Chargement...',
      search: 'Rechercher',
      upload: 'Télécharger',
      download: 'Télécharger',
      share: 'Partager',
      print: 'Imprimer',
      fullscreen: 'Plein écran',
      zoom: 'Zoom',
      page: 'Page',
      of: 'sur',
      
      // Viewer
      previousPage: 'Page précédente',
      nextPage: 'Page suivante',
      firstPage: 'Première page',
      lastPage: 'Dernière page',
      bookmarks: 'Signets',
      thumbnails: 'Miniatures',
      tableOfContents: 'Table des matières',
      
      // Admin
      dashboard: 'Tableau de bord',
      uploadCatalog: 'Télécharger un catalogue',
      manageCatalogs: 'Gérer les catalogues',
      statistics: 'Statistiques',
      title: 'Titre',
      description: 'Description',
      category: 'Catégorie',
      visibility: 'Visibilité',
      public: 'Public',
      private: 'Privé',
      passwordProtected: 'Protégé par mot de passe',
      
      // Messages
      uploadSuccess: 'Catalogue téléchargé avec succès',
      uploadError: 'Erreur lors du téléchargement',
      loginRequired: 'Connexion requise',
      accessDenied: 'Accès refusé',
    }
  },
  en: {
    translation: {
      // Navigation
      home: 'Home',
      catalogs: 'Catalogs',
      admin: 'Administration',
      login: 'Login',
      logout: 'Logout',
      
      // Common
      loading: 'Loading...',
      search: 'Search',
      upload: 'Upload',
      download: 'Download',
      share: 'Share',
      print: 'Print',
      fullscreen: 'Fullscreen',
      zoom: 'Zoom',
      page: 'Page',
      of: 'of',
      
      // Viewer
      previousPage: 'Previous page',
      nextPage: 'Next page',
      firstPage: 'First page',
      lastPage: 'Last page',
      bookmarks: 'Bookmarks',
      thumbnails: 'Thumbnails',
      tableOfContents: 'Table of contents',
      
      // Admin
      dashboard: 'Dashboard',
      uploadCatalog: 'Upload Catalog',
      manageCatalogs: 'Manage Catalogs',
      statistics: 'Statistics',
      title: 'Title',
      description: 'Description',
      category: 'Category',
      visibility: 'Visibility',
      public: 'Public',
      private: 'Private',
      passwordProtected: 'Password protected',
      
      // Messages
      uploadSuccess: 'Catalog uploaded successfully',
      uploadError: 'Upload error',
      loginRequired: 'Login required',
      accessDenied: 'Access denied',
    }
  },
  es: {
    translation: {
      // Navigation
      home: 'Inicio',
      catalogs: 'Catálogos',
      admin: 'Administración',
      login: 'Iniciar sesión',
      logout: 'Cerrar sesión',
      
      // Common
      loading: 'Cargando...',
      search: 'Buscar',
      upload: 'Subir',
      download: 'Descargar',
      share: 'Compartir',
      print: 'Imprimir',
      fullscreen: 'Pantalla completa',
      zoom: 'Zoom',
      page: 'Página',
      of: 'de',
      
      // Viewer
      previousPage: 'Página anterior',
      nextPage: 'Página siguiente',
      firstPage: 'Primera página',
      lastPage: 'Última página',
      bookmarks: 'Marcadores',
      thumbnails: 'Miniaturas',
      tableOfContents: 'Tabla de contenidos',
      
      // Admin
      dashboard: 'Panel de control',
      uploadCatalog: 'Subir Catálogo',
      manageCatalogs: 'Gestionar Catálogos',
      statistics: 'Estadísticas',
      title: 'Título',
      description: 'Descripción',
      category: 'Categoría',
      visibility: 'Visibilidad',
      public: 'Público',
      private: 'Privado',
      passwordProtected: 'Protegido con contraseña',
      
      // Messages
      uploadSuccess: 'Catálogo subido exitosamente',
      uploadError: 'Error al subir',
      loginRequired: 'Inicio de sesión requerido',
      accessDenied: 'Acceso denegado',
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'fr',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;