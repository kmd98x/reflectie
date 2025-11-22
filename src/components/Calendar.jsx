import React from 'react';

const Calendar = ({ selectedDate, onDateSelect, startMonth = new Date(2025, 10, 1) }) => {
  const [currentMonth, setCurrentMonth] = React.useState(startMonth);

  const monthNames = ['Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni', 
                     'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December'];
  const dayNames = ['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo'];

  const getDaysInMonth = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1; // Monday = 0

    const days = [];
    
    // Add empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add all days of the month
    const today = new Date();
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isPast = date < today && month === 10 && year === 2025; // Only disable past dates in November 2025
      days.push({ day, date, isPast });
    }

    return days;
  };

  const goToPreviousMonth = () => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(newDate.getMonth() - 1);
    if (newDate >= startMonth) {
      setCurrentMonth(newDate);
      onDateSelect(null); // Clear selection when changing month
    }
  };

  const goToNextMonth = () => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentMonth(newDate);
    onDateSelect(null); // Clear selection when changing month
  };

  const handleDateClick = (date) => {
    if (date && !date.isPast) {
      onDateSelect(date.date.toISOString().split('T')[0]);
    }
  };

  const days = getDaysInMonth();
  const selectedDateStr = selectedDate ? new Date(selectedDate).toISOString().split('T')[0] : null;

  return (
    <div className="bg-white border-2 border-gray-200 rounded-lg p-4">
      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={goToPreviousMonth}
          disabled={currentMonth <= startMonth}
          className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h3 className="text-lg font-bold text-primary">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h3>
        <button
          onClick={goToNextMonth}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Day Headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map((day, index) => (
          <div key={index} className="text-center text-xs font-semibold text-gray-500 py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Days */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((dayData, index) => {
          if (dayData === null) {
            return <div key={index} className="aspect-square"></div>;
          }

          const { day, date, isPast } = dayData;
          const dateStr = date.toISOString().split('T')[0];
          const isSelected = selectedDateStr === dateStr;

          return (
            <button
              key={index}
              onClick={() => handleDateClick(dayData)}
              disabled={isPast}
              className={`aspect-square rounded-lg text-sm font-semibold transition-colors ${
                isPast
                  ? 'text-gray-300 cursor-not-allowed'
                  : isSelected
                  ? 'bg-primary text-white'
                  : 'bg-white text-text hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;

