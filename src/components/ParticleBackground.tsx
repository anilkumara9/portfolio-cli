import React from 'react';

interface ParticleBackgroundProps {
  isDarkMode?: boolean;
}

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({ isDarkMode = false }) => {
  return (
    <div className={`absolute inset-0 z-0 pointer-events-none ${isDarkMode ? 'opacity-30' : 'opacity-10'}`}>
      {/* CSS-based particle effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-transparent">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 rounded-full ${
              isDarkMode ? 'bg-white' : 'bg-black'
            } animate-pulse`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ParticleBackground;