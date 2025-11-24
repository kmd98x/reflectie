import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { t } from '../../i18n/translations';

const WaarStaJeNu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { language } = useApp();
  const [selected, setSelected] = useState('');

  const handleContinue = () => {
    if (selected) {
      navigate('/homepage', { state: { ...location.state, situation: selected } });
    }
  };

  const handleBack = () => {
    navigate('/privacy', { state: location.state });
  };

  return (
    <div className="min-h-screen flex flex-col px-6 py-8 bg-white">
      {/* Back button */}
      <button
        onClick={handleBack}
        className="self-start mb-4 text-primary hover:opacity-70 transition-opacity"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
        <h1 className="text-2xl font-bold text-primary mb-8 text-center">
          {t('waarStaJeNuTitle', language)}
        </h1>

        <p className="text-sm text-gray-500 mb-6 text-center">
          {t('waarStaJeNuHelper', language)}
        </p>

        <div className="space-y-4 mb-8">
          <button
            onClick={() => setSelected('starting')}
            className={`w-full p-4 border-2 rounded-lg text-left hover:bg-gray-50 transition-colors ${
              selected === 'starting' 
                ? 'border-primary bg-primary/5' 
                : 'border-gray-300'
            }`}
          >
            <span className="text-base text-text font-medium block mb-1">{t('waarStaJeNu1', language)}</span>
            <span className="text-sm text-gray-500">{t('waarStaJeNu1Desc', language)}</span>
          </button>

          <button
            onClick={() => setSelected('ongoing')}
            className={`w-full p-4 border-2 rounded-lg text-left hover:bg-gray-50 transition-colors ${
              selected === 'ongoing' 
                ? 'border-primary bg-primary/5' 
                : 'border-gray-300'
            }`}
          >
            <span className="text-base text-text font-medium block mb-1">{t('waarStaJeNu2', language)}</span>
            <span className="text-sm text-gray-500">{t('waarStaJeNu2Desc', language)}</span>
          </button>

          <button
            onClick={() => setSelected('stuck')}
            className={`w-full p-4 border-2 rounded-lg text-left hover:bg-gray-50 transition-colors ${
              selected === 'stuck' 
                ? 'border-primary bg-primary/5' 
                : 'border-gray-300'
            }`}
          >
            <span className="text-base text-text font-medium block mb-1">{t('waarStaJeNu3', language)}</span>
            <span className="text-sm text-gray-500">{t('waarStaJeNu3Desc', language)}</span>
          </button>
        </div>
      </div>

      <button
        onClick={handleContinue}
        disabled={!selected}
        className="w-full max-w-sm mx-auto bg-primary text-white font-semibold py-4 px-6 rounded-lg text-base disabled:bg-gray-300 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
      >
        {t('verder', language)}
      </button>
    </div>
  );
};

export default WaarStaJeNu;

