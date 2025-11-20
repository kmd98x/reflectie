import React from 'react';
import { useNavigate } from 'react-router-dom';
import DrowningPerson from '../DrowningPerson';

const ZeroState = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-8 bg-white">
      <div className="flex flex-col items-center justify-center flex-1 w-full max-w-sm">
        <DrowningPerson size="large" />
        
        <div className="mt-8 text-center space-y-4">
          <p className="text-base text-text leading-relaxed">
            Sta je aan het begin van je leiderschap, of loop je vast in wat van je wordt verwacht?
          </p>
          <p className="text-base font-bold text-primary leading-relaxed">
            Ontdek wie jij bent als leider!
          </p>
        </div>
      </div>

      <button
        onClick={() => navigate('/naam')}
        className="w-full max-w-sm bg-primary text-white font-semibold py-4 px-6 rounded-lg text-base mt-8 hover:opacity-90 transition-opacity"
      >
        Ontdek wat je écht beweegt
      </button>
    </div>
  );
};

export default ZeroState;

