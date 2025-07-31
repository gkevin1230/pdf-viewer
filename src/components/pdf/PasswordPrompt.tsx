import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Lock, Eye, EyeOff } from 'lucide-react';

interface PasswordPromptProps {
  onSubmit: (password: string) => void;
}

interface PasswordForm {
  password: string;
}

const PasswordPrompt: React.FC<PasswordPromptProps> = ({ onSubmit }) => {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<PasswordForm>();

  const handlePasswordSubmit = (data: PasswordForm) => {
    onSubmit(data.password);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 w-full max-w-md mx-4">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
              <Lock className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Catalogue protégé
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Ce catalogue est protégé par un mot de passe. Veuillez saisir le mot de passe pour y accéder.
          </p>
        </div>

        <form onSubmit={handleSubmit(handlePasswordSubmit)} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Mot de passe
            </label>
            <div className="relative">
              <input
                {...register('password', { required: 'Mot de passe requis' })}
                type={showPassword ? 'text' : 'password'}
                className="w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="Entrez le mot de passe"
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

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium transition-colors"
          >
            Accéder au catalogue
          </button>
        </form>

        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            <strong>Astuce :</strong> Pour ce catalogue de démonstration, le mot de passe est : <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">tech2024</code>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PasswordPrompt;