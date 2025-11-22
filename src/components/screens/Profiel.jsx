import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavigationBar from '../NavigationBar';
import { PATTERN_DESCRIPTIONS, STATEMENTS } from '../../data/statements';
import { useApp } from '../../context/AppContext';
import { t } from '../../i18n/translations';

const Profiel = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { language } = useApp();
  
  const [userName, setUserName] = useState(location.state?.userName || '');
  const [birthDate, setBirthDate] = useState(location.state?.birthDate || '');
  const [email, setEmail] = useState(location.state?.email || '');
  const [phone, setPhone] = useState(location.state?.phone || '');
  const [bio, setBio] = useState(location.state?.bio || '');
  
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingBirthDate, setIsEditingBirthDate] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [isEditingBio, setIsEditingBio] = useState(false);
  
  const dominantPattern = location.state?.dominantPattern;
  const responses = location.state?.responses || [];
  const shuffledStatements = location.state?.shuffledStatements || [];

  const getStatementText = (statementId) => {
    const statement = STATEMENTS.find(s => s.id === statementId);
    return statement ? statement.text : 'Onbekende stelling';
  };

  const getAnswerLabel = (answer) => {
    const labels = {
      'ja': language === 'en' ? 'Yes' : 'Ja',
      'soms': language === 'en' ? 'Sometimes' : 'Soms',
      'nee': language === 'en' ? 'No' : 'Nee',
      'helemaal_niet': language === 'en' ? "Don't recognize at all" : 'Herken ik me totaal niet in'
    };
    return labels[answer] || answer;
  };

  const handleSave = (field, value) => {
    navigate('/profiel', {
      state: {
        ...location.state,
        [field]: value
      },
      replace: true
    });
  };

  const formatBirthDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString(language === 'en' ? 'en-US' : 'nl-NL', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const handleEditAnswers = () => {
    if (shuffledStatements.length > 0) {
      navigate(`/statement/0`, { state: location.state });
    }
  };

  const EditableField = ({ label, value, isEditing, onEdit, onSave, onCancel, children, type = 'text', placeholder = '' }) => (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-semibold text-primary dark:text-white">{label}</h2>
        {!isEditing && (
          <button
            onClick={onEdit}
            className="text-sm text-primary hover:underline dark:text-accent"
          >
            {value ? t('bewerken', language) : t('profielToevoegen', language)}
          </button>
        )}
      </div>
      {isEditing ? (
        <div className="space-y-2">
          {children}
          <div className="flex gap-2">
            <button
              onClick={onSave}
              className="flex-1 bg-primary text-white font-semibold py-2 px-4 rounded-lg text-sm hover:opacity-90 transition-opacity"
            >
              {t('opslaan', language)}
            </button>
            <button
              onClick={onCancel}
              className="flex-1 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 text-text dark:text-white font-semibold py-2 px-4 rounded-lg text-sm hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
            >
              {t('annuleren', language)}
            </button>
          </div>
        </div>
      ) : (
        <p className="text-text dark:text-gray-200">{value || t('profielNietIngevuld', language)}</p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col px-6 py-8 bg-white dark:bg-gray-900 pb-24">
      <div className="flex-1 flex flex-col max-w-sm mx-auto w-full">
        <h1 className="text-2xl font-bold text-primary dark:text-white mb-6">
          {t('profielTitle', language)}
        </h1>

        <div className="space-y-4 mb-6">
          {/* Name */}
          <EditableField
            label={t('profielNaam', language)}
            value={userName}
            isEditing={isEditingName}
            onEdit={() => setIsEditingName(true)}
            onSave={() => {
              handleSave('userName', userName);
              setIsEditingName(false);
            }}
            onCancel={() => {
              setUserName(location.state?.userName || '');
              setIsEditingName(false);
            }}
          >
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder={t('naamPlaceholder', language)}
              className="w-full px-3 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg text-base focus:outline-none focus:border-primary dark:bg-gray-700 dark:text-white"
            />
          </EditableField>

          {/* Birth Date */}
          <EditableField
            label={t('profielGeboortedatum', language)}
            value={birthDate}
            isEditing={isEditingBirthDate}
            onEdit={() => setIsEditingBirthDate(true)}
            onSave={() => {
              handleSave('birthDate', birthDate);
              setIsEditingBirthDate(false);
            }}
            onCancel={() => {
              setBirthDate(location.state?.birthDate || '');
              setIsEditingBirthDate(false);
            }}
          >
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              max={new Date().toISOString().split('T')[0]}
              className="w-full px-3 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg text-base focus:outline-none focus:border-primary dark:bg-gray-700 dark:text-white"
            />
          </EditableField>

          {/* Email */}
          <EditableField
            label={t('profielEmail', language)}
            value={email}
            isEditing={isEditingEmail}
            onEdit={() => setIsEditingEmail(true)}
            onSave={() => {
              handleSave('email', email);
              setIsEditingEmail(false);
            }}
            onCancel={() => {
              setEmail(location.state?.email || '');
              setIsEditingEmail(false);
            }}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={language === 'en' ? 'your@email.com' : 'jouw@email.nl'}
              className="w-full px-3 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg text-base focus:outline-none focus:border-primary dark:bg-gray-700 dark:text-white"
            />
          </EditableField>

          {/* Phone */}
          <EditableField
            label={t('profielTelefoon', language)}
            value={phone}
            isEditing={isEditingPhone}
            onEdit={() => setIsEditingPhone(true)}
            onSave={() => {
              handleSave('phone', phone);
              setIsEditingPhone(false);
            }}
            onCancel={() => {
              setPhone(location.state?.phone || '');
              setIsEditingPhone(false);
            }}
          >
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={language === 'en' ? '+31 6 12345678' : '06 12345678'}
              className="w-full px-3 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg text-base focus:outline-none focus:border-primary dark:bg-gray-700 dark:text-white"
            />
          </EditableField>

          {/* Bio */}
          <EditableField
            label={t('profielBio', language)}
            value={bio}
            isEditing={isEditingBio}
            onEdit={() => setIsEditingBio(true)}
            onSave={() => {
              handleSave('bio', bio);
              setIsEditingBio(false);
            }}
            onCancel={() => {
              setBio(location.state?.bio || '');
              setIsEditingBio(false);
            }}
          >
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder={t('profielBioPlaceholder', language)}
              rows={4}
              className="w-full px-3 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg text-base focus:outline-none focus:border-primary dark:bg-gray-700 dark:text-white resize-none"
            />
          </EditableField>

          {/* Pattern */}
          {dominantPattern && (
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <h2 className="font-semibold text-primary dark:text-white mb-2">{t('profielPatroon', language)}</h2>
              <p className="text-text dark:text-gray-200 font-medium">
                {PATTERN_DESCRIPTIONS[dominantPattern].name} / {PATTERN_DESCRIPTIONS[dominantPattern].nameNL}
              </p>
            </div>
          )}

          {/* Responses */}
          {responses.length > 0 && (
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-semibold text-primary dark:text-white">{t('profielAntwoorden', language)}</h2>
                {shuffledStatements.length > 0 && (
                  <button
                    onClick={handleEditAnswers}
                    className="text-sm text-primary hover:underline dark:text-accent"
                  >
                    {t('bewerken', language)}
                  </button>
                )}
              </div>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {responses.slice(0, 5).map((response, index) => (
                  <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-2 last:border-0">
                    <p className="text-xs text-text dark:text-gray-300 mb-1">{getStatementText(response.statementId)}</p>
                    <p className="text-xs font-medium text-primary dark:text-accent">{getAnswerLabel(response.answer)}</p>
                  </div>
                ))}
                {responses.length > 5 && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                    {language === 'en' ? `+ ${responses.length - 5} more` : `+ ${responses.length - 5} meer`}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <NavigationBar />
    </div>
  );
};

export default Profiel;
