import { ArrowRight, ExternalLink, Github } from "lucide-react";
import { useTranslation } from "../hooks/useTranslation";





export const ProjectsSection = () => {
  
  const { t } = useTranslation();


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
    tags: ["Altium", "JLCPCB",],
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
];



   // Esta lógica toma la traducción y separa la última palabra
  const getFormattedTitle = () => {
    const fullText = t('projects.title'); // Obtenemos "Ponte en Contacto" o "Kontakt aufnehmen"
    const words = fullText.split(" "); // Lo dividimos por espacios
    
    if (words.length <= 1) return fullText; // Si solo hay una palabra, no hace nada

    const lastWord = words.pop(); // Extrae la última palabra: "Contacto"
    const restOfText = words.join(" "); // Une el resto: "Ponte en"

    return (
      <>
        {restOfText} <span className="text-primary">{lastWord}</span>
      </>
    );
  };

  
  return (
    <section id="projects" className="py-24 px-4 relative">

      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
           {getFormattedTitle()}
        </h2>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
           {t('projects.description')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, key) => (
            <div
              key={key}
              className="group bg-card rounded-lg overflow-hidden shadow-xs card-hover"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag,index) => (
                    <span key={index} className="px-2 py-1 text-xs font-medium border rounded-full bg-secondary text-secondary-foreground">
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl font-semibold mb-1"> {project.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {project.description}
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-3">
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      className="text-foreground/80 hover:text-primary transition-colors duration-300"
                    >
                      <ExternalLink size={20} />
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      className="text-foreground/80 hover:text-primary transition-colors duration-300"
                    >
                      <Github size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            className="cosmic-button w-fit flex items-center mx-auto gap-2"
            target="_blank"
            href="https://github.com/ElectroCoderEC"
          >
            {t('projects.buttontxt')} <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};