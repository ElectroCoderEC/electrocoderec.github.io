import { Globe, Check } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { cn } from "@/lib/utils";

export const LanguageSelector = () => {
  const { language, changeLanguage, languages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "p-2 rounded-full transition-colors duration-300 flex items-center gap-2",
          "hover:bg-primary/10 focus:outline-none"
        )}
        aria-label="Select language"
      >
        <span className="text-xl">{languages[language].flag}</span>
        <Globe className="h-5 w-5" />
      </button>

      {isOpen && (
        <>
          {/* Overlay para cerrar al hacer clic fuera */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown menu */}
          <div className="absolute right-0 mt-2 w-48 rounded-lg bg-background border border-border shadow-lg z-50 overflow-hidden">
            {Object.entries(languages).map(([code, lang]) => (
              <button
                key={code}
                onClick={() => {
                  changeLanguage(code);
                  setIsOpen(false);
                }}
                className={cn(
                  "w-full px-4 py-3 text-left flex items-center justify-between gap-3 transition-colors",
                  "hover:bg-primary/10",
                  language === code ? "bg-primary/20" : ""
                )}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{lang.flag}</span>
                  <span className="font-medium">{lang.name}</span>
                </div>
                {language === code && (
                  <Check className="h-4 w-4 text-primary" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};