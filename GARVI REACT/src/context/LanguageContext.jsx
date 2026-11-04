import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState(() => (i18n.language || 'en').slice(0, 2));

  useEffect(() => {
    document.documentElement.lang = lang;

    const handleLanguageChanged = (newLng) => {
      const clean = (newLng || 'en').slice(0, 2);
      setLang(clean);
      document.documentElement.lang = clean;
    };

    i18n.on('languageChanged', handleLanguageChanged);
    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, [i18n, lang]);

  const toggleLanguage = React.useCallback(() => {
    const nextLang = lang === 'en' ? 'gu' : 'en';
    i18n.changeLanguage(nextLang);
  }, [lang, i18n]);

  const contextValue = useMemo(() => ({
    lang,
    toggleLanguage,
    t,
    i18n
  }), [lang, toggleLanguage, t, i18n]);

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
