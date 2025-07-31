import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { Upload, X, FileText, Eye, EyeOff } from 'lucide-react';
import { useCatalogStore } from '../../stores/catalogStore';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

interface UploadForm {
  title: string;
  description: string;
  category: string;
  visibility: 'public' | 'private' | 'password';
  password?: string;
  keywords: string;
}

const CatalogUpload: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { addCatalog } = useCatalogStore();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const { register, handleSubmit, watch, formState: { errors } } = useForm<UploadForm>({
    defaultValues: {
      visibility: 'public',
      category: 'Mode'
    }
  });

  const visibility = watch('visibility');

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === 'application/pdf') {
        setSelectedFile(file);
      } else {
        alert('Veuillez sélectionner un fichier PDF');
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === 'application/pdf') {
        setSelectedFile(file);
      } else {
        alert('Veuillez sélectionner un fichier PDF');
      }
    }
  };

  const onSubmit = async (data: UploadForm) => {
    if (!selectedFile) {
      alert('Veuillez sélectionner un fichier PDF');
      return;
    }

    setUploading(true);

    try {
      // Create a more persistent URL for the uploaded file
      const fileUrl = URL.createObjectURL(selectedFile);
      
      // Store the file reference to prevent garbage collection
      (window as any).uploadedFiles = (window as any).uploadedFiles || new Map();
      const fileId = Date.now().toString();
      (window as any).uploadedFiles.set(fileId, selectedFile);
      
      // Simulate upload process
      await new Promise(resolve => setTimeout(resolve, 2000));

      const newCatalog = {
        id: Date.now().toString(),
        title: data.title,
        description: data.description,
        category: data.category,
        thumbnailUrl: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=400',
        pdfUrl: fileUrl,
        visibility: data.visibility,
        password: data.visibility === 'password' ? data.password : undefined,
        uploadDate: new Date(),
        lastModified: new Date(),
        fileSize: selectedFile.size,
        pageCount: 0, // Will be determined when PDF is loaded
        views: 0,
        downloads: 0,
        shares: 0,
        keywords: data.keywords.split(',').map(k => k.trim()).filter(k => k),
        author: 'Admin',
        fileId: fileId // Store file ID for reference
      };

      addCatalog(newCatalog);
      setUploading(false);
      navigate('/admin');
    } catch (error) {
      console.error('Error uploading catalog:', error);
      alert('Erreur lors du téléchargement du catalogue');
      setUploading(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {t('uploadCatalog')}
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Téléchargez un nouveau catalogue PDF et configurez ses paramètres
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* File Upload */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Fichier PDF
            </h2>
            
            {!selectedFile ? (
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive 
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                    : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Glissez-déposez votre fichier PDF ici
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  ou cliquez pour sélectionner
                </p>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium cursor-pointer transition-colors"
                >
                  Sélectionner un fichier
                </label>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Taille maximale : 200 MB
                </p>
              </div>
            ) : (
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center">
                  <FileText className="h-8 w-8 text-red-600 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{selectedFile.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{formatFileSize(selectedFile.size)}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedFile(null)}
                  className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>

          {/* Catalog Information */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Informations du catalogue
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('title')} *
                </label>
                <input
                  {...register('title', { required: 'Titre requis' })}
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Nom du catalogue"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.title.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('category')} *
                </label>
                <select
                  {...register('category', { required: 'Catégorie requise' })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  <option value="Mode">Mode</option>
                  <option value="Technique">Technique</option>
                  <option value="Maison">Maison</option>
                  <option value="Automobile">Automobile</option>
                  <option value="Autres">Autres</option>
                </select>
                {errors.category && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.category.message}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('description')}
                </label>
                <textarea
                  {...register('description')}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Description du catalogue"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Mots-clés
                </label>
                <input
                  {...register('keywords')}
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Séparez les mots-clés par des virgules"
                />
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Exemple : mode, printemps, collection, tendance
                </p>
              </div>
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Paramètres de confidentialité
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('visibility')}
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      {...register('visibility')}
                      type="radio"
                      value="public"
                      className="mr-2"
                    />
                    <span className="text-gray-900 dark:text-white">Public - Visible par tous</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      {...register('visibility')}
                      type="radio"
                      value="password"
                      className="mr-2"
                    />
                    <span className="text-gray-900 dark:text-white">Protégé par mot de passe</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      {...register('visibility')}
                      type="radio"
                      value="private"
                      className="mr-2"
                    />
                    <span className="text-gray-900 dark:text-white">Privé - Lien secret uniquement</span>
                  </label>
                </div>
              </div>

              {visibility === 'password' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Mot de passe
                  </label>
                  <div className="relative">
                    <input
                      {...register('password', {
                        required: visibility === 'password' ? 'Mot de passe requis' : false
                      })}
                      type={showPassword ? 'text' : 'password'}
                      className="w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="Mot de passe"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.password.message}</p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/admin')}
              className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={uploading || !selectedFile}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-md font-medium transition-colors flex items-center"
            >
              {uploading ? (
                <>
                  <LoadingSpinner size="sm" className="mr-2" />
                  Téléchargement...
                </>
              ) : (
                'Télécharger le catalogue'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CatalogUpload;