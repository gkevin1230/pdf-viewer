import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Eye, 
  Download, 
  Share2, 
  Clock, 
  Users, 
  TrendingUp,
  Smartphone,
  Monitor,
  Tablet
} from 'lucide-react';
import { useCatalogStore } from '../../stores/catalogStore';

const CatalogStats: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const { catalogs } = useCatalogStore();
  
  const catalog = catalogs.find(c => c.id === id);

  if (!catalog) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Catalogue non trouvé
            </h1>
          </div>
        </div>
      </div>
    );
  }

  // Mock statistics data
  const stats = {
    totalViews: catalog.views,
    averageViewTime: 4.2, // minutes
    pagesRead: Math.floor(catalog.views * 0.7 * catalog.pageCount / 100),
    deviceTypes: {
      desktop: 45,
      mobile: 35,
      tablet: 20
    },
    referrers: {
      direct: 40,
      google: 30,
      social: 20,
      other: 10
    },
    dailyViews: [
      { date: '2024-01-20', views: 45 },
      { date: '2024-01-21', views: 52 },
      { date: '2024-01-22', views: 38 },
      { date: '2024-01-23', views: 61 },
      { date: '2024-01-24', views: 49 },
      { date: '2024-01-25', views: 73 },
      { date: '2024-01-26', views: 58 }
    ]
  };

  const deviceIcons = {
    desktop: Monitor,
    mobile: Smartphone,
    tablet: Tablet
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Statistiques - {catalog.title}
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Analyse des performances de votre catalogue
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <Eye className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Vues totales</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalViews.toLocaleString()}</p>
                <p className="text-xs text-green-600 dark:text-green-400">+12% cette semaine</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Temps moyen</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.averageViewTime}min</p>
                <p className="text-xs text-green-600 dark:text-green-400">+8% cette semaine</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <Download className="h-8 w-8 text-green-600 dark:text-green-400" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Téléchargements</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{catalog.downloads}</p>
                <p className="text-xs text-green-600 dark:text-green-400">+5% cette semaine</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <Share2 className="h-8 w-8 text-orange-600 dark:text-orange-400" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Partages</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{catalog.shares}</p>
                <p className="text-xs text-green-600 dark:text-green-400">+15% cette semaine</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Device Types */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Types d'appareils
            </h3>
            <div className="space-y-4">
              {Object.entries(stats.deviceTypes).map(([device, percentage]) => {
                const Icon = deviceIcons[device as keyof typeof deviceIcons];
                return (
                  <div key={device} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Icon className="h-5 w-5 text-gray-600 dark:text-gray-400 mr-3" />
                      <span className="text-gray-900 dark:text-white capitalize">{device}</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full mr-3">
                        <div 
                          className="h-2 bg-blue-600 dark:bg-blue-400 rounded-full"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {percentage}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Traffic Sources */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Sources de trafic
            </h3>
            <div className="space-y-4">
              {Object.entries(stats.referrers).map(([source, percentage]) => (
                <div key={source} className="flex items-center justify-between">
                  <span className="text-gray-900 dark:text-white capitalize">{source}</span>
                  <div className="flex items-center">
                    <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full mr-3">
                      <div 
                        className="h-2 bg-green-600 dark:bg-green-400 rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Daily Views Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Vues quotidiennes (7 derniers jours)
          </h3>
          <div className="h-64 flex items-end justify-between">
            {stats.dailyViews.map((day, index) => {
              const maxViews = Math.max(...stats.dailyViews.map(d => d.views));
              const height = (day.views / maxViews) * 200;
              return (
                <div key={index} className="flex flex-col items-center">
                  <div 
                    className="w-8 bg-blue-600 dark:bg-blue-400 rounded-t mb-2 transition-all duration-500"
                    style={{ height: `${height}px` }}
                  />
                  <span className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                    {day.views}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-500">
                    {new Date(day.date).getDate()}/{new Date(day.date).getMonth() + 1}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatalogStats;