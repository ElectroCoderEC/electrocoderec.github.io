import { ArrowRight, ExternalLink, Github, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useTranslation } from "../hooks/useTranslation";


export const ProjectsSection = () => {
  const { t } = useTranslation();

  // Al inicio de tu archivo:
const allImages = import.meta.glob('../assets/projects/**/*.{png,jpg,jpeg,svg}', { eager: true });

// Función para obtener imágenes de un proyecto específico
const getGallery = (projectName) => {
  return Object.keys(allImages)
    .filter((path) => path.includes(projectName))
    .map((path) => allImages[path].default || allImages[path]);
};


  
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
      title: t('projects.project1.title'),
      description: t('projects.project1.description'),
      image: "/projects/project1.png",
      // AGREGA AQUÍ LAS FOTOS PARA EL CARRUSEL DEL MODAL
      gallery: getGallery('project1'),
      tags: ["ATmega2560", "SolidWorks", "Eagle PCB"],
      demoUrl: "#",
      githubUrl: "#",
    },
    {
      id: 2,
      title: t('projects.project2.title'),
      description: t('projects.project2.description'),
      image: "/projects/project2.png",
      gallery: getGallery('project2'),
      tags: ["Altium", "JLCPCB"],
      demoUrl: "#",
      githubUrl: "#",
    },
    {
      id: 3,
      title: t('projects.project3.title'),
      description: t('projects.project3.description'),
      image: "/projects/project3.png",
      gallery: getGallery('project3'),
      tags: ["Machines Simulator", "TIA Portal"],
      demoUrl: "#",
      githubUrl: "#",
    },
    // ... repite la estructura para los demás items
    {
      id: 4,
      title: t('projects.project1.title'),
      description: t('projects.project1.description'),
      image: "/projects/project1.png",
      gallery: ["/projects/project1.png"],
      tags: ["ATmega2560", "SolidWorks", "Eagle PCB"],
      demoUrl: "#",
      githubUrl: "#",
    },
    {
      id: 5,
      title: t('projects.project2.title'),
      description: t('projects.project2.description'),
      image: "/projects/project2.png",
      gallery: ["/projects/project2.png"],
      tags: ["Altium", "JLCPCB"],
      demoUrl: "#",
      githubUrl: "#",
    },
   
  ];

  // --- LÓGICA DEL CARRUSEL PRINCIPAL ---
  const getItemsPerView = () => {
    if (typeof window === 'undefined') return 3;
    if (window.innerWidth < 768) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  };

  const [itemsPerView, setItemsPerView] = useState(getItemsPerView());
  const totalPages = Math.ceil(projects.length / itemsPerView);
  const maxIndex = totalPages - 1;

  useEffect(() => {
    const handleResize = () => {
      setItemsPerView(getItemsPerView());
      setCurrentIndex(0);
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
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className="cosmic-button absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 rounded-full p-3 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Proyecto anterior"
          >
            <ChevronLeft size={24} />
          </button>

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
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>

                    <div className="p-6 flex flex-col flex-grow">
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
            onClick={nextSlide}
            disabled={currentIndex >= maxIndex}
            className="cosmic-button absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 border border-border rounded-full p-3 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Proyecto siguiente"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Indicadores */}
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
                     onClick={() => setModalImageIndex(idx)}
                     className={`w-16 h-16 rounded overflow-hidden border-2 flex-shrink-0 transition-all ${
                       modalImageIndex === idx ? 'border-primary opacity-100' : 'border-transparent opacity-50 hover:opacity-100'
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