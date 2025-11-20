import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import DrowningPerson from '../DrowningPerson';
import NavigationBar from '../NavigationBar';
import { detectDominantPattern } from '../../data/statements';

const KomtDitJeBekendVoor = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { responses } = location.state || {};
  const [loading, setLoading] = useState(false);

  const handleShowPattern = () => {
    setLoading(true);
    
    setTimeout(() => {
      const dominantPattern = detectDominantPattern(responses || []);
      navigate('/patroon', {
        state: {
          ...location.state,
          dominantPattern
        }
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col px-6 py-8 bg-white pb-24">
      <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
        <h1 className="text-2xl font-bold text-primary mb-6 text-center">
          Komt dit je bekend voor?
        </h1>

        <div className="flex justify-center mb-6">
          <DrowningPerson size="medium" />
        </div>

        <p className="text-base text-text text-center mb-8 leading-relaxed">
          We hebben jouw antwoorden bekeken. Laten we zien wat eruit komt...
        </p>
      </div>

      <button
        onClick={handleShowPattern}
        disabled={loading}
        className="w-full max-w-sm mx-auto bg-primary text-white font-semibold py-4 px-6 rounded-lg text-base disabled:bg-gray-300 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Laden...
          </span>
        ) : (
          'Toon mijn patroon'
        )}
      </button>

      <NavigationBar />
    </div>
  );
};

export default KomtDitJeBekendVoor;

