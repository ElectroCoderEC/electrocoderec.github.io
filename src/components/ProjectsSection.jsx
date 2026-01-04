import { ArrowRight, ExternalLink, Github, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { useTranslation } from "../hooks/useTranslation";
import { cn } from "@/lib/utils";

const categoryStyles = {
  frontend: "bg-purple-500 text-white border-blue-500/20",
  backend: "bg-green-800 text-white border-green-500/20",
  tools: "bg-blue-500 text-white border-purple-500/20",
  databases: "bg-amber-500 text-white border-amber-500/20",
  pcb: "bg-red-500 text-white border-red-500/20",
  design: "bg-pink-500 text-white border-pink-500/20",
  default: "bg-secondary text-secondary-foreground border-border"
};

const skills = [
  // Frontend
  { name: "HTML/CSS", level: 95, category: "frontend" },
  { name: "JavaScript", level: 90, category: "frontend" },
  { name: "React", level: 80, category: "frontend" },
  { name: "TypeScript", level: 65, category: "frontend" },
  { name: "Tailwind CSS", level: 80, category: "frontend" },
  { name: "Angular", level: 70, category: "frontend" },
  { name: "WINCC", level: 90, category: "frontend" },
  { name: "flask", level: 90, category: "frontend" },

  // Backend
  { name: "Node.js", level: 80, category: "backend" },
  { name: "C++", level: 95, category: "backend" },
  { name: "Java", level: 80, category: "backend" },
  { name: "C#", level: 75, category: "backend" },
  { name: "Python", level: 95, category: "backend" },
  { name: "PHP", level: 80, category: "backend" },
  { name: "siemens", level: 80, category: "backend" },
  { name: "Android Studio", level: 80, category: "backend" },

  // Databases

  { name: "SQL Server", level: 80, category: "databases" },
  { name: "MongoDB", level: 70, category: "databases" },
  { name: "MySQL", level: 85, category: "databases" },
  { name: "Firebase", level: 90, category: "databases" },
  { name: "PostgreSQL", level: 70, category: "databases" },
  { name: "tensorflow", level: 70, category: "databases" },

  // Tools
  { name: "TIA Portal", level: 85, category: "tools" },
  { name: "NodeRED", level: 95, category: "tools" },
  { name: "Unity", level: 80, category: "tools" },
  { name: "Git/GitHub", level: 80, category: "tools" },
  { name: "Docker", level: 70, category: "tools" },
  { name: "Figma", level: 70, category: "tools" },
  { name: "EPLAN P8", level: 80, category: "tools" },
  { name: "Matlab", level: 85, category: "tools" },
  { name: "LabVIEW", level: 85, category: "tools" },
  { name: "Flutter", level: 85, category: "tools" },
  { name: "opencv", level: 85, category: "tools" },
  { name: "iot", level: 85, category: "tools" },
  { name: "ros2", level: 85, category: "tools" },

  // PCB Design

  { name: "KiCad", level: 80, category: "pcb" },
  { name: "Eagle", level: 90, category: "pcb" },
  { name: "Altium Designer", level: 85, category: "pcb" },
  { name: "Proteus", level: 95, category: "pcb" },
  { name: "EasyEDA", level: 90, category: "pcb" },

  // 3d Design
  { name: "SolidWorks", level: 80, category: "design" },
  { name: "Fusion 360", level: 80, category: "design" },
  { name: "Blender", level: 70, category: "design" },
  { name: "Factory IO", level: 85, category: "design" },
  { name: "Machines Simulator", level: 75, category: "design" },

];

export const ProjectsSection = () => {
  const { t } = useTranslation();
  // Al inicio de tu archivo:
  const allImages = import.meta.glob('../assets/projects/**/*.{png,jpg,jpeg,svg}', { eager: true });

  const getTagStyle = (tagName) => {
    // Buscamos en el array de skills si el tag coincide con algún nombre
    const skillMatch = skills.find(s => s.name.toLowerCase() === tagName.toLowerCase());

    // Si lo encuentra, devuelve el estilo de su categoría, si no, el default
    return skillMatch ? categoryStyles[skillMatch.category] : categoryStyles.default;
  };

  // Función para obtener imágenes de un proyecto específico
  const getGallery = (projectName) => {
    return Object.keys(allImages)
      .filter((path) => path.includes(projectName))
      .map((path) => allImages[path].default || allImages[path]);
  };

  const sliderRef = useRef(null); // Referencia al contenedor con scroll
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Estado para el carrusel principal de proyectos
  const [currentIndex, setCurrentIndex] = useState(0);
  // Estado para el Modal
  const [selectedProject, setSelectedProject] = useState(null);
  const [modalImageIndex, setModalImageIndex] = useState(0);

  const playSoundOpen = () => {
    const audio = new Audio("/sounds/open.wav");
    audio.currentTime = 0;
    audio.play();
  };
  const playSoundClose = () => {
    const audio = new Audio("/sounds/close.wav");
    audio.currentTime = 0;
    audio.play();
  };
  const playSoundItem = () => {
    const audio = new Audio("/sounds/select.wav");
    audio.currentTime = 0;
    audio.play();
  };
  const playSoundCV = () => {
    const audio = new Audio("/sounds/item.wav");
    audio.currentTime = 0;
    audio.play();
  };
  const projects = [
    {
      id: 1,
      title: t('projects.project3.title'),
      description: t('projects.project3.description'),
      image: "/projects/project3.png",
      gallery: getGallery('project3'),
      tags: ["Machines Simulator", "S7-1200", "TIA Portal"],
      demoUrl: "#",
      githubUrl: "#",
    },

    {
      id: 6,
      title: t('projects.project6.title'),
      description: t('projects.project6.description'),
      image: "/projects/project6.png",
      gallery: getGallery('project6'),
      tags: ["SIEMENS", "TIA PORTAL", "WINCC", "LOGO!"],
      demoUrl: "#",
      githubUrl: "#",
    },

    {
      id: 5,
      title: t('projects.project5.title'),
      description: t('projects.project5.description'),
      image: "/projects/project5.png",
      // AGREGA AQUÍ LAS FOTOS PARA EL CARRUSEL DEL MODAL
      gallery: getGallery('project5'),
      tags: ["Android Studio", "Flutter", "IOS", "Firebase"],
      demoUrl: "#",
      githubUrl: "#",
    },

    {
      id: 9,
      title: t('projects.project9.title'),
      description: t('projects.project9.description'),
      image: "/projects/project9.png",
      gallery: getGallery('project9'),
      tags: ["Altium Designer", "EASYEDA", "EAGLE", "KICAD"],
      demoUrl: "#",
      githubUrl: "#",
    },

    
    {
      id: 3,
      title: t('projects.project1.title'),
      description: t('projects.project1.description'),
      image: "/projects/project1.png",
      // AGREGA AQUÍ LAS FOTOS PARA EL CARRUSEL DEL MODAL
      gallery: getGallery('project1'),
      tags: ["Java", "SolidWorks", "ATmega2560", "Eagle"],
      demoUrl: "#",
      githubUrl: "#",
    },
    // ... repite la estructura para los demás items
    {
      id: 4,
      title: t('projects.project4.title'),
      description: t('projects.project4.description'),
      image: "/projects/project4.png",
      gallery: getGallery('project4'),
      tags: ["Labview", "NI DAQ 6009", "ABB", "Siemens"],
      demoUrl: "#",
      githubUrl: "#",
    },

    {
      id: 7,
      title: t('projects.project7.title'),
      description: t('projects.project7.description'),
      image: "/projects/project7.png",
      gallery: getGallery('project7'),
      tags: ["Python", "OpenCV", "TensorFlow", "Flask"],
      demoUrl: "#",
      githubUrl: "#",
    },

    {
      id: 8,
      title: t('projects.project8.title'),
      description: t('projects.project8.description'),
      image: "/projects/project8.png",
      gallery: getGallery('project8'),
      tags: ["C++", "Python", "Firebase", "RF", "IoT"],
      demoUrl: "#",
      githubUrl: "#",
    },

    {
      id: 2,
      title: t('projects.project2.title'),
      description: t('projects.project2.description'),
      image: "/projects/project2.png",
      gallery: getGallery('project2'),
      tags: ["Altium Designer", "JLCPCB", "RF"],
      demoUrl: "#",
      githubUrl: "#",
    },

    {
      id: 10,
      title: t('projects.project10.title'),
      description: t('projects.project10.description'),
      image: "/projects/projecta.png",
      gallery: getGallery('projecta'),
      tags: ["ROS2", "Solidworks", "Altium Designer"],
      demoUrl: "#",
      githubUrl: "#",
    },


  ];

  const checkScrollPosition = () => {
    const container = sliderRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;

    // 1. Detectar si podemos ir a la izquierda o derecha para los botones
    // Usamos un margen de error de 1px por temas de redondeo en pantallas retina
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);

    // 2. Calcular el índice actual para los puntos (Dots)
    // Calculamos el ancho total de una tarjeta incluyendo el gap (asumiendo gap-6 = 24px)
    // Nota: Si el ancho es variable, esto es una aproximación, pero suele funcionar bien.
    const cardWidth = clientWidth / itemsPerView;
    const newIndex = Math.round(scrollLeft / cardWidth);

    setCurrentIndex(newIndex);
  };

  // --- LÓGICA DEL CARRUSEL PRINCIPAL ---
  const getItemsPerView = () => {
    if (typeof window === 'undefined') return 3;
    if (window.innerWidth < 768) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  };

  const [itemsPerView, setItemsPerView] = useState(getItemsPerView());
  const totalPages = Math.ceil(projects.length / itemsPerView);
  const maxIndex = Math.max(0, projects.length - itemsPerView);

  // useEffect para verificar la posición inicial al cargar o cambiar tamaño
  useEffect(() => {
    checkScrollPosition();
    window.addEventListener('resize', checkScrollPosition);
    return () => window.removeEventListener('resize', checkScrollPosition);
  }, [itemsPerView]);


  const scrollContainer = (direction) => {
    playSoundItem();
    const container = sliderRef.current;
    if (!container) return;

    // Calculamos cuánto mover: Ancho del contenedor / items visibles = Ancho de 1 tarjeta
    const scrollAmount = container.clientWidth / itemsPerView;

    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });

    // Nota: No hace falta setear el Index aquí manualmente, 
    // el evento 'onScroll' del div lo hará por nosotros.
  };

  useEffect(() => {
    const handleResize = () => {
      setItemsPerView(getItemsPerView());
      // Ajustamos el índice si al redimensionar nos pasamos del límite
      setCurrentIndex(prev => Math.min(prev, Math.max(0, projects.length - getItemsPerView())));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    playSoundItem();
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    playSoundItem();
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  // --- LÓGICA DEL MODAL ---

  const openModal = (project) => {
    playSoundOpen();
    setSelectedProject(project);
    setModalImageIndex(0);
    // Opcional: Bloquear el scroll del body
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    playSoundClose();
    setSelectedProject(null);
    setModalImageIndex(0);
    // Restaurar el scroll del body
    document.body.style.overflow = 'auto';
  };

  const nextModalImage = (e) => {
    playSoundItem();
    e.stopPropagation(); // Evitar cerrar el modal al hacer click en flecha
    if (!selectedProject) return;
    setModalImageIndex((prev) =>
      prev === selectedProject.gallery.length - 1 ? 0 : prev + 1
    );
  };

  const prevModalImage = (e) => {
    playSoundItem();
    e.stopPropagation();
    if (!selectedProject) return;
    setModalImageIndex((prev) =>
      prev === 0 ? selectedProject.gallery.length - 1 : prev - 1
    );
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
          <button
            onClick={() => scrollContainer('left')}
            disabled={!canScrollLeft}
            className={`
              cosmic-button
              absolute -left-5 top-1/2 -translate-y-1/2 z-10
              rounded-full p-3 transition-all duration-300 ease-out
              
              ${canScrollLeft ? "opacity-100 scale-100 pointer-events-auto animate-heartbeat " : "opacity-0 scale-75 pointer-events-none"}
            `}
            aria-label="Proyecto anterior"
          >
            <ChevronLeft size={24} />
          </button>

          <div
            ref={sliderRef} // <--- Conectamos la referencia
            onScroll={checkScrollPosition} // <--- Escuchamos el movimiento
            className="overflow-x-auto overflow-y-hidden scroll-smooth snap-x snap-mandatory" // pb-4 para dar espacio si hay scrollbar visible
            style={{ scrollbarWidth: 'none' }}
          >
            <div
              className="flex transition-transform duration-500 ease-out gap-6 "
              style={{

              }}
            >
              {projects.map((project, key) => (
                <div
                  key={key}
                  className="flex-shrink-0 w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1rem)]"
                >
                  <div className="group bg-card rounded-lg overflow-hidden shadow-xs card-hover h-full flex flex-col">
                    {/* Imagen Principal - Al hacer click abre el modal */}
                    <div
                      className="h-48 overflow-hidden cursor-pointer relative"
                      onClick={() => openModal(project)}
                    >
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors z-10 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <span className="text-white bg-black/50 px-3 py-1 rounded-full text-xs backdrop-blur-sm">{t('projects.txtproject')}</span>
                      </div>
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 "
                      />
                    </div>

                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag, index) => (
                          <span
                            key={index}
                            className={cn(
                              "px-2 py-1 text-[10px] font-bold uppercase tracking-wider border rounded-md transition-colors",
                              getTagStyle(tag) // <--- Aquí aplicamos el estilo dinámico
                            )}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <h3 className="text-xl font-semibold mb-1">{project.title}</h3>
                      <p className="text-muted-foreground text-sm mb-4 flex-grow">
                        {project.description}
                      </p>
                      <div className="flex justify-between items-center mt-auto">
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

          <button
            onClick={() => scrollContainer('right')}
            disabled={!canScrollRight}

            className={`
              cosmic-button absolute -right-3 top-1/2 -translate-y-1/2 translate-x-4 z-10 border border-border rounded-full p-3 transition-all duration-300 
              easy-out
              ${canScrollRight ? "opacity-100 scale-100 pointer-events-auto animate-heartbeat" : "opacity-0 scale-75 pointer-events-none"}
            `}

            aria-label="Proyecto siguiente"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Indicadores */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: Math.max(1, projects.length - itemsPerView + 1) }).map((_, index) => (
            // Opcional: Si el número de items es menor que los visibles, no mostramos puntos

            <button

              key={index}
              onClick={() => {
                playSoundItem();
                // Al hacer click en un punto, forzamos el scroll a esa posición
                if (sliderRef.current) {
                  const cardWidth = sliderRef.current.clientWidth / itemsPerView;
                  sliderRef.current.scrollTo({
                    left: index * cardWidth, // + (index * 24) si el cálculo del gap es estricto
                    behavior: 'smooth'
                  });
                }
              }}
              className={`border-3 h-3 rounded-full transition-all duration-300 ${currentIndex === index
                ? "w-8 bg-primary"
                : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
              aria-label={`Ir a la página ${index + 1}`}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            onClick={playSoundCV}
            className="cosmic-button w-fit flex items-center mx-auto gap-2"
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/ElectroCoderEC"
          >
            {t('projects.buttontxt')} <ArrowRight size={16} />
          </a>
        </div>
      </div>

      {/* --- MODAL / LIGHTBOX --- */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 transition-opacity duration-300"
          onClick={closeModal} // Click fuera cierra el modal
        >
          {/* Botón Cerrar (Arriba derecha) */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all z-50"
          >
            <X size={32} />
          </button>

          <div
            className="relative w-full max-w-5xl max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()} // Click dentro NO cierra el modal
          >
            {/* Imagen del Carrusel Modal */}
            <div className="relative w-full aspect-video md:aspect-auto md:h-[70vh] rounded-lg overflow-hidden bg-black/50 flex items-center justify-center">
              <img
                src={selectedProject.gallery[modalImageIndex] || selectedProject.image}
                alt={`${selectedProject.title} view ${modalImageIndex + 1}`}
                className="max-w-full max-h-full object-contain"
              />

              {/* Controles del Carrusel Modal */}
              {selectedProject.gallery.length > 1 && (
                <>
                  <button
                    onClick={prevModalImage}
                    className="cosmic-button absolute left-2 md:left-4 top-1/2 -translate-y-1/2   p-2 rounded-full transition-all"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={nextModalImage}
                    className="cosmic-button absolute right-2 md:right-4 top-1/2 -translate-y-1/2  p-2 rounded-full transition-all"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}
            </div>

            {/* Texto informativo del modal */}
            <div className="mt-4 text-center text-white">
              <h3 className="text-xl font-bold">{selectedProject.title}</h3>
              {selectedProject.gallery.length > 1 && (
                <p className="text-sm text-white/60 mt-1">

                  {t('projects.stateImage')
                    .replace('{current}', modalImageIndex + 1)
                    .replace('{total}', selectedProject.gallery.length)
                  }

                </p>
              )}
            </div>

            {/* Miniaturas (opcional, para navegación rápida) */}
            {selectedProject.gallery.length > 1 && (
              <div className="flex gap-2 mt-4 overflow-x-auto max-w-full p-2">
                {selectedProject.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => { playSoundItem(); setModalImageIndex(idx); }}
                    className={`w-16 h-16 rounded overflow-hidden border-2 flex-shrink-0 transition-all ${modalImageIndex === idx ? 'border-primary opacity-100' : 'border-transparent opacity-50 hover:opacity-100'
                      }`}
                  >
                    <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

    </section>
  );
};