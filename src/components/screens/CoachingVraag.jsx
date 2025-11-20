import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import NavigationBar from '../NavigationBar';
import { COACHING_QUESTIONS, PATTERN_DESCRIPTIONS } from '../../data/statements';

const CoachingVraag = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { dominantPattern } = location.state || {};

  if (!dominantPattern) {
    return null;
  }

  const coachingQuestion = COACHING_QUESTIONS[dominantPattern];
  const patternName = PATTERN_DESCRIPTIONS[dominantPattern].name;

  const handleMail = () => {
    const subject = encodeURIComponent('Mijn coachingsvraag - Omnient Reflect');
    const body = encodeURIComponent(`Mijn patroon: ${patternName}\n\nMijn coachingsvraag:\n${coachingQuestion}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const handleFinish = () => {
    navigate('/afspraak-jacqueline', { state: location.state });
  };

  return (
    <div className="min-h-screen flex flex-col px-6 py-8 bg-white pb-24">
      <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto mb-4 bg-accent/20 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-primary mb-6">
            Jouw persoonlijke coaching vraag
          </h1>
        </div>

        <div className="bg-white border-2 border-gray-200 rounded-lg p-6 mb-6 shadow-sm">
          <p className="text-base text-text text-center leading-relaxed">
            {coachingQuestion}
          </p>
        </div>

        <p className="text-sm text-gray-500 text-center mb-8">
          Neem deze vraag mee naar je coaching met Jacqueline
        </p>
      </div>

      <div className="space-y-3 max-w-sm mx-auto w-full">
        <button
          onClick={handleMail}
          className="w-full bg-primary text-white font-semibold py-4 px-6 rounded-lg text-base hover:opacity-90 transition-opacity"
        >
          Mail naar mij
        </button>
        <button
          onClick={handleFinish}
          className="w-full bg-white border-2 border-primary text-primary font-semibold py-4 px-6 rounded-lg text-base hover:bg-gray-50 transition-colors"
        >
          Afronden
        </button>
      </div>

      <NavigationBar />
    </div>
  );
};

export default CoachingVraag;

