import { useEffect, useState } from "react";

export const StarBackground = () => {
  const [stars, setStars] = useState([]);
  const [meteors, setMeteors] = useState([]);

  useEffect(() => {
    generateStars();
    generateMeteors();

    const handleResize = () => {
      generateStars();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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

  const generateMeteors = () => {
    const numberOfMeteors = 6; // Unos cuantos más para asegurar variedad
    const newMeteors = [];

    for (let i = 0; i < numberOfMeteors; i++) {
      // Decidimos si este meteoro será rápido (turbo) o lento
      const isFast = Math.random() > 0.7;

      newMeteors.push({
        id: i,
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
      });
    }

    setMeteors(newMeteors);
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      
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
          style={{
            width: `${meteor.tailLength}px`, // Usamos la longitud calculada
            left: `${meteor.x}%`,
            top: `${meteor.y}%`,
            animationDelay: `${meteor.delay}s`,
            animationDuration: `${meteor.duration}s`,
          }}
        />
      ))}
    </div>
  );
};