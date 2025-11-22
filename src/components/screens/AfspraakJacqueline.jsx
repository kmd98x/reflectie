import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import NavigationBar from '../NavigationBar';
import Calendar from '../Calendar';
import { PATTERN_DESCRIPTIONS, COACHING_QUESTIONS } from '../../data/statements';

const AfspraakJacqueline = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [showContactPopup, setShowContactPopup] = useState(false);
  const [contactType, setContactType] = useState('email'); // 'email' or 'phone'
  const [contactValue, setContactValue] = useState('');
  const [appointmentConfirmed, setAppointmentConfirmed] = useState(false);

  const { dominantPattern } = location.state || {};
  const patternName = dominantPattern ? PATTERN_DESCRIPTIONS[dominantPattern].nameNL : '';
  const coachingQuestion = dominantPattern ? COACHING_QUESTIONS[dominantPattern] : '';

  const timeSlots = [
    '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'
  ];

  const handleConfirm = () => {
    if (selectedDate && selectedTime) {
      setShowContactPopup(true);
    }
  };

  const handleSendConfirmation = () => {
    if (contactValue.trim()) {
      setAppointmentConfirmed(true);
    }
  };

  const handleCloseConfirmation = () => {
    navigate('/goed-gedaan', {
      state: {
        ...location.state,
        appointmentDate: selectedDate,
        appointmentTime: selectedTime,
        contactType,
        contactValue
      }
    });
  };

  const handleLater = () => {
    navigate('/goed-gedaan', { state: location.state });
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('nl-NL', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen flex flex-col px-6 py-8 bg-white pb-24">
      <div className="flex-1 flex flex-col max-w-sm mx-auto w-full">
        <h1 className="text-2xl font-bold text-primary mb-4 text-center">
          Klaar voor de volgende stap?
        </h1>

        <p className="text-base text-text text-center mb-8">
          Ga in gesprek met Jacqueline
        </p>

        {/* Calendar */}
        <div className="mb-6">
          <Calendar
            selectedDate={selectedDate}
            onDateSelect={(date) => {
              setSelectedDate(date);
              setSelectedTime('');
            }}
            startMonth={new Date(2025, 10, 1)}
          />
        </div>

        {/* Time Selection */}
        {selectedDate && (
          <div className="mb-6">
            <h3 className="font-semibold text-primary mb-4">Kies een tijd:</h3>
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`p-3 border-2 rounded-lg text-sm font-semibold transition-colors ${
                    selectedTime === time
                      ? 'bg-primary text-white border-primary'
                      : 'bg-white border-gray-300 text-text hover:bg-gray-50'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="space-y-3 max-w-sm mx-auto w-full">
        <button
          onClick={handleConfirm}
          disabled={!selectedDate || !selectedTime}
          className="w-full bg-primary text-white font-semibold py-4 px-6 rounded-lg text-base disabled:bg-gray-300 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
        >
          Bevestig afspraak
        </button>
        <button
          onClick={handleLater}
          className="w-full bg-white border-2 border-gray-300 text-text font-semibold py-4 px-6 rounded-lg text-base hover:bg-gray-50 transition-colors"
        >
          Later boeken
        </button>
      </div>

      {/* Contact Popup */}
      {showContactPopup && !appointmentConfirmed && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-xl font-bold text-primary mb-4">Contactgegevens</h3>
            <p className="text-sm text-text mb-4">
              Kies hoe je de afspraakgegevens wilt ontvangen:
            </p>

            <div className="flex gap-3 mb-4">
              <button
                onClick={() => {
                  setContactType('email');
                  setContactValue('');
                }}
                className={`flex-1 py-2 px-4 border-2 rounded-lg text-sm font-semibold transition-colors ${
                  contactType === 'email'
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white border-gray-300 text-text hover:bg-gray-50'
                }`}
              >
                Email
              </button>
              <button
                onClick={() => {
                  setContactType('phone');
                  setContactValue('');
                }}
                className={`flex-1 py-2 px-4 border-2 rounded-lg text-sm font-semibold transition-colors ${
                  contactType === 'phone'
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white border-gray-300 text-text hover:bg-gray-50'
                }`}
              >
                Telefoon
              </button>
            </div>

            <input
              type={contactType === 'email' ? 'email' : 'tel'}
              value={contactValue}
              onChange={(e) => setContactValue(e.target.value)}
              placeholder={contactType === 'email' ? 'jouw@email.nl' : '06 12345678'}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-base focus:outline-none focus:border-primary mb-4"
            />

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowContactPopup(false);
                  setContactValue('');
                }}
                className="flex-1 bg-white border-2 border-gray-300 text-text font-semibold py-3 px-4 rounded-lg text-base hover:bg-gray-50 transition-colors"
              >
                Annuleren
              </button>
              <button
                onClick={handleSendConfirmation}
                disabled={!contactValue.trim()}
                className="flex-1 bg-primary text-white font-semibold py-3 px-4 rounded-lg text-base disabled:bg-gray-300 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
              >
                Bevestigen
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Popup */}
      {appointmentConfirmed && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-primary mb-2">Goed gedaan!</h3>
            <p className="text-sm text-text mb-2">
              Jouw patroon: <strong>{patternName}</strong>
            </p>
            <p className="text-sm text-text mb-2">
              Coachingsvraag: {coachingQuestion}
            </p>
            <p className="text-sm text-text mb-4">
              Afspraak: {formatDate(selectedDate)} om {selectedTime}
            </p>
            <p className="text-sm font-medium text-primary mb-4">
              De afspraakgegevens en adres zijn verstuurd naar je {contactType === 'email' ? 'email' : 'telefoonnummer'} {contactValue}
            </p>
            <button
              onClick={handleCloseConfirmation}
              className="w-full bg-primary text-white font-semibold py-3 px-4 rounded-lg text-base hover:opacity-90 transition-opacity"
            >
              OK
            </button>
          </div>
        </div>
      )}

      <NavigationBar />
    </div>
  );
};

export default AfspraakJacqueline;
