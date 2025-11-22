import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { shuffleArray, STATEMENTS } from '../../data/statements';
import NavigationBar from '../NavigationBar';
import DrowningPerson from '../DrowningPerson';

const BevestigStart = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleStart = () => {
    const shuffledStatements = shuffleArray(STATEMENTS);
    navigate('/statement/0', { 
      state: {
        ...location.state,
        shuffledStatements
      }
    });
  };

  const handleBack = () => {
    navigate('/homepage', { state: location.state });
  };

  return (
    <div className="min-h-screen flex flex-col px-6 py-8 bg-white pb-24">
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
        <div className="flex justify-center mb-6">
          <DrowningPerson size="medium" />
        </div>

        <h1 className="text-2xl font-bold text-primary mb-4 text-center">
          Klaar om te beginnen?
        </h1>

        <div className="bg-white border-2 border-gray-200 rounded-lg p-6 mb-6">
          <p className="text-base text-text leading-relaxed mb-4">
            Je gaat nu 20 stellingen beantwoorden. Dit duurt ongeveer 10 minuten.
          </p>
          <p className="text-base text-text leading-relaxed">
            Geef bij elke stelling aan in hoeverre deze bij jou past: <strong>Nee</strong>, <strong>Soms</strong>, <strong>Ja</strong>, of <strong>Herken ik me totaal niet in</strong>.
          </p>
        </div>

        <p className="text-sm text-gray-500 text-center mb-8">
          Je antwoorden zijn persoonlijk en worden nergens gedeeld.
        </p>
      </div>

      <div className="space-y-3 max-w-sm mx-auto w-full">
        <button
          onClick={handleStart}
          className="w-full bg-primary text-white font-semibold py-4 px-6 rounded-lg text-base hover:opacity-90 transition-opacity"
        >
          Ik ben er klaar voor
        </button>
        <button
          onClick={handleBack}
          className="w-full bg-white border-2 border-gray-300 text-text font-semibold py-4 px-6 rounded-lg text-base hover:bg-gray-50 transition-colors"
        >
          Terug
        </button>
      </div>

      <NavigationBar />
    </div>
  );
};

export default BevestigStart;

