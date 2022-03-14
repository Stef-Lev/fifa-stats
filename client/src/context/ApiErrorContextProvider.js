import React, { useState, useCallback } from 'react';
import { ApiErrorContext } from './ApiErrorContext';
import ApiErrorFlash from '../components/ApiErrorFlash';

const ApiErrorContextProvider = ({ children }) => {
  const [apiError, setApiError] = useState(false);
  const [apiMsg, setApiMsg] = useState('');
  const timeVisible = 5;

  const clearFlashError = useCallback(() => {
    const timer = setTimeout(() => {
      setApiError(false);
      setApiMsg('');
    }, timeVisible * 1000);
    return () => clearTimeout(timer);
  }, []);

  const showFlashError = useCallback(
    (msg) => {
      setApiError(true);
      setApiMsg(msg);
      clearFlashError();
    },
    [clearFlashError],
  );

  return (
    <ApiErrorContext.Provider value={{ showFlashError }}>
      {children}
      <ApiErrorFlash visible={apiError} message={apiMsg} />
    </ApiErrorContext.Provider>
  );
};

export default ApiErrorContextProvider;
