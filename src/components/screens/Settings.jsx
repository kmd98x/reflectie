import React from 'react';
import NavigationBar from '../NavigationBar';
import { useApp } from '../../context/AppContext';
import { t } from '../../i18n/translations';

const Settings = () => {
  const { language, setLanguage, darkMode, setDarkMode } = useApp();
  const [notifications, setNotifications] = React.useState(() => {
    return localStorage.getItem('app_notifications') !== 'false';
  });
  const [emailUpdates, setEmailUpdates] = React.useState(() => {
    return localStorage.getItem('app_emailUpdates') === 'true';
  });

  React.useEffect(() => {
    localStorage.setItem('app_notifications', notifications.toString());
  }, [notifications]);

  React.useEffect(() => {
    localStorage.setItem('app_emailUpdates', emailUpdates.toString());
  }, [emailUpdates]);

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  const ToggleSwitch = ({ enabled, onChange, label, description }) => (
    <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700 last:border-0">
      <div className="flex-1">
        <h3 className="font-semibold text-primary dark:text-white mb-1">{label}</h3>
        {description && (
          <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>
        )}
      </div>
      <button
        onClick={onChange}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ml-4 ${
          enabled ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            enabled ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col px-6 py-8 bg-white dark:bg-gray-900 pb-24">
      <div className="flex-1 flex flex-col max-w-sm mx-auto w-full">
        <h1 className="text-2xl font-bold text-primary dark:text-white mb-6">
          {t('settingsTitle', language)}
        </h1>

        <div className="space-y-4">
          {/* Language Settings */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-primary dark:text-white mb-3">{t('settingsTaal', language)}</h3>
            <div className="flex gap-3">
              <button
                onClick={() => handleLanguageChange('nl')}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-semibold transition-colors ${
                  language === 'nl'
                    ? 'bg-primary text-white'
                    : 'bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 text-text dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600'
                }`}
              >
                {t('settingsNederlands', language)}
              </button>
              <button
                onClick={() => handleLanguageChange('en')}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-semibold transition-colors ${
                  language === 'en'
                    ? 'bg-primary text-white'
                    : 'bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 text-text dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600'
                }`}
              >
                {t('settingsEnglish', language)}
              </button>
            </div>
          </div>

          {/* Toggles */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <ToggleSwitch
              enabled={darkMode}
              onChange={handleDarkModeToggle}
              label={t('settingsDarkMode', language)}
              description={t('settingsDarkModeDesc', language)}
            />
            <ToggleSwitch
              enabled={notifications}
              onChange={() => setNotifications(!notifications)}
              label={t('settingsNotificaties', language)}
              description={t('settingsNotificatiesDesc', language)}
            />
            <ToggleSwitch
              enabled={emailUpdates}
              onChange={() => setEmailUpdates(!emailUpdates)}
              label={t('settingsEmailUpdates', language)}
              description={t('settingsEmailUpdatesDesc', language)}
            />
          </div>

          {/* Privacy */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-primary dark:text-white mb-2">{t('settingsPrivacy', language)}</h3>
            <p className="text-sm text-text dark:text-gray-200 mb-3">
              {t('settingsPrivacyText', language)}
            </p>
            <button className="text-sm text-primary hover:underline dark:text-accent">
              {t('settingsPrivacyLink', language)}
            </button>
          </div>

          {/* About */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-primary dark:text-white mb-2">{t('settingsAbout', language)}</h3>
            <p className="text-sm text-text dark:text-gray-200 mb-2">
              {t('settingsAboutText', language)}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {t('settingsVersion', language)}
            </p>
          </div>

          {/* Export Data */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-primary dark:text-white mb-2">
              {language === 'en' ? 'Export Data' : 'Gegevens exporteren'}
            </h3>
            <p className="text-sm text-text dark:text-gray-200 mb-3">
              {language === 'en' 
                ? 'Download your profile data and answers as a file.' 
                : 'Download je profielgegevens en antwoorden als bestand.'}
            </p>
            <button className="w-full bg-primary text-white font-semibold py-2 px-4 rounded-lg text-sm hover:opacity-90 transition-opacity">
              {language === 'en' ? 'Export' : 'Exporteren'}
            </button>
          </div>

          {/* Delete Account */}
          <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border border-red-200 dark:border-red-800">
            <h3 className="font-semibold text-red-600 dark:text-red-400 mb-2">
              {language === 'en' ? 'Delete Account' : 'Account verwijderen'}
            </h3>
            <p className="text-sm text-red-700 dark:text-red-300 mb-3">
              {language === 'en'
                ? 'Permanently delete your account and all data. This action cannot be undone.'
                : 'Permanent je account en alle gegevens verwijderen. Deze actie kan niet ongedaan worden gemaakt.'}
            </p>
            <button className="w-full bg-red-600 text-white font-semibold py-2 px-4 rounded-lg text-sm hover:bg-red-700 transition-colors">
              {language === 'en' ? 'Delete Account' : 'Account verwijderen'}
            </button>
          </div>
        </div>
      </div>

      <NavigationBar />
    </div>
  );
};

export default Settings;
