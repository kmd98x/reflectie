import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import NavigationBar from '../NavigationBar';
import { COACHING_QUESTIONS, PATTERN_DESCRIPTIONS } from '../../data/statements';

const CoachingVraag = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { dominantPattern } = location.state || {};
  const [showMailPopup, setShowMailPopup] = useState(false);
  const [email, setEmail] = useState('');
  const [mailSent, setMailSent] = useState(false);

  if (!dominantPattern) {
    return null;
  }

  const coachingQuestion = COACHING_QUESTIONS[dominantPattern];
  const patternName = PATTERN_DESCRIPTIONS[dominantPattern].name;

  const handleMailClick = () => {
    setShowMailPopup(true);
    setMailSent(false);
  };

  const handleSendMail = () => {
    if (email.trim()) {
      setMailSent(true);
    }
  };

  const handleClosePopup = () => {
    setShowMailPopup(false);
    setEmail('');
    setMailSent(false);
  };

  const handleFinish = () => {
    navigate('/afspraak-jacqueline', { state: location.state });
  };

  return (
    <div className="min-h-screen flex flex-col px-6 py-8 bg-white pb-24">
      <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto mb-4 bg-accent/20 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-primary mb-2">
            Jouw persoonlijke coachingsvraag
          </h1>
          <p className="text-sm text-gray-500 mb-4">
            Op basis van jouw patroon <strong>{patternName}</strong> hebben we een vraag voor je gemaakt die je helpt reflecteren en groeien.
          </p>
        </div>

        <div className="bg-white border-2 border-gray-200 rounded-lg p-6 mb-6 shadow-sm">
          <p className="text-base text-text text-center leading-relaxed font-medium">
            {coachingQuestion}
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-8">
          <p className="text-sm text-text text-center leading-relaxed">
            Neem deze vraag mee naar je coaching met Jacqueline. Deze helpt je om dieper in te gaan op jouw patronen en groei te realiseren.
          </p>
        </div>
      </div>

      <div className="space-y-3 max-w-sm mx-auto w-full">
        <button
          onClick={handleMailClick}
          className="w-full bg-white border-2 border-primary text-primary font-semibold py-4 px-6 rounded-lg text-base hover:bg-primary hover:text-white transition-all"
        >
          Mail naar mij
        </button>
        <button
          onClick={handleFinish}
          className="w-full bg-white border-2 border-primary text-primary font-semibold py-4 px-6 rounded-lg text-base hover:bg-primary hover:text-white transition-all"
        >
          Afspraak inplannen
        </button>
      </div>

      {/* Mail Popup */}
      {showMailPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            {!mailSent ? (
              <>
                <h3 className="text-xl font-bold text-primary mb-4">Je patroon per mail ontvangen</h3>
                <p className="text-sm text-text mb-4">
                  Vul je emailadres in om je patroon en coachingsvraag per mail te ontvangen.
                </p>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jouw@email.nl"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-base focus:outline-none focus:border-primary bg-white text-text mb-4"
                />
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setShowMailPopup(false);
                      setEmail('');
                    }}
                    className="flex-1 bg-white border-2 border-gray-300 text-text font-semibold py-3 px-4 rounded-lg text-base hover:bg-gray-50 transition-colors"
                  >
                    Annuleren
                  </button>
                  <button
                    onClick={handleSendMail}
                    disabled={!email.trim()}
                    className="flex-1 bg-primary text-white font-semibold py-3 px-4 rounded-lg text-base disabled:bg-gray-300 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
                  >
                    Verstuur
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">Verzonden!</h3>
                <p className="text-sm text-text mb-4">
                  Je coaching vraag is verstuurd naar {email}
                </p>
                <button
                  onClick={handleClosePopup}
                  className="w-full bg-primary text-white font-semibold py-3 px-4 rounded-lg text-base hover:opacity-90 transition-opacity"
                >
                  OK
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <NavigationBar />
    </div>
  );
};

export default CoachingVraag;

