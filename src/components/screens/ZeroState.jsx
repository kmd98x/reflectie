import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DrowningPerson from '../DrowningPerson';
import { useApp } from '../../context/AppContext';
import { t } from '../../i18n/translations';

const ZeroState = () => {
  const navigate = useNavigate();
  const { language, setLanguage, darkMode } = useApp();
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-8 bg-white dark:bg-gray-900">
      {/* Language selector */}
      <div className="absolute top-6 right-6">
        <div className="flex gap-2">
          <button
            onClick={() => setLanguage('nl')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              language === 'nl'
                ? 'bg-primary text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-text dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            NL
          </button>
          <button
            onClick={() => setLanguage('en')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              language === 'en'
                ? 'bg-primary text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-text dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            EN
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center flex-1 w-full max-w-sm">
        <DrowningPerson size="large" animated={isHovering} />
        
        <div className="mt-8 text-center space-y-4">
          <p className="text-base text-text dark:text-gray-200 leading-relaxed">
            {t('zeroStateTitle', language)}
          </p>
          <p className="text-base font-bold text-primary dark:text-white leading-relaxed">
            {t('zeroStateSubtitle', language)}
          </p>
        </div>
      </div>

      <button
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onClick={() => {
          setIsHovering(true);
          setTimeout(() => navigate('/naam'), 500);
        }}
        className="w-full max-w-sm bg-primary text-white font-semibold py-4 px-6 rounded-lg text-base mt-8 hover:opacity-90 transition-opacity"
      >
        {t('zeroStateButton', language)}
      </button>
    </div>
  );
};

export default ZeroState;

