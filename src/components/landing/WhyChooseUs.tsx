import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Zap, Heart } from 'lucide-react';

const icons = [<Users key="1"/>, <Zap key="2"/>, <Heart key="3"/>];

export function WhyChooseUs() {
  const { t } = useTranslation();
  const reasons = t('whyChooseUs.items', { returnObjects: true }) as { title: string, description: string }[];

  return (
    <section id="about" className="py-20 bg-[#f7f5fa] dark:bg-[#18151c]">
      <div className="container mx-auto px-4 max-w-[1300px]">
        <h2 className="text-3xl font-bold text-[#2d2342] dark:text-white text-center">{t('whyChooseUs.title')}</h2>
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          {reasons.map((reason, index) => (
            <Card key={index} className="bg-white dark:bg-[#221d29] border-0 dark:border-0 shadow-md">
              <CardHeader className="flex flex-row items-center space-x-4">
                {icons[index]}
                <CardTitle className="text-[#2d2342] dark:text-white">{reason.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#5e548e] dark:text-[#bdb6c9]">{reason.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}