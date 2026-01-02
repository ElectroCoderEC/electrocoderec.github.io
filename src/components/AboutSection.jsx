import { Briefcase, Code, User } from "lucide-react";
import { useTranslation } from "../hooks/useTranslation";

export const AboutSection = () => {
  const { t } = useTranslation();

  const playSound = () => {
    const audio = new Audio("/sounds/letter.wav");
    audio.currentTime = 0;
    audio.play();
  };

  const playSoundCV = () => {
    const audio = new Audio("/sounds/item.wav");
    audio.currentTime = 0;
    audio.play();
  };

  const downloadSubmit = (e) => {
    playSoundCV();
    const targetFile = t('dowloadPDF');
    window.open(targetFile, "_blank", "noopener,noreferrer");
  };
  // Esta lógica toma la traducción y separa la última palabra
  const getFormattedTitle = () => {
    const fullText = t('about.title'); // Obtenemos "Ponte en Contacto" o "Kontakt aufnehmen"
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
    <section id="about" className="py-24 px-4 relative">
      {" "}
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          {getFormattedTitle()}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">
              {t('about.carrer')}
            </h3>

            <p className="text-left text-muted-foreground">
              {t('about.description1')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
              <a
                onClick={playSound}
                href="#contact" className="cosmic-button">
                {" "}
                {t('about.btnGet')}
              </a>

              <button
                onClick={downloadSubmit}
                className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300"
              >
                {t('cv')}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">{t('about.subtitle3')}</h4>
                  <p className="text-muted-foreground">
                    {t('about.description4')}
                  </p>
                </div>
              </div>
            </div>
            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">{t('about.subtitle1')}</h4>
                  <p className="text-muted-foreground">
                    {t('about.description2')}
                  </p>
                </div>
              </div>
            </div>
            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>

                <div className="text-left">
                  <h4 className="font-semibold text-lg">{t('about.subtitle5')}</h4>
                  <p className="text-muted-foreground">
                    {t('about.description6')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
