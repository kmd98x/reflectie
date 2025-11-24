import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { t } from '../../i18n/translations';

const Naam = () => {
  const navigate = useNavigate();
  const { language } = useApp();
  const [name, setName] = useState('');

  const handleContinue = () => {
    if (name.trim()) {
      navigate('/privacy', { state: { userName: name.trim() } });
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col px-6 py-8 bg-white dark:bg-gray-900">
      {/* Back button */}
      <button
        onClick={handleBack}
        className="self-start mb-4 text-primary hover:opacity-70 transition-opacity"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Progress dots */}
      <div className="flex justify-center gap-2 mb-8">
        <div className="w-2 h-2 rounded-full bg-primary"></div>
        <div className="w-2 h-2 rounded-full bg-gray-300"></div>
        <div className="w-2 h-2 rounded-full bg-gray-300"></div>
      </div>

      <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
        <h1 className="text-2xl font-bold text-primary dark:text-white mb-6 text-center">
          {t('naamTitle', language)}
        </h1>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t('naamPlaceholder', language)}
          className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg text-base focus:outline-none focus:border-primary bg-white dark:bg-gray-800 text-text dark:text-white mb-2"
        />

        <p className="text-xs text-gray-500 dark:text-gray-400 mb-8">
          {t('naamHelper', language)}
        </p>
      </div>

      <button
        onClick={handleContinue}
        disabled={!name.trim()}
        className="w-full max-w-sm mx-auto bg-primary text-white font-semibold py-4 px-6 rounded-lg text-base disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
      >
        {t('verder', language)}
      </button>
    </div>
  );
};

export default Naam;

