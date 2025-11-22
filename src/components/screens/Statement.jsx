import React, { useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import DrowningPerson from '../DrowningPerson';
import NavigationBar from '../NavigationBar';
import { shuffleArray, STATEMENTS } from '../../data/statements';
import { useApp } from '../../context/AppContext';
import { t } from '../../i18n/translations';

const Statement = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { index } = useParams();
  const { language } = useApp();
  const currentIndex = parseInt(index) || 0;
  // Get shuffled statements from state, or create new shuffled array
  const shuffledStatements = React.useMemo(() => {
    if (location.state?.shuffledStatements) {
      return location.state.shuffledStatements;
    }
    return shuffleArray(STATEMENTS);
  }, [location.state]);
  
  const responses = location.state?.responses || [];
  
  // Reset slider when statement changes or set to existing answer if editing
  const editingIndex = location.state?.editingResponseIndex;
  const existingResponse = editingIndex !== undefined ? responses[editingIndex] : null;
  
  const getInitialSliderValue = () => {
    if (existingResponse && existingResponse.answer) {
      if (existingResponse.answer === 'nee') return 0;
      if (existingResponse.answer === 'soms') return 50;
      if (existingResponse.answer === 'ja') return 100;
    }
    return 50; // Default to middle (soms)
  };
  
  const [sliderValue, setSliderValue] = useState(getInitialSliderValue());
  
  React.useEffect(() => {
    setSliderValue(getInitialSliderValue());
  }, [currentIndex, editingIndex]);
  
  if (!shuffledStatements || shuffledStatements.length === 0) {
    return null;
  }

  const statement = shuffledStatements[currentIndex];
  const totalStatements = shuffledStatements.length;
  const progress = currentIndex + 1;

  // Get slider value and convert to answer
  const getAnswerFromSlider = (value) => {
    if (value < 33) return 'nee';
    if (value < 67) return 'soms';
    return 'ja';
  };

  const handleSliderChange = (e) => {
    setSliderValue(parseInt(e.target.value));
  };

  const handleBack = () => {
    const editingIndex = location.state?.editingResponseIndex;
    
    if (editingIndex !== undefined) {
      // Go back to overview if editing
      navigate('/overzicht-antwoorden', { state: location.state });
    } else if (currentIndex > 0) {
      // Go back to previous statement
      navigate(`/statement/${currentIndex - 1}`, {
        state: {
          ...location.state,
          shuffledStatements,
          // Remove last response when going back
          responses: responses.slice(0, -1)
        }
      });
    } else {
      // Go back to bevestig-start or homepage
      navigate('/bevestig-start', { state: location.state });
    }
  };

  const handleContinue = () => {
    const answer = getAnswerFromSlider(sliderValue);
    handleAnswer(answer);
  };

  const handleAnswer = (answer) => {
    const editingIndex = location.state?.editingResponseIndex;
    
    let newResponses;
    if (editingIndex !== undefined) {
      // Update existing response
      newResponses = [...responses];
      newResponses[editingIndex] = {
        statementId: statement.id,
        pattern: statement.pattern,
        answer: answer
      };
      // Go back to overview after editing
      setTimeout(() => {
        navigate('/overzicht-antwoorden', {
          state: {
            ...location.state,
            shuffledStatements,
            responses: newResponses,
            editingResponseIndex: undefined
          }
        });
      }, 200);
    } else {
      // Add new response
      newResponses = [
        ...(responses || []),
        {
          statementId: statement.id,
          pattern: statement.pattern,
          answer: answer
        }
      ];

      // Small delay for smooth transition
      setTimeout(() => {
        if (currentIndex < totalStatements - 1) {
          navigate(`/statement/${currentIndex + 1}`, {
            state: {
              ...location.state,
              shuffledStatements,
              responses: newResponses
            }
          });
        } else {
          navigate('/overzicht-antwoorden', {
            state: {
              ...location.state,
              shuffledStatements,
              responses: newResponses
            }
          });
        }
      }, 200);
    }
  };

  return (
    <div className="min-h-screen flex flex-col px-6 py-8 bg-white dark:bg-gray-900 pb-24">
      {/* Back button */}
      <button
        onClick={handleBack}
        className="self-start mb-4 text-primary dark:text-white hover:opacity-70 transition-opacity"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Progress dots */}
      <div className="flex flex-col items-center mb-6">
        <div className="text-xs text-gray-500 dark:text-gray-400 mb-3">
          {progress} / {totalStatements}
        </div>
        <div className="flex justify-center gap-1 flex-wrap max-w-xs">
          {Array.from({ length: totalStatements }).map((_, i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                i < progress ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'
              }`}
            ></div>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
        <div className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-6 shadow-sm">
          <p className="text-lg text-text dark:text-gray-200 text-center leading-relaxed">
            {statement.text}
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <DrowningPerson size="small" />
        </div>
      </div>

      <div className="space-y-4 max-w-sm mx-auto w-full">
        {/* Slider */}
        <div className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <div className="flex justify-between mb-4">
            <span className="text-sm font-medium text-text dark:text-gray-200">{t('statementNee', language)}</span>
            <span className="text-sm font-medium text-text dark:text-gray-200">{t('statementSoms', language)}</span>
            <span className="text-sm font-medium text-text dark:text-gray-200">{t('statementJa', language)}</span>
          </div>
          <div className="relative">
            <input
              type="range"
              min="0"
              max="100"
              value={sliderValue}
              onChange={handleSliderChange}
              step="1"
              className="w-full h-3 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer range-slider"
              style={{
                background: `linear-gradient(to right, #2C3E50 0%, #2C3E50 ${sliderValue}%, #e5e7eb ${sliderValue}%, #e5e7eb 100%)`
              }}
            />
          </div>
          <div className="flex justify-center mt-4">
            <span className="text-base font-semibold text-primary dark:text-accent">
              {getAnswerFromSlider(sliderValue) === 'nee' ? t('statementNee', language) : 
               getAnswerFromSlider(sliderValue) === 'soms' ? t('statementSoms', language) : t('statementJa', language)}
            </span>
          </div>
        </div>

        <button
          onClick={handleContinue}
          className="w-full bg-primary text-white font-semibold py-4 px-6 rounded-lg text-base hover:opacity-90 transition-opacity"
        >
          {t('verder', language)}
        </button>
      </div>

      <NavigationBar />
    </div>
  );
};

export default Statement;

