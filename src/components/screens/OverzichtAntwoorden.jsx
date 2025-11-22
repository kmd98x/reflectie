import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import NavigationBar from '../NavigationBar';
import { STATEMENTS, detectDominantPattern } from '../../data/statements';
import { useApp } from '../../context/AppContext';
import { t } from '../../i18n/translations';

const OverzichtAntwoorden = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { language } = useApp();
  const responses = location.state?.responses || [];
  const shuffledStatements = location.state?.shuffledStatements || [];

  const getStatementText = (statementId) => {
    const statement = STATEMENTS.find(s => s.id === statementId);
    return statement ? statement.text : 'Onbekende stelling';
  };

  const getAnswerLabel = (answer) => {
    const labels = {
      'ja': 'Ja',
      'soms': 'Soms',
      'nee': 'Nee',
      'helemaal_niet': 'Herken ik me totaal niet in'
    };
    return labels[answer] || answer;
  };

  const handleEditSingle = (responseIndex) => {
    // Find which statement index in shuffled array
    const response = responses[responseIndex];
    const shuffledIndex = shuffledStatements.findIndex(s => s.id === response.statementId);
    
    if (shuffledIndex !== -1) {
      navigate(`/statement/${shuffledIndex}`, {
        state: {
          ...location.state,
          responses,
          editingResponseIndex: responseIndex
        }
      });
    }
  };

  const handleEditAll = () => {
    if (shuffledStatements.length > 0) {
      navigate(`/statement/0`, { state: location.state });
    }
  };

  const handleConfirm = () => {
    const dominantPattern = detectDominantPattern(responses);
    navigate('/patroon', {
      state: {
        ...location.state,
        responses,
        dominantPattern
      }
    });
  };

  return (
    <div className="min-h-screen flex flex-col px-6 py-8 bg-white dark:bg-gray-900 pb-24">
      <div className="flex-1 flex flex-col max-w-sm mx-auto w-full">
        <h1 className="text-2xl font-bold text-primary dark:text-white mb-4 text-center">
          {t('overzichtTitle', language)}
        </h1>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-5 mb-6 border border-gray-200 dark:border-gray-700">
          <p className="text-sm text-text dark:text-gray-200 text-center leading-relaxed">
            {t('overzichtHelper', language)}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-6 max-h-96 overflow-y-auto">
          <div className="space-y-4">
            {responses.map((response, index) => (
              <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0">
                <div className="mb-2">
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">{t('overzichtStelling', language)}</p>
                  <p className="text-sm text-text dark:text-gray-200 mb-3">"{getStatementText(response.statementId)}"</p>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">{t('overzichtAntwoord', language)}</p>
                    <p className="text-sm font-medium text-primary dark:text-accent">"{getAnswerLabel(response.answer)}"</p>
                  </div>
                  <button
                    onClick={() => handleEditSingle(index)}
                    className="ml-4 text-primary dark:text-accent hover:opacity-70 transition-opacity flex items-center gap-1 text-sm font-medium"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    {t('bewerken', language)}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-3 max-w-sm mx-auto w-full">
        <button
          onClick={handleConfirm}
          className="w-full bg-primary text-white font-semibold py-4 px-6 rounded-lg text-base hover:opacity-90 transition-opacity"
        >
          {t('overzichtBevestig', language)}
        </button>
        <button
          onClick={handleEditAll}
          className="w-full bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 text-text dark:text-white font-semibold py-4 px-6 rounded-lg text-base hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          {t('overzichtWijzigen', language)}
        </button>
      </div>

      <NavigationBar />
    </div>
  );
};

export default OverzichtAntwoorden;
