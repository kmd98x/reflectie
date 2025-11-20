import React from 'react';
import NavigationBar from '../NavigationBar';

const Settings = () => {
  return (
    <div className="min-h-screen flex flex-col px-6 py-8 bg-white pb-24">
      <div className="flex-1 flex flex-col max-w-sm mx-auto w-full">
        <h1 className="text-2xl font-bold text-primary mb-6">
          Settings
        </h1>

        <div className="space-y-4">
          <div className="p-4 border-2 border-gray-200 rounded-lg">
            <h3 className="font-semibold text-primary mb-2">Privacy</h3>
            <p className="text-sm text-text">Je gegevens worden veilig opgeslagen en niet gedeeld met derden.</p>
          </div>

          <div className="p-4 border-2 border-gray-200 rounded-lg">
            <h3 className="font-semibold text-primary mb-2">Over deze app</h3>
            <p className="text-sm text-text">Omnient Reflect - Drowning Person Tool</p>
          </div>
        </div>
      </div>

      <NavigationBar />
    </div>
  );
};

export default Settings;

