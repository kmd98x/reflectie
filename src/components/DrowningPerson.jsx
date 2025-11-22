import React, { useState } from 'react';

const DrowningPerson = ({ size = 'medium', labelAbove = '', labelBelow = '', animated = false }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  
  const sizes = {
    small: { width: 120, height: 100, personSize: 40 },
    medium: { width: 200, height: 160, personSize: 60 },
    large: { width: 280, height: 240, personSize: 80 }
  };

  const { width, height, personSize } = sizes[size];

  React.useEffect(() => {
    if (animated) {
      setIsAnimating(true);
      // Animation cycles
      const interval = setInterval(() => {
        setIsAnimating(prev => !prev);
      }, 300);
      const timer = setTimeout(() => {
        clearInterval(interval);
        setIsAnimating(false);
      }, 2000);
      return () => {
        clearInterval(interval);
        clearTimeout(timer);
      };
    }
  }, [animated]);

  return (
    <div className="flex flex-col items-center justify-center">
      {labelAbove && (
        <div className="text-center mb-2">
          <span className="text-sm font-semibold text-primary">{labelAbove}</span>
        </div>
      )}
      <svg
        width={width}
        height={height}
        viewBox="0 0 200 200"
        className="flex-shrink-0"
      >
        {/* Water waves */}
        <path
          d="M 0 120 Q 50 100, 100 120 T 200 120 L 200 200 L 0 200 Z"
          fill="#E3F2FD"
          opacity="0.6"
        />
        <path
          d="M 0 140 Q 50 120, 100 140 T 200 140 L 200 200 L 0 200 Z"
          fill="#BBDEFB"
          opacity="0.8"
        />
        <path
          d="M 0 160 Q 50 140, 100 160 T 200 160 L 200 200 L 0 200 Z"
          fill="#90CAF9"
        />
        
        {/* Drowning person (stick figure with arms up) */}
        {/* Head */}
        <circle
          cx="100"
          cy="60"
          r="12"
          fill="#2C3E50"
        />
        
        {/* Body */}
        <line
          x1="100"
          y1="72"
          x2="100"
          y2="110"
          stroke="#2C3E50"
          strokeWidth="3"
          strokeLinecap="round"
        />
        
        {/* Arms raised (drowning position) - animated */}
        <line
          x1="100"
          y1="80"
          x2={isAnimating ? "88" : "85"}
          y2={isAnimating ? "63" : "70"}
          stroke="#2C3E50"
          strokeWidth="3"
          strokeLinecap="round"
          style={{
            transition: 'all 0.3s ease-in-out',
            transform: isAnimating ? 'translateY(-3px)' : 'translateY(0)'
          }}
        />
        <line
          x1="100"
          y1="80"
          x2={isAnimating ? "112" : "115"}
          y2={isAnimating ? "63" : "70"}
          stroke="#2C3E50"
          strokeWidth="3"
          strokeLinecap="round"
          style={{
            transition: 'all 0.3s ease-in-out',
            transform: isAnimating ? 'translateY(-3px)' : 'translateY(0)'
          }}
        />
        
        {/* Legs */}
        <line
          x1="100"
          y1="110"
          x2="90"
          y2="130"
          stroke="#2C3E50"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <line
          x1="100"
          y1="110"
          x2="110"
          y2="130"
          stroke="#2C3E50"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
      {labelBelow && (
        <div className="text-center mt-2">
          <span className="text-sm font-semibold text-primary">{labelBelow}</span>
        </div>
      )}
    </div>
  );
};

export default DrowningPerson;

