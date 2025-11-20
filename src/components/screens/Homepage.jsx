import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { shuffleArray, STATEMENTS } from '../../data/statements';
import NavigationBar from '../NavigationBar';

const Homepage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userName = location.state?.userName || '';

  const handleStart = () => {
    const shuffledStatements = shuffleArray(STATEMENTS);
    navigate('/statement/0', { 
      state: {
        ...location.state,
        shuffledStatements
      }
    });
  };

  return (
    <div className="min-h-screen flex flex-col px-6 py-8 bg-white pb-24">
      <div className="flex-1 flex flex-col max-w-sm mx-auto w-full space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-primary mb-4">
            Hoi {userName}
          </h1>
        </div>

        <div>
          <h2 className="text-xl font-bold text-primary mb-3">
            Wat het is
          </h2>
          <p className="text-base text-text leading-relaxed">
            De tool helpt leiders om inzicht te krijgen in hun overtuigingen, gedragspatronen en valkuilen, zoals het pleasen, haasten of de behoefte om het altijd goed te willen doen.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-primary mb-3">
            Wanneer gebruik je dit?
          </h2>
          <p className="text-base text-text mb-3">
            Deze tool is er voor leiders die hun zelfinzicht willen ontwikkelen.
          </p>
          <div className="space-y-2">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-base text-text">Bij de start van je leiderschap</span>
            </div>
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-base text-text">Wanneer je vastloopt of twijfelt</span>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-primary mb-4">
            Hoe werkt het?
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg flex-shrink-0">
                1
              </div>
              <p className="text-base text-text pt-2">Herken stellingen die bij je passen</p>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg flex-shrink-0">
                2
              </div>
              <p className="text-base text-text pt-2">De tool koppelt deze aan patronen uit het model</p>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg flex-shrink-0">
                3
              </div>
              <p className="text-base text-text pt-2">De tool maakt automatisch een persoonlijke coachingsvraag op basis van je antwoorden</p>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={handleStart}
        className="w-full max-w-sm mx-auto bg-primary text-white font-semibold py-4 px-6 rounded-lg text-base hover:opacity-90 transition-opacity mt-8"
      >
        Start hier
      </button>

      <NavigationBar />
    </div>
  );
};

export default Homepage;

