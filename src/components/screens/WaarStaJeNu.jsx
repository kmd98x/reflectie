import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const WaarStaJeNu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selected, setSelected] = useState('');

  const handleContinue = () => {
    if (selected) {
      navigate('/homepage', { state: { ...location.state, situation: selected } });
    }
  };

  const handleBack = () => {
    navigate('/privacy', { state: location.state });
  };

  return (
    <div className="min-h-screen flex flex-col px-6 py-8 bg-white">
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
        <h1 className="text-2xl font-bold text-primary mb-8 text-center">
          Waar sta je nu?
        </h1>

        <div className="space-y-4 mb-8">
          <label className="flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
            <input
              type="radio"
              name="situation"
              value="starting"
              checked={selected === 'starting'}
              onChange={(e) => setSelected(e.target.value)}
              className="w-5 h-5 text-primary border-gray-300 focus:ring-primary"
            />
            <span className="text-base text-text">Net begonnen als leider (0-6 maanden)</span>
          </label>

          <label className="flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
            <input
              type="radio"
              name="situation"
              value="ongoing"
              checked={selected === 'ongoing'}
              onChange={(e) => setSelected(e.target.value)}
              className="w-5 h-5 text-primary border-gray-300 focus:ring-primary"
            />
            <span className="text-base text-text">Al enige tijd bezig (6-12 maanden)</span>
          </label>

          <label className="flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
            <input
              type="radio"
              name="situation"
              value="stuck"
              checked={selected === 'stuck'}
              onChange={(e) => setSelected(e.target.value)}
              className="w-5 h-5 text-primary border-gray-300 focus:ring-primary"
            />
            <span className="text-base text-text">Zit in de knoop (ongeacht tijd)</span>
          </label>
        </div>
      </div>

      <button
        onClick={handleContinue}
        disabled={!selected}
        className="w-full max-w-sm mx-auto bg-primary text-white font-semibold py-4 px-6 rounded-lg text-base disabled:bg-gray-300 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
      >
        Verder
      </button>
    </div>
  );
};

export default WaarStaJeNu;

