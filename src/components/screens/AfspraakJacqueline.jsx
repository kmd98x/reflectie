import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import NavigationBar from '../NavigationBar';

const AfspraakJacqueline = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const timeSlots = [
    '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'
  ];

  const handleConfirm = () => {
    if (selectedDate && selectedTime) {
      navigate('/goed-gedaan', {
        state: {
          ...location.state,
          appointmentDate: selectedDate,
          appointmentTime: selectedTime
        }
      });
    }
  };

  const handleLater = () => {
    navigate('/goed-gedaan', { state: location.state });
  };

  // Generate next 7 days
  const getNextDays = () => {
    const days = [];
    const today = new Date();
    for (let i = 1; i <= 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push(date);
    }
    return days;
  };

  return (
    <div className="min-h-screen flex flex-col px-6 py-8 bg-white pb-24">
      <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
        <h1 className="text-2xl font-bold text-primary mb-4 text-center">
          Klaar voor de volgende stap?
        </h1>

        <p className="text-base text-text text-center mb-8">
          Ga in gesprek met Jacqueline
        </p>

        <div className="mb-6">
          <h3 className="font-semibold text-primary mb-4">Kies een datum:</h3>
          <div className="grid grid-cols-3 gap-2">
            {getNextDays().map((date, index) => {
              const dateStr = date.toISOString().split('T')[0];
              const dayName = date.toLocaleDateString('nl-NL', { weekday: 'short' });
              const dayNum = date.getDate();
              
              return (
                <button
                  key={index}
                  onClick={() => setSelectedDate(dateStr)}
                  className={`p-3 border-2 rounded-lg text-sm font-semibold transition-colors ${
                    selectedDate === dateStr
                      ? 'bg-primary text-white border-primary'
                      : 'bg-white border-gray-300 text-text hover:bg-gray-50'
                  }`}
                >
                  <div className="text-xs opacity-75">{dayName}</div>
                  <div>{dayNum}</div>
                </button>
              );
            })}
          </div>
        </div>

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

      <NavigationBar />
    </div>
  );
};

export default AfspraakJacqueline;

