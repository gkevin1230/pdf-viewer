import React, { useState } from 'react';
import { X, FileText, Bookmark, List } from 'lucide-react';
import { Catalog } from '../../stores/catalogStore';

interface ViewerSidebarProps {
  isOpen: boolean;
  catalog: Catalog;
  currentPage: number;
  onPageSelect: (page: number) => void;
  onClose: () => void;
}

const ViewerSidebar: React.FC<ViewerSidebarProps> = ({
  isOpen,
  catalog,
  currentPage,
  onPageSelect,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'thumbnails' | 'bookmarks' | 'toc'>('thumbnails');

  // Mock data for demonstration
  const mockThumbnails = Array.from({ length: catalog.pageCount }, (_, i) => ({
    page: i + 1,
    thumbnail: `https://via.placeholder.com/120x170/f3f4f6/374151?text=Page+${i + 1}`
  }));

  const mockBookmarks = [
    { page: 1, title: 'Couverture' },
    { page: 3, title: 'Sommaire' },
    { page: 5, title: 'Collection Printemps' },
    { page: 15, title: 'Nouveautés' },
    { page: 25, title: 'Accessoires' },
    { page: 35, title: 'Soldes' },
    { page: 45, title: 'Contact' }
  ];

  const mockTOC = [
    { page: 1, title: 'Couverture', level: 0 },
    { page: 3, title: 'Sommaire', level: 0 },
    { page: 5, title: 'Collection Printemps', level: 0 },
    { page: 7, title: 'Robes', level: 1 },
    { page: 10, title: 'Hauts', level: 1 },
    { page: 13, title: 'Pantalons', level: 1 },
    { page: 15, title: 'Nouveautés', level: 0 },
    { page: 18, title: 'Tendances 2024', level: 1 },
    { page: 22, title: 'Éditions limitées', level: 1 },
    { page: 25, title: 'Accessoires', level: 0 },
    { page: 35, title: 'Soldes', level: 0 },
    { page: 45, title: 'Contact', level: 0 }
  ];

  if (!isOpen) return null;

  return (
    <div className="w-80 bg-gray-800 border-r border-gray-700 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-700 flex items-center justify-between">
        <h3 className="text-white font-medium">Navigation</h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-700">
        <button
          onClick={() => setActiveTab('thumbnails')}
          className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'thumbnails'
              ? 'bg-gray-700 text-white border-b-2 border-blue-500'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <div className="flex items-center justify-center space-x-1">
            <FileText className="h-4 w-4" />
            <span>Pages</span>
          </div>
        </button>
        <button
          onClick={() => setActiveTab('bookmarks')}
          className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'bookmarks'
              ? 'bg-gray-700 text-white border-b-2 border-blue-500'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <div className="flex items-center justify-center space-x-1">
            <Bookmark className="h-4 w-4" />
            <span>Signets</span>
          </div>
        </button>
        <button
          onClick={() => setActiveTab('toc')}
          className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'toc'
              ? 'bg-gray-700 text-white border-b-2 border-blue-500'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <div className="flex items-center justify-center space-x-1">
            <List className="h-4 w-4" />
            <span>Sommaire</span>
          </div>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'thumbnails' && (
          <div className="p-2 space-y-2">
            {mockThumbnails.map((item) => (
              <button
                key={item.page}
                onClick={() => onPageSelect(item.page)}
                className={`w-full p-2 rounded flex items-center space-x-3 transition-colors ${
                  currentPage === item.page
                    ? 'bg-blue-600 text-white'
                    : 'hover:bg-gray-700 text-gray-300'
                }`}
              >
                <img
                  src={item.thumbnail}
                  alt={`Page ${item.page}`}
                  className="w-12 h-16 object-cover rounded border border-gray-600"
                />
                <span className="text-sm font-medium">Page {item.page}</span>
              </button>
            ))}
          </div>
        )}

        {activeTab === 'bookmarks' && (
          <div className="p-2 space-y-1">
            {mockBookmarks.map((bookmark, index) => (
              <button
                key={index}
                onClick={() => onPageSelect(bookmark.page)}
                className={`w-full p-3 text-left rounded transition-colors ${
                  currentPage === bookmark.page
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                <div className="font-medium">{bookmark.title}</div>
                <div className="text-xs text-gray-400">Page {bookmark.page}</div>
              </button>
            ))}
          </div>
        )}

        {activeTab === 'toc' && (
          <div className="p-2 space-y-1">
            {mockTOC.map((item, index) => (
              <button
                key={index}
                onClick={() => onPageSelect(item.page)}
                className={`w-full p-2 text-left rounded transition-colors ${
                  currentPage === item.page
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
                style={{ paddingLeft: `${8 + item.level * 16}px` }}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">{item.title}</span>
                  <span className="text-xs text-gray-400">{item.page}</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewerSidebar;