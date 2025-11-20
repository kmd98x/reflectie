import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Naam = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');

  const handleContinue = () => {
    if (name.trim()) {
      navigate('/privacy', { state: { userName: name.trim() } });
    }
  };

  const handleBack = () => {
    navigate('/');
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

      {/* Progress dots */}
      <div className="flex justify-center gap-2 mb-8">
        <div className="w-2 h-2 rounded-full bg-primary"></div>
        <div className="w-2 h-2 rounded-full bg-gray-300"></div>
        <div className="w-2 h-2 rounded-full bg-gray-300"></div>
      </div>

      <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
        <h1 className="text-2xl font-bold text-primary mb-6 text-center">
          Hoe wil je genoemd worden?
        </h1>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Jouw naam..."
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-base focus:outline-none focus:border-primary mb-2"
        />

        <p className="text-xs text-gray-500 mb-8">
          Je naam wordt alleen gebruikt voor persoonlijke feedback.
        </p>
      </div>

      <button
        onClick={handleContinue}
        disabled={!name.trim()}
        className="w-full max-w-sm mx-auto bg-primary text-white font-semibold py-4 px-6 rounded-lg text-base disabled:bg-gray-300 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
      >
        Verder
      </button>
    </div>
  );
};

export default Naam;

