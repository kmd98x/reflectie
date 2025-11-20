import React from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import DrowningPerson from '../DrowningPerson';
import NavigationBar from '../NavigationBar';
import { shuffleArray, STATEMENTS } from '../../data/statements';

const Statement = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { index } = useParams();
  const currentIndex = parseInt(index) || 0;
  
  // Get shuffled statements from state, or create new shuffled array
  const shuffledStatements = React.useMemo(() => {
    if (location.state?.shuffledStatements) {
      return location.state.shuffledStatements;
    }
    return shuffleArray(STATEMENTS);
  }, [location.state]);
  
  const responses = location.state?.responses || [];
  
  if (!shuffledStatements || shuffledStatements.length === 0) {
    return null;
  }

  const statement = shuffledStatements[currentIndex];
  const totalStatements = shuffledStatements.length;
  const progress = currentIndex + 1;

  const handleAnswer = (answer) => {
    const newResponses = [
      ...(responses || []),
      {
        statementId: statement.id,
        pattern: statement.pattern,
        answer: answer
      }
    ];

    if (currentIndex < totalStatements - 1) {
      navigate(`/statement/${currentIndex + 1}`, {
        state: {
          ...location.state,
          shuffledStatements,
          responses: newResponses
        }
      });
    } else {
      navigate('/komt-dit-je-bekend-voor', {
        state: {
          ...location.state,
          shuffledStatements,
          responses: newResponses
        }
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col px-6 py-8 bg-white pb-24">
      {/* Progress dots */}
      <div className="flex flex-col items-center mb-6">
        <div className="text-xs text-gray-500 mb-3">
          {progress} / {totalStatements}
        </div>
        <div className="flex justify-center gap-1 flex-wrap max-w-xs">
          {Array.from({ length: totalStatements }).map((_, i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                i < progress ? 'bg-primary' : 'bg-gray-300'
              }`}
            ></div>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
        <div className="bg-white border-2 border-gray-200 rounded-lg p-6 mb-6 shadow-sm">
          <p className="text-lg text-text text-center leading-relaxed">
            {statement.text}
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <DrowningPerson size="small" />
        </div>
      </div>

      <div className="flex gap-4 max-w-sm mx-auto w-full">
        <button
          onClick={() => handleAnswer('nee')}
          className="flex-1 bg-white border-2 border-gray-300 text-text font-semibold py-4 px-6 rounded-lg text-base hover:bg-gray-50 transition-colors"
        >
          Nee
        </button>
        <button
          onClick={() => handleAnswer('ja')}
          className="flex-1 bg-primary text-white font-semibold py-4 px-6 rounded-lg text-base hover:opacity-90 transition-opacity"
        >
          Ja
        </button>
      </div>

      <NavigationBar />
    </div>
  );
};

export default Statement;

