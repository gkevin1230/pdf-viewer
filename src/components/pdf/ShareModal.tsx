import React, { useState } from 'react';
import { X, Copy, Facebook, Twitter, Mail, QrCode, Code } from 'lucide-react';
import { Catalog } from '../../stores/catalogStore';

interface ShareModalProps {
  catalog: Catalog;
  onClose: () => void;
}

const ShareModal: React.FC<ShareModalProps> = ({ catalog, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'link' | 'embed' | 'qr'>('link');

  const catalogUrl = `${window.location.origin}/catalog/${catalog.id}`;
  const embedCode = `<iframe src="${window.location.origin}/embed/${catalog.id}" width="800" height="600" frameborder="0"></iframe>`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(catalogUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleCopyEmbed = async () => {
    try {
      await navigator.clipboard.writeText(embedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleSocialShare = (platform: string) => {
    const text = `Découvrez le catalogue "${catalog.title}"`;
    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(catalogUrl)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(catalogUrl)}`,
      email: `mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(`${text}\n\n${catalogUrl}`)}`
    };
    
    window.open(urls[platform as keyof typeof urls], '_blank', 'width=600,height=400');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Partager le catalogue
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          {[
            { key: 'link', label: 'Lien', icon: Copy },
            { key: 'embed', label: 'Intégrer', icon: Code },
            { key: 'qr', label: 'QR Code', icon: QrCode }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === tab.key
                    ? 'bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400 border-b-2 border-blue-600'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'link' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Lien direct
                </label>
                <div className="flex">
                  <input
                    type="text"
                    value={catalogUrl}
                    readOnly
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                  />
                  <button
                    onClick={handleCopyLink}
                    className={`px-4 py-2 border border-l-0 border-gray-300 dark:border-gray-600 rounded-r-md transition-colors ${
                      copied 
                        ? 'bg-green-600 text-white' 
                        : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                    }`}
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
                {copied && (
                  <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                    Lien copié !
                  </p>
                )}
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Partager sur les réseaux sociaux
                </p>
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleSocialShare('facebook')}
                    className="flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                    title="Facebook"
                  >
                    <Facebook className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleSocialShare('twitter')}
                    className="flex items-center justify-center w-10 h-10 bg-sky-500 text-white rounded-full hover:bg-sky-600 transition-colors"
                    title="Twitter"
                  >
                    <Twitter className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleSocialShare('email')}
                    className="flex items-center justify-center w-10 h-10 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition-colors"
                    title="Email"
                  >
                    <Mail className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'embed' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Code d'intégration
                </label>
                <textarea
                  value={embedCode}
                  readOnly
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-sm font-mono"
                />
                <button
                  onClick={handleCopyEmbed}
                  className={`mt-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    copied
                      ? 'bg-green-600 text-white'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {copied ? 'Code copié !' : 'Copier le code'}
                </button>
              </div>

              <div className="text-sm text-gray-600 dark:text-gray-400">
                <p className="mb-2">Options de personnalisation :</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Modifiez width et height pour ajuster la taille</li>
                  <li>Ajoutez ?page=5 pour démarrer à une page spécifique</li>
                  <li>Ajoutez ?theme=dark pour le mode sombre</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'qr' && (
            <div className="text-center space-y-4">
              <div>
                <div className="inline-block p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  {/* QR Code placeholder - in production, use a QR code library */}
                  <div className="w-48 h-48 bg-white border-2 border-gray-300 flex items-center justify-center">
                    <QrCode className="h-16 w-16 text-gray-400" />
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Scannez ce code QR avec votre smartphone pour accéder directement au catalogue
              </p>
              <button
                onClick={() => {
                  // In production, generate and download QR code
                  alert('Fonctionnalité de téléchargement du QR code à implémenter');
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Télécharger le QR Code
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShareModal;