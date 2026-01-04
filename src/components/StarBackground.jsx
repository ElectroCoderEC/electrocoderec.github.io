import { useEffect, useState } from "react";

const METEOR_COLORS = [
  "#ffffff", "#9be7ff", "#51cf66", "#ffe066", "#ff9f43", "#4dabf7", "#c77dff",
  "#0ca678", "#ff6b6b",
];

export const StarBackground = () => {
  const [stars, setStars] = useState([]);
  const [meteors, setMeteors] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      const isDark = document.documentElement.classList.contains("dark");
      setIsDarkMode(isDark);
    };

    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Generación inicial
    const init = () => {
      if (document.documentElement.classList.contains("dark")) {
        generateStars();
        generateMeteors();
      }
    };

    init();

    const handleResize = () => {
      init();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
    };
  }, []);

  const generateStars = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    // Densidad dinámica: más estrellas en pantallas grandes
    const numberOfStars = Math.floor((width * height) / 8000);

    const newStars = [];
    for (let i = 0; i < numberOfStars; i++) {
      const isTwinkle = Math.random() > 0.8;
      newStars.push({
        id: i,
        size: Math.random() * 2 + 0.8,
        x: Math.random() * 100,
        y: Math.random() * 100,
        opacity: Math.random() * 0.5 + 0.4,
        animationDuration: isTwinkle ? Math.random() * 2 + 2 : Math.random() * 4 + 3,
        // Delay corto para que no tarden en aparecer al cargar
        animationDelay: Math.random() * 1,
        twinkle: isTwinkle,
      });
    }
    setStars(newStars);
  };

  const generateMeteors = () => {
    const isMobile = window.innerWidth < 768;
    const numberOfMeteors = isMobile ? 4 : 8; // Menos meteoros en móvil para no saturar
    const newMeteors = [];

    for (let i = 0; i < numberOfMeteors; i++) {
      const isFast = Math.random() > 0.7;
      const color = isFast
        ? METEOR_COLORS[Math.floor(Math.random() * METEOR_COLORS.length)]
        : "#ffffff";

      // LÓGICA DE POSICIÓN DINÁMICA:
      // En móvil (pantalla estrecha), empezamos desde un X más centrado (0 a 80)
      // En desktop, mantenemos el margen negativo (-30 a 70) para recorridos largos
      const xPos = isMobile 
        ? Math.random() * 30 
        : Math.random() * 100 - 30;

      newMeteors.push({
        id: i,
        x: xPos,
        y: Math.random() * 40, // Un poco más de rango vertical
        // Reducimos el delay para que el usuario móvil vea acción rápido
        delay: Math.random() * (isMobile ? 5 : 12), 
        duration: isFast ? Math.random() * 1 + 1.2 : Math.random() * 2 + 4,
        tailLength: isFast ? 180 : 100,
        color: color,
      });
    }
    setMeteors(newMeteors);
  };

  if (!isDarkMode) return null;

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {stars.map((star) => (
        <div
          key={star.id}
          className={`star-base ${star.twinkle ? "star-twinkle" : "star-pulse"}`}
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            left: `${star.x}%`,
            top: `${star.y}%`,
            opacity: star.opacity,
            animationDuration: `${star.animationDuration}s`,
            animationDelay: `${star.animationDelay}s`,
          }}
        />
      ))}

      {meteors.map((meteor) => (
        <div
          key={meteor.id}
          className="meteor-effect"
          style={{
            width: `${meteor.tailLength}px`,
            left: `${meteor.x}%`,
            top: `${meteor.y}%`,
            animationDelay: `${meteor.delay}s`,
            animationDuration: `${meteor.duration}s`,
            "--meteor-color": meteor.color,
          }}
        />
      ))}
    </div>
  );
};