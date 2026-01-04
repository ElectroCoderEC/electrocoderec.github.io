import { useEffect, useState } from "react";

const METEOR_COLORS = [
  "#ffffff", // blanco puro
  "#9be7ff", // celeste
  "#ffe066", // dorado
  "#ff9f43", // naranja suave
  "#4dabf7", // azul eléctrico
  "#0ca678", // verde esmeralda
  "#51cf66", // verde menta
  "#ff6b6b", // Rojo: Calcio o Silicio (frecuente en las estelas finales)
  "#c77dff", // Morado/Violeta: Calcio ionizado o Potasio
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
      // Aumenté un poco la probabilidad de estrellas brillantes
      const shouldTwinkle = animationType > 0.8;

      newStars.push({
        id: i,
        // Tamaño un poco más grande para que se noten bien
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


  const regenerateMeteor = (id) => {
  setMeteors((prev) =>
    prev.map((m) => {
      if (m.id !== id) return m;

      const isFast = true;
      const color =
        METEOR_COLORS[Math.floor(Math.random() * METEOR_COLORS.length)];

      return {
        ...m,
        id: crypto.randomUUID(), // fuerza nueva animación
        x: Math.random() * 100 - 30,
        y: Math.random() * 20,
        delay: Math.random() * 3,
        duration: Math.random() * 1.2 + 1.5,
        tailLength: Math.random() * 50 + 150,
        color,
      };
    })
  );
};


  const generateMeteors = () => {
    const numberOfMeteors = 6; // Unos cuantos más para asegurar variedad
    const newMeteors = [];

    for (let i = 0; i < numberOfMeteors; i++) {
      // Decidimos si este meteoro será rápido (turbo) o lento
      const isFast = Math.random() > 0.7;

       const color = isFast
      ? METEOR_COLORS[Math.floor(Math.random() * METEOR_COLORS.length)]
      : "#ffffff";

      newMeteors.push({
        id: i,
        isFast,
        x: Math.random() * 100 - 30,
        y: Math.random() * 20,
        // Si es rápido, delay corto. Si es lento, delay largo.
        delay: Math.random() * 15,

        // Lógica de Velocidad:
        // Rápido: entre 0.8s y 2s
        // Lento: entre 4s y 7s
        duration: isFast
          ? Math.random() * 1.2 + 1.5
          : Math.random() * 3 + 4,

        // Lógica de Cola (Size):
        // Si va rápido, la cola es más larga (efecto velocidad)
        // Si va lento, la cola es un poco más corta
        tailLength: isFast
          ? Math.random() * 50 + 150 // Cola larga (150-200px)
          : Math.random() * 50 + 70, // Cola media (80-130px)
        color: color,
      });
    }

    setMeteors(newMeteors);
  };

  

  // Si no es modo oscuro, el componente no renderiza NADA
  if (!isDarkMode) return null;

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 hidden dark:block">

      {/* Estrellas */}
      {stars.map((star) => (
        <div
          key={star.id}
          className={`star-base ${star.twinkle ? "star-twinkle" : "star-pulse"}`}
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            left: `${star.x}%`,
            top: `${star.y}%`,
            // La opacidad base la controla React, la animación CSS la elevará
            opacity: star.opacity,
            animationDuration: `${star.animationDuration}s`,
            animationDelay: `${star.animationDelay}s`,
          }}
        />
      ))}

      {/* Meteoros */}
      {meteors.map((meteor) => (
  <div
    key={meteor.id}
    className="meteor-effect"
    onAnimationEnd={() => {
      if (meteor.isFast) regenerateMeteor(meteor.id);
    }}
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