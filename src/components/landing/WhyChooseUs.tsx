import { useTranslation } from 'react-i18next';
import { TailGridsImageCard } from '../ui/TailGridsImageCard';

export function WhyChooseUs() {
  const { t } = useTranslation();
  const reasons = t('whyChooseUs.items', { returnObjects: true }) as { title: string, description: string, image?: string }[];
  // Puedes personalizar las imágenes aquí o desde el archivo de traducción
  const images = [
    '/images/equipodetrabajo.jpg',
    '/images/metodologiaAgil.jpg',
    '/images/clientesdev.jpg',
  ];

  return (
    <section id="about" className="py-20 bg-[#f7f5fa] dark:bg-[#18151c]">
      <div className="container mx-auto px-4 max-w-[1300px]">
        <h2 className="text-3xl font-bold text-[#2d2342] dark:text-white text-center">{t('whyChooseUs.title')}</h2>
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          {reasons.map((reason, index) => (
            <TailGridsImageCard
              key={index}
              image={reason.image || images[index % images.length]}
              title={reason.title}
              description={reason.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}