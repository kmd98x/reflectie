import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { shuffleArray, STATEMENTS } from '../../data/statements';
import NavigationBar from '../NavigationBar';
import { useApp } from '../../context/AppContext';
import { t } from '../../i18n/translations';

const Homepage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { language } = useApp();
  const userName = location.state?.userName || '';

  const handleStart = () => {
    navigate('/bevestig-start', { state: location.state });
  };

  return (
    <div className="min-h-screen flex flex-col px-6 py-8 bg-white dark:bg-gray-900 pb-24">
      <div className="flex-1 flex flex-col max-w-sm mx-auto w-full space-y-6">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-primary dark:text-white mb-2">
            {t('homepageHoi', language)} {userName}
          </h1>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-5 border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-bold text-primary dark:text-white mb-2">
            {t('homepageWatHetIs', language)}
          </h2>
          <p className="text-sm text-text dark:text-gray-200 leading-relaxed">
            {t('homepageWatHetIsText', language)}
          </p>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-5 border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-bold text-primary dark:text-white mb-2">
            {t('homepageWanneerGebruik', language)}
          </h2>
          <p className="text-sm text-text dark:text-gray-200 mb-3">
            {t('homepageWanneerGebruikText', language)}
          </p>
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <svg className="w-4 h-4 text-primary dark:text-accent mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm text-text dark:text-gray-200">{t('homepageWanneer1', language)}</span>
            </div>
            <div className="flex items-start gap-2">
              <svg className="w-4 h-4 text-primary dark:text-accent mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm text-text dark:text-gray-200">{t('homepageWanneer2', language)}</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-5 border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-bold text-primary dark:text-white mb-3">
            {t('homepageHoeWerkt', language)}
          </h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                1
              </div>
              <p className="text-sm text-text dark:text-gray-200 pt-1">{t('homepageHoeWerkt1', language)}</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                2
              </div>
              <p className="text-sm text-text dark:text-gray-200 pt-1">{t('homepageHoeWerkt2', language)}</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                3
              </div>
              <p className="text-sm text-text dark:text-gray-200 pt-1">{t('homepageHoeWerkt3', language)}</p>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={handleStart}
        className="w-full max-w-sm mx-auto bg-primary text-white font-semibold py-4 px-6 rounded-lg text-base hover:opacity-90 transition-opacity mt-8"
      >
        {t('homepageStartButton', language)}
      </button>

      <NavigationBar />
    </div>
  );
};

export default Homepage;

