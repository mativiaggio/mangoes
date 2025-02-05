"use client";
import React, {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { translations } from "../translate";

// Define el tipo del contexto
interface LanguageContextType {
  language: "esp" | "eng" | "por";
  t: (typeof translations)["esp"];
  setLanguage: Dispatch<SetStateAction<"esp" | "eng" | "por">>;
}

// Define el contexto con el tipo corregido
const LanguageContext = createContext<LanguageContextType>({
  language: "esp",
  t: translations.esp, // Traducciones por defecto
  setLanguage: () => {}, // Placeholder para evitar errores iniciales
});

// Hook para usar el contexto
export const useLanguage = () => useContext(LanguageContext);

// Proveedor del contexto
export const LanguageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const getInitialLanguage = (): "esp" | "eng" | "por" => {
    // Obtiene el idioma de localStorage o usa español por defecto
    const savedLanguage = localStorage.getItem("language");
    return (savedLanguage as "esp" | "eng" | "por") || "esp";
  };

  const [language, setLanguage] = useState<"esp" | "eng" | "por">(
    getInitialLanguage
  );

  // Guarda el idioma seleccionado en localStorage cada vez que cambia
  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  // Traducciones basadas en el idioma seleccionado
  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
