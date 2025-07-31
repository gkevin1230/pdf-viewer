import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  BookOpen, 
  Upload, 
  Share2, 
  Eye, 
  Search, 
  Smartphone,
  Globe,
  Shield,
  Zap,
  ArrowRight
} from 'lucide-react';

const HomePage: React.FC = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: BookOpen,
      title: 'Feuilletage Réaliste',
      description: 'Expérience de lecture immersive avec effet de tournement de page et ombrage naturel.'
    },
    {
      icon: Zap,
      title: 'Performance Optimisée',
      description: 'Chargement ultra-rapide même pour des catalogues de plusieurs centaines de pages.'
    },
    {
      icon: Search,
      title: 'Recherche Avancée',
      description: 'Recherche plein texte instantanée avec surlignage et navigation intelligente.'
    },
    {
      icon: Smartphone,
      title: 'Multi-Plateformes',
      description: 'Interface responsive parfaitement adaptée aux mobiles, tablettes et desktop.'
    },
    {
      icon: Share2,
      title: 'Partage Intelligent',
      description: 'Génération automatique de liens, codes QR et intégrations iFrame personnalisables.'
    },
    {
      icon: Shield,
      title: 'Sécurité Avancée',
      description: 'Protection par mot de passe, liens privés et contrôle d\'accès granulaire.'
    }
  ];

  const stats = [
    { value: '10M+', label: 'Pages vues' },
    { value: '50K+', label: 'Catalogues hébergés' },
    { value: '99.9%', label: 'Disponibilité' },
    { value: '<2s', label: 'Temps de chargement' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Catalog Vision
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed opacity-90">
              La plateforme de référence pour créer, partager et consulter des catalogues PDF 
              avec une expérience de feuilletage exceptionnelle
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/catalogs"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                Découvrir les catalogues
              </Link>
              <Link
                to="/admin"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-200 transform hover:scale-105"
              >
                Commencer maintenant
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 dark:text-gray-300 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Une expérience de lecture révolutionnaire
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Découvrez les fonctionnalités qui font de Catalog Vision la solution 
              de référence pour vos catalogues numériques
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index}
                  className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1"
                >
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg mb-4">
                    <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 dark:bg-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Prêt à transformer vos catalogues ?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Rejoignez des milliers d'entreprises qui font confiance à Catalog Vision 
            pour leurs besoins de publication numérique
          </p>
          <Link
            to="/admin"
            className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            Créer mon premier catalogue
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;