import React from 'react';
import { Moon, Sun } from 'lucide-react';

interface DarkModeToggleProps {
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
}

const DarkModeToggle: React.FC<DarkModeToggleProps> = ({ isDarkMode, setIsDarkMode }) => {
  return (
    <button
      onClick={() => setIsDarkMode(!isDarkMode)}
      className="dev-button p-2 hover:scale-105 transition-all duration-300"
      title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDarkMode ? (
        <Sun className="h-4 w-4 transition-transform duration-500 rotate-0" />
      ) : (
        <Moon className="h-4 w-4 transition-transform duration-500 rotate-0" />
      )}
    </button>
  );
};

export default DarkModeToggle;