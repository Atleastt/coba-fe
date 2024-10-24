import React, { createContext, useContext } from 'react';
import AlertContainer from './AlertContainer';

const AlertContext = createContext(null);

export const AlertProvider = ({ children }) => {
  const addAlert = (type, message, duration) => {
    if (window.alertContainer) {
      window.alertContainer.addAlert(type, message, duration);
    }
  };

  return (
    <AlertContext.Provider value={{ addAlert }}>
      {children}
      <AlertContainer ref={ref => { window.alertContainer = ref; }} />
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};