import { useEffect, useState } from "react";

const METEOR_COLORS = [
  "#ffffff", // blanco puro
  "#9be7ff", // celeste
  "#ffe066", // dorado
  "#ff9f43", // naranja suave
  "#4dabf7", // azul eléctrico
  "#c77dff", // morado
];

export const StarBackground = () => {
  const [stars, setStars] = useState([]);
  const [meteors, setMeteors] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // 1. Función para detectar si la clase 'dark' está activa
    const checkTheme = () => {
      const isDark = document.documentElement.classList.contains("dark");
      setIsDarkMode(isDark);
    };

    // Revisar el tema al montar el componente
    checkTheme();

    // 2. Escuchar cambios en los atributos del HTML (el toggle de tu ThemeToggle)
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // 3. Solo generar elementos si estamos en modo oscuro
    if (document.documentElement.classList.contains("dark")) {
      generateStars();
      generateMeteors();
    }

    const handleResize = () => {
      generateStars();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
    };
  }, []);

  const generateStars = () => {
    const numberOfStars = Math.floor(
      (window.innerWidth * window.innerHeight) / 9000
    );

    const newStars = [];

    for (let i = 0; i < numberOfStars; i++) {
      const animationType = Math.random();
      const shouldTwinkle = animationType > 0.8;

      newStars.push({
        id: i,
        size: Math.random() * 2.5 + 1,
        x: Math.random() * 100,
        y: Math.random() * 100,
        opacity: Math.random() * 0.5 + 0.4,
        animationDuration: shouldTwinkle
          ? Math.random() * 2 + 2  // 2s a 4s (más activas)
          : Math.random() * 4 + 3,
        animationDelay: Math.random() * 5,
        twinkle: shouldTwinkle,
      });
    }

    setStars(newStars);
  };

  const generateMeteors = () => {
    const numberOfMeteors = 6;
    const newMeteors = [];

    for (let i = 0; i < numberOfMeteors; i++) {
      const isFast = Math.random() > 0.7;

      const color = isFast
        ? METEOR_COLORS[Math.floor(Math.random() * METEOR_COLORS.length)]
        : "#ffffff";

      newMeteors.push({
        id: i,
        x: Math.random() * 100 - 30,
        y: Math.random() * 20,
        delay: Math.random() * 15,
        duration: isFast
          ? Math.random() * 1.2 + 1.5
          : Math.random() * 3 + 4,
        tailLength: isFast
          ? Math.random() * 50 + 150 // Cola larga
          : Math.random() * 50 + 70,  // Cola media
        color: color,
      });
    }

    setMeteors(newMeteors);
  };

  // Si no es modo oscuro, el componente no renderiza nada
  if (!isDarkMode) return null;

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Renderizado de Estrellas */}
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

      {/* Renderizado de Meteoros */}
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