import { ArrowRight, ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useTranslation } from "../hooks/useTranslation";

export const ProjectsSection = () => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);

  const projects = [
    {
      id: 1,
      title: t('projects.project1.title'),
      description: t('projects.project1.description'),
      image: "/projects/project1.png",
      tags: ["ATmega2560", "SolidWorks", "Eagle PCB"],
      demoUrl: "#",
      githubUrl: "#",
    },
    {
      id: 2,
      title: t('projects.project2.title'),
      description: t('projects.project2.description'),
      image: "/projects/project2.png",
      tags: ["Altium", "JLCPCB"],
      demoUrl: "#",
      githubUrl: "#",
    },
    {
      id: 3,
      title: t('projects.project3.title'),
      description: t('projects.project3.description'),
      image: "/projects/project3.png",
      tags: ["Machines Simulator", "TIA Portal"],
      demoUrl: "#",
      githubUrl: "#",
    },
    {
      id: 4,
      title: t('projects.project1.title'),
      description: t('projects.project1.description'),
      image: "/projects/project1.png",
      tags: ["ATmega2560", "SolidWorks", "Eagle PCB"],
      demoUrl: "#",
      githubUrl: "#",
    },
    {
      id: 5,
      title: t('projects.project2.title'),
      description: t('projects.project2.description'),
      image: "/projects/project2.png",
      tags: ["Altium", "JLCPCB"],
      demoUrl: "#",
      githubUrl: "#",
    },
    {
      id: 6,
      title: t('projects.project3.title'),
      description: t('projects.project3.description'),
      image: "/projects/project3.png",
      tags: ["Machines Simulator", "TIA Portal"],
      demoUrl: "#",
      githubUrl: "#",
    },
  ];

  // Número de proyectos visibles según el tamaño de pantalla
  const getItemsPerView = () => {
    if (typeof window === 'undefined') return 3;
    if (window.innerWidth < 768) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  };

  const [itemsPerView, setItemsPerView] = useState(getItemsPerView());
  
  // Calcular el número total de páginas
  const totalPages = Math.ceil(projects.length / itemsPerView);
  const maxIndex = totalPages - 1;

  // Actualizar itemsPerView cuando cambie el tamaño de la ventana
  useEffect(() => {
    const handleResize = () => {
      setItemsPerView(getItemsPerView());
      setCurrentIndex(0); // Reiniciar al cambiar tamaño
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const getFormattedTitle = () => {
    const fullText = t('projects.title');
    const words = fullText.split(" ");
    
    if (words.length <= 1) return fullText;

    const lastWord = words.pop();
    const restOfText = words.join(" ");

    return (
      <>
        {restOfText} <span className="text-primary">{lastWord}</span>
      </>
    );
  };

  return (
    <section id="projects" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          {getFormattedTitle()}
        </h2>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          {t('projects.description')}
        </p>

        {/* Carrusel Container */}
        <div className="relative">
          {/* Botón Anterior */}
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className="cosmic-button absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 rounded-full p-3 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Proyecto anterior"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Contenedor del carrusel */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out gap-6"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {projects.map((project, key) => (
                <div
                  key={key}
                  className="flex-shrink-0 w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.334rem)]"
                >
                  <div className="group bg-card rounded-lg overflow-hidden shadow-xs card-hover h-full">
                    <div className="h-48 overflow-hidden">
                      
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>

                    <div className="p-6">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 text-xs font-medium border rounded-full bg-secondary text-secondary-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <h3 className="text-xl font-semibold mb-1">{project.title}</h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        {project.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <div className="flex space-x-3">
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-foreground/80 hover:text-primary transition-colors duration-300"
                          >
                            <ExternalLink size={20} />
                          </a>
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-foreground/80 hover:text-primary transition-colors duration-300"
                          >
                            <Github size={20} />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Botón Siguiente */}
          <button
            onClick={nextSlide}
            disabled={currentIndex >= maxIndex}
            className="cosmic-button absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 border border-border rounded-full p-3 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Proyecto siguiente"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Indicadores de posición */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`border-3 h-3 rounded-full transition-all duration-300 ${
                currentIndex === index
                  ? "w-8 bg-primary"
                  : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
              aria-label={`Ir a la página ${index + 1}`}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            className="cosmic-button w-fit flex items-center mx-auto gap-2"
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/ElectroCoderEC"
          >
            {t('projects.buttontxt')} <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}