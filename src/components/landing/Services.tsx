import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function Services() {
  const { t } = useTranslation();
  const services = t('services.items', { returnObjects: true }) as { title: string, description: string }[];

  return (
    <section id="services" className="py-20 bg-[#f7f5fa] dark:bg-[#18151c]">
      <div className="container mx-auto px-4 max-w-[1300px]">
        <h2 className="text-3xl font-bold text-[#2d2342] dark:text-white text-center">{t('services.title')}</h2>
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          {services.map((service, index) => (
            <Card key={index} className="bg-white dark:bg-[#221d29] border-0 dark:border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-[#2d2342] dark:text-white">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#5e548e] dark:text-[#bdb6c9]">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}