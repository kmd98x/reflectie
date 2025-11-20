import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import NavigationBar from '../NavigationBar';
import { COACHING_QUESTIONS, PATTERN_DESCRIPTIONS } from '../../data/statements';

const GoedGedaan = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { dominantPattern, appointmentDate, appointmentTime } = location.state || {};

  if (!dominantPattern) {
    return null;
  }

  const patternName = PATTERN_DESCRIPTIONS[dominantPattern].name;
  const coachingQuestion = COACHING_QUESTIONS[dominantPattern];

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Niet geboekt';
    const date = new Date(dateStr);
    return date.toLocaleDateString('nl-NL', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleClose = () => {
    navigate('/homepage', { state: location.state });
  };

  return (
    <div className="min-h-screen flex flex-col px-6 py-8 bg-white pb-24">
      <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
        <div className="text-center mb-6">
          <div className="w-20 h-20 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-primary mb-6">
            Goed gedaan!
          </h1>
        </div>

        <div className="bg-white border-2 border-gray-200 rounded-lg p-6 mb-6 shadow-sm">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-primary mb-1">Jouw patroon:</h3>
              <p className="text-sm text-text">{patternName}</p>
            </div>

            <div>
              <h3 className="font-semibold text-primary mb-1">Coachingsvraag:</h3>
              <p className="text-sm text-text">{coachingQuestion}</p>
            </div>

            <div>
              <h3 className="font-semibold text-primary mb-1">Afspraak:</h3>
              <p className="text-sm text-text">
                {appointmentDate && appointmentTime
                  ? `${formatDate(appointmentDate)} om ${appointmentTime}`
                  : 'Niet geboekt'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={handleClose}
        className="w-full max-w-sm mx-auto bg-primary text-white font-semibold py-4 px-6 rounded-lg text-base hover:opacity-90 transition-opacity"
      >
        Sluiten
      </button>

      <NavigationBar />
    </div>
  );
};

export default GoedGedaan;

