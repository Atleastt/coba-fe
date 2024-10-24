import React, { useState, forwardRef, useImperativeHandle } from 'react';
import Alert from './Alert';

const AlertContainer = forwardRef((props, ref) => {
  const [alerts, setAlerts] = useState([]);

  useImperativeHandle(ref, () => ({
    addAlert: (type, message, duration = 3000) => {
      const id = Date.now();
      setAlerts(prev => [...prev, { id, type, message }]);
      
      if (duration) {
        setTimeout(() => {
          removeAlert(id);
        }, duration);
      }
    }
  }));

  const removeAlert = (id) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  return (
    <div className="alert-container">
      {alerts.map(alert => (
        <Alert
          key={alert.id}
          type={alert.type}
          message={alert.message}
          onClose={() => removeAlert(alert.id)}
        />
      ))}
    </div>
  );
});

AlertContainer.displayName = 'AlertContainer';

export default AlertContainer;