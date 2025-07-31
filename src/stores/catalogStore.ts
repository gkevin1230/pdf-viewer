import { create } from 'zustand';

export interface Catalog {
  id: string;
  title: string;
  description: string;
  category: string;
  thumbnailUrl: string;
  pdfUrl: string;
  visibility: 'public' | 'private' | 'password';
  password?: string;
  uploadDate: Date;
  lastModified: Date;
  fileSize: number;
  pageCount: number;
  views: number;
  downloads: number;
  shares: number;
  keywords: string[];
  author: string;
  fileId?: string; // For uploaded files
}

export interface CatalogStats {
  totalViews: number;
  averageViewTime: number;
  pagesRead: number;
  deviceTypes: Record<string, number>;
  referrers: Record<string, number>;
  dailyViews: Array<{ date: string; views: number }>;
}

interface CatalogStore {
  catalogs: Catalog[];
  currentCatalog: Catalog | null;
  stats: Record<string, CatalogStats>;
  loading: boolean;
  error: string | null;
  
  // Actions
  setCatalogs: (catalogs: Catalog[]) => void;
  addCatalog: (catalog: Catalog) => void;
  updateCatalog: (id: string, updates: Partial<Catalog>) => void;
  deleteCatalog: (id: string) => void;
  setCurrentCatalog: (catalog: Catalog | null) => void;
  setStats: (catalogId: string, stats: CatalogStats) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useCatalogStore = create<CatalogStore>((set, get) => ({
  catalogs: [
    {
      id: '1',
      title: 'Catalogue Printemps 2024',
      description: 'Découvrez notre nouvelle collection printemps avec plus de 200 produits tendance.',
      category: 'Mode',
      thumbnailUrl: 'https://images.pexels.com/photos/1562477/pexels-photo-1562477.jpeg?auto=compress&cs=tinysrgb&w=400',
      pdfUrl: '/sample-catalog.pdf',
      visibility: 'public',
      uploadDate: new Date('2024-01-15'),
      lastModified: new Date('2024-01-20'),
      fileSize: 15728640, // 15MB
      pageCount: 48,
      views: 1247,
      downloads: 89,
      shares: 23,
      keywords: ['mode', 'printemps', 'tendance', 'collection'],
      author: 'Fashion Store'
    },
    {
      id: '2',
      title: 'Guide Technique 2024',
      description: 'Manuel technique complet pour nos équipements industriels.',
      category: 'Technique',
      thumbnailUrl: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=400',
      pdfUrl: '/technical-guide.pdf',
      visibility: 'password',
      password: 'tech2024',
      uploadDate: new Date('2024-01-10'),
      lastModified: new Date('2024-01-25'),
      fileSize: 32505856, // 31MB
      pageCount: 124,
      views: 456,
      downloads: 234,
      shares: 12,
      keywords: ['technique', 'manuel', 'équipement', 'industrie'],
      author: 'TechCorp'
    }
  ],
  currentCatalog: null,
  stats: {},
  loading: false,
  error: null,

  setCatalogs: (catalogs) => set({ catalogs }),
  
  addCatalog: (catalog) => set((state) => ({
    catalogs: [...state.catalogs, catalog]
  })),
  
  updateCatalog: (id, updates) => set((state) => ({
    catalogs: state.catalogs.map(catalog =>
      catalog.id === id ? { ...catalog, ...updates } : catalog
    )
  })),
  
  deleteCatalog: (id) => set((state) => ({
    catalogs: state.catalogs.filter(catalog => catalog.id !== id)
  })),
  
  setCurrentCatalog: (catalog) => set({ currentCatalog: catalog }),
  
  setStats: (catalogId, stats) => set((state) => ({
    stats: { ...state.stats, [catalogId]: stats }
  })),
  
  setLoading: (loading) => set({ loading }),
  
  setError: (error) => set({ error })
}));