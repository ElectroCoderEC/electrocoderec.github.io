import { Moon, Sun, Printer } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { LanguageSelector } from "./LanguageSelector";
import { useTranslation } from "../hooks/useTranslation";

export const ThemeToggle = () => {
  const { t } = useTranslation();

  const [isScrolled, setIsScrolled] = useState(false);

  const playSoundCV = () => {
    const audio = new Audio("/sounds/item.wav");
    audio.currentTime = 0;
    audio.play();
  };

  const playSoundCursor = () => {
    const audio = new Audio("/sounds/letter.wav");
    audio.currentTime = 0;
    audio.play();
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window === "undefined") return true; // SSR safe
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) return savedTheme === "dark";
    return true; // default: dark
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  useEffect(() => {
    // Detectar tema preferido del sistema
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDark);

    if (prefersDark) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    playSoundCursor();
    setIsDarkMode(prev => !prev);
  };

  const downloadSubmit = (e) => {
    playSoundCV();
    const targetFile = t('dowloadPDF');
    window.open(targetFile, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className={cn(
        "fixed right-5 z-50 flex items-center gap-2 max-md:top-3 max-md:right-3 transition-all duration-300",
        isScrolled ? "top-1" : "top-3"
      )}


    >
      {/* Language Selector - ocultar en mobile */}
      <button
        onClick={downloadSubmit}
        className={cn(
          "cosmic-button w-full flex items-center justify-center gap-2 max-md:hidden"
        )}
      >
        {t('cv')}

        <Printer size={20} />
      </button>

      {/* Language Selector - ocultar en mobile */}
      <div className="max-md:hidden">
        <LanguageSelector />
      </div>

      {/* Theme Toggle - ocultar en mobile */}
      <button
        onClick={toggleTheme}
        className={cn(
          "max-md:hidden p-2 rounded-full transition-colors duration-800",
          "hover:bg-primary/10 focus:outline-none border-3 "
        )}
        aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        {isDarkMode ? (
          <Sun className="h-6 w-6 text-yellow-300" />
        ) : (
          <Moon className="h-6 w-6 text-blue-900" />
        )}
      </button>
    </div>
  );
};