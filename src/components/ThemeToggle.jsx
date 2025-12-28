import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { LanguageSelector } from "./LanguageSelector";

export const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    // Detectar tema preferido del sistema
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDark);
    
    if (prefersDark) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    }
  };

  return (
    <div className="fixed top-4 right-5 z-50 flex items-center gap-2 max-md:top-3 max-md:right-3">
      {/* Language Selector - ocultar en mobile */}
      <div className="max-md:hidden">
        <LanguageSelector />
      </div>
      
      {/* Theme Toggle - ocultar en mobile */}
      <button
        onClick={toggleTheme}
        className={cn(
          "max-md:hidden p-2 rounded-full transition-colors duration-300",
          "hover:bg-primary/10 focus:outline-none"
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