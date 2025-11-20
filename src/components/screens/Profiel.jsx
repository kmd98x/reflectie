import React from 'react';
import { useLocation } from 'react-router-dom';
import NavigationBar from '../NavigationBar';
import { PATTERN_DESCRIPTIONS } from '../../data/statements';

const Profiel = () => {
  const location = useLocation();
  const userName = location.state?.userName || '';
  const dominantPattern = location.state?.dominantPattern;

  return (
    <div className="min-h-screen flex flex-col px-6 py-8 bg-white pb-24">
      <div className="flex-1 flex flex-col max-w-sm mx-auto w-full">
        <h1 className="text-2xl font-bold text-primary mb-6">
          Profiel
        </h1>

        <div className="space-y-6">
          <div>
            <h2 className="font-semibold text-primary mb-2">Naam</h2>
            <p className="text-text">{userName || 'Niet ingevuld'}</p>
          </div>

          {dominantPattern && (
            <div>
              <h2 className="font-semibold text-primary mb-2">Jouw patroon</h2>
              <p className="text-text">{PATTERN_DESCRIPTIONS[dominantPattern].name}</p>
            </div>
          )}
        </div>
      </div>

      <NavigationBar />
    </div>
  );
};

export default Profiel;

