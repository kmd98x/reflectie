import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationBar from '../NavigationBar';
import { useApp } from '../../context/AppContext';
import { t } from '../../i18n/translations';

const Settings = () => {
  const navigate = useNavigate();
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

  const [showLogoutConfirm, setShowLogoutConfirm] = React.useState(false);
  const [showLogoutWarning, setShowLogoutWarning] = React.useState(false);
  const [showDeleteWarning, setShowDeleteWarning] = React.useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = React.useState(false);
  const [showExportConfirm, setShowExportConfirm] = React.useState(false);
  const [showExportSuccess, setShowExportSuccess] = React.useState(false);

  const handleLogout = () => {
    setShowLogoutWarning(true);
  };

  const confirmLogoutWarning = () => {
    setShowLogoutWarning(false);
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    // Clear any stored data if needed
    localStorage.removeItem('app_notifications');
    localStorage.removeItem('app_emailUpdates');
    // Navigate to zero state
    navigate('/', { replace: true });
  };

  const handleDeleteAccount = () => {
    setShowDeleteWarning(true);
  };

  const confirmDeleteWarning = () => {
    setShowDeleteWarning(false);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    // Clear all data
    localStorage.clear();
    // Navigate to zero state
    navigate('/', { replace: true });
  };

  const handleExport = () => {
    setShowExportConfirm(true);
  };

  const confirmExport = () => {
    setShowExportConfirm(false);
    // Simulate export (in real app, this would download a file)
    setShowExportSuccess(true);
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
            <button 
              onClick={handleExport}
              className="w-full bg-primary text-white font-semibold py-2 px-4 rounded-lg text-sm hover:opacity-90 transition-opacity"
            >
              {language === 'en' ? 'Export' : 'Exporteren'}
            </button>
          </div>

          {/* Account Actions */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-primary dark:text-white mb-3">
              {language === 'en' ? 'Account' : 'Account'}
            </h3>
            <div className="space-y-2">
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-3 p-3 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
              >
                <svg className="w-5 h-5 text-primary dark:text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span className="flex-1 text-left text-sm font-medium text-text dark:text-white">
                  {language === 'en' ? 'Logout' : 'Uitloggen'}
                </span>
              </button>
              <button 
                onClick={handleDeleteAccount}
                className="w-full flex items-center gap-3 p-3 bg-white dark:bg-gray-700 border-2 border-red-300 dark:border-red-800 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              >
                <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                <span className="flex-1 text-left text-sm font-medium text-red-600 dark:text-red-400">
                  {language === 'en' ? 'Delete Account' : 'Account verwijderen'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Logout Warning Popup */}
      {showLogoutWarning && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-xl font-bold text-primary dark:text-white mb-4">
              {language === 'en' ? 'Logout?' : 'Uitloggen?'}
            </h3>
            <p className="text-sm text-text dark:text-gray-200 mb-6">
              {language === 'en'
                ? 'Are you sure you want to log out?'
                : 'Ben je zeker dat je wilt uitloggen?'}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutWarning(false)}
                className="flex-1 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 text-text dark:text-white font-semibold py-3 px-4 rounded-lg text-base hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
              >
                {t('annuleren', language)}
              </button>
              <button
                onClick={confirmLogoutWarning}
                className="flex-1 bg-primary text-white font-semibold py-3 px-4 rounded-lg text-base hover:opacity-90 transition-opacity"
              >
                {language === 'en' ? 'Logout' : 'Uitloggen'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Logout Confirmation Popup */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm w-full text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-primary dark:text-white mb-2">
              {language === 'en' ? 'Logged out' : 'Uitgelogd'}
            </h3>
            <p className="text-sm text-text dark:text-gray-200 mb-4">
              {language === 'en'
                ? 'You have been successfully logged out.'
                : 'Je bent succesvol uitgelogd.'}
            </p>
            <button
              onClick={confirmLogout}
              className="w-full bg-primary text-white font-semibold py-3 px-4 rounded-lg text-base hover:opacity-90 transition-opacity"
            >
              {t('ok', language)}
            </button>
          </div>
        </div>
      )}

      {/* Delete Account Warning Popup */}
      {showDeleteWarning && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-xl font-bold text-red-600 dark:text-red-400 mb-4">
              {language === 'en' ? 'Delete Account?' : 'Account verwijderen?'}
            </h3>
            <p className="text-sm text-text dark:text-gray-200 mb-6">
              {language === 'en'
                ? 'Are you sure you want to delete your account? This action cannot be undone.'
                : 'Ben je zeker dat je je account wilt verwijderen? Deze actie kan niet ongedaan worden gemaakt.'}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteWarning(false)}
                className="flex-1 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 text-text dark:text-white font-semibold py-3 px-4 rounded-lg text-base hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
              >
                {t('annuleren', language)}
              </button>
              <button
                onClick={confirmDeleteWarning}
                className="flex-1 bg-red-600 text-white font-semibold py-3 px-4 rounded-lg text-base hover:bg-red-700 transition-colors"
              >
                {language === 'en' ? 'Delete' : 'Verwijderen'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Account Confirmation Popup */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm w-full text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-primary dark:text-white mb-2">
              {language === 'en' ? 'Account Deleted' : 'Account verwijderd'}
            </h3>
            <p className="text-sm text-text dark:text-gray-200 mb-4">
              {language === 'en'
                ? 'Your account has been successfully deleted.'
                : 'Je account is succesvol verwijderd.'}
            </p>
            <button
              onClick={confirmDelete}
              className="w-full bg-primary text-white font-semibold py-3 px-4 rounded-lg text-base hover:opacity-90 transition-opacity"
            >
              {t('ok', language)}
            </button>
          </div>
        </div>
      )}

      {/* Export Confirmation Popup */}
      {showExportConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-xl font-bold text-primary dark:text-white mb-4">
              {language === 'en' ? 'Export Data?' : 'Gegevens exporteren?'}
            </h3>
            <p className="text-sm text-text dark:text-gray-200 mb-6">
              {language === 'en'
                ? 'Are you sure you want to export your data?'
                : 'Ben je zeker dat je je gegevens wilt exporteren?'}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowExportConfirm(false)}
                className="flex-1 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 text-text dark:text-white font-semibold py-3 px-4 rounded-lg text-base hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
              >
                {t('annuleren', language)}
              </button>
              <button
                onClick={confirmExport}
                className="flex-1 bg-primary text-white font-semibold py-3 px-4 rounded-lg text-base hover:opacity-90 transition-opacity"
              >
                {language === 'en' ? 'Export' : 'Exporteren'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Export Success Popup */}
      {showExportSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm w-full text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-primary dark:text-white mb-2">
              {language === 'en' ? 'Exported' : 'Geëxporteerd'}
            </h3>
            <p className="text-sm text-text dark:text-gray-200 mb-4">
              {language === 'en'
                ? 'Your data has been successfully exported.'
                : 'Je gegevens zijn succesvol geëxporteerd.'}
            </p>
            <button
              onClick={() => setShowExportSuccess(false)}
              className="w-full bg-primary text-white font-semibold py-3 px-4 rounded-lg text-base hover:opacity-90 transition-opacity"
            >
              {t('ok', language)}
            </button>
          </div>
        </div>
      )}

      <NavigationBar />
    </div>
  );
};

export default Settings;
