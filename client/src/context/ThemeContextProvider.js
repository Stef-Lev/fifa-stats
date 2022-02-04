import React, { useState, useEffect, useCallback } from 'react';
import { ThemeContext } from './ThemeContext';

const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const setThemeClass = useCallback(() => {
    document.documentElement.className = '';
    document.documentElement.classList.add(`theme-${theme}`);
  }, [theme]);

  const getTheme = useCallback(() => {
    const storedTheme = localStorage.getItem('fifa-theme');
    if (storedTheme) {
      setTheme(storedTheme);
      setThemeClass();
    } else {
      setTheme('light');
      setThemeClass();
    }
  }, [setThemeClass]);

  const updateTheme = (e) => {
    localStorage.setItem('fifa-theme', e.target.checked ? 'dark' : 'light');
    const selectedTheme = e.target.checked ? 'dark' : 'light';
    setTheme(selectedTheme);
  };

  useEffect(() => {
    getTheme();
  }, [theme, getTheme]);

  return (
    <ThemeContext.Provider value={{ theme, getTheme, updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
