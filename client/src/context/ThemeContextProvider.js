import React, { useState, useEffect } from 'react';
import { ThemeContext } from './ThemeContext';

const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const setThemeClass = () => {
    document.documentElement.className = '';
    document.documentElement.classList.add(`theme-${theme}`);
  };

  const getTheme = () => {
    const storedTheme = localStorage.getItem('fifa-theme');
    if (storedTheme) {
      setTheme(storedTheme);
      setThemeClass();
    } else {
      setTheme('light');
      setThemeClass();
    }
  };

  const updateTheme = (e) => {
    localStorage.setItem('fifa-theme', e.target.checked ? 'dark' : 'light');
    const selectedTheme = e.target.checked ? 'dark' : 'light';
    setTheme(selectedTheme);
  };

  useEffect(() => {
    getTheme();
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, getTheme, updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
