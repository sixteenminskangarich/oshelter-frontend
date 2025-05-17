// src/contexts/SettingsContext.jsx
import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_APP_SERVICE_URL}/getSettings`)
      .then(res => setSettings(res.data.data))
      .catch(err => console.error('Failed to load settings', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, loading }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
