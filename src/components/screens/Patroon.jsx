import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import DrowningPerson from '../DrowningPerson';
import NavigationBar from '../NavigationBar';
import { PATTERN_DESCRIPTIONS } from '../../data/statements';

const Patroon = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { dominantPattern } = location.state || {};

  if (!dominantPattern) {
    return null;
  }

  const patternData = PATTERN_DESCRIPTIONS[dominantPattern];

  const handleContinue = () => {
    navigate('/coaching-vraag', { state: location.state });
  };

  return (
    <div className="min-h-screen flex flex-col px-6 py-8 bg-white pb-24">
      {/* Progress dots */}
      <div className="flex justify-center gap-2 mb-6">
        <div className="w-2 h-2 rounded-full bg-primary"></div>
        <div className="w-2 h-2 rounded-full bg-primary"></div>
        <div className="w-2 h-2 rounded-full bg-primary"></div>
      </div>

      <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
        <h1 className="text-2xl font-bold text-primary mb-6 text-center">
          {patternData.name}
        </h1>

        <div className="flex justify-center mb-6">
          <DrowningPerson
            size="medium"
            labelAbove={patternData.name}
            labelBelow={patternData.dont}
          />
        </div>

        <div className="bg-white border-2 border-gray-200 rounded-lg p-6 mb-6">
          <h2 className="font-semibold text-primary mb-4">Dit ben jij:</h2>
          <ul className="space-y-2 mb-6">
            {patternData.characteristics.map((char, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span className="text-sm text-text">{char}</span>
              </li>
            ))}
          </ul>

          <h2 className="font-semibold text-primary mb-4">Dit herken je vooral bij:</h2>
          <ul className="space-y-2">
            {patternData.triggers.map((trigger, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-primary mt-1">→</span>
                <span className="text-sm text-text">{trigger}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <button
        onClick={handleContinue}
        className="w-full max-w-sm mx-auto bg-primary text-white font-semibold py-4 px-6 rounded-lg text-base hover:opacity-90 transition-opacity"
      >
        Verder
      </button>

      <NavigationBar />
    </div>
  );
};

export default Patroon;

