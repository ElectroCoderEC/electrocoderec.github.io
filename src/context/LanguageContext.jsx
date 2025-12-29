import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

const LANGUAGES = {
  es: { name: 'Español', flag: '🇪🇸', code: 'es' },
  en: { name: 'English', flag: '🇺🇸', code: 'en' },
  de: { name: 'Deutsch', flag: '🇩🇪', code: 'de' },
  fr: { name: 'Français', flag: '🇫🇷', code: 'fr' }
};

// Detectar idioma del navegador
const detectBrowserLanguage = () => {
  const browserLang = navigator.language.split('-')[0];
  return LANGUAGES[browserLang] ? browserLang : 'en';
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Intentar cargar desde memoria (sin localStorage)
    return detectBrowserLanguage();
  });

  const changeLanguage = (newLang) => {
    setLanguage(newLang);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, languages: LANGUAGES }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage debe usarse dentro de LanguageProvider');
  }
  return context;
};