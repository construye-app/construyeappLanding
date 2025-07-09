import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function Testimonials() {
  const { t } = useTranslation();
  const testimonials = t('testimonials.items', { returnObjects: true }) as { name: string, title: string, quote: string }[];

  return (
    <section className="py-20 bg-[#f7f5fa] dark:bg-[#18151c]">
      <div className="container mx-auto px-4 max-w-[1300px]">
        <h2 className="text-3xl font-bold text-[#2d2342] dark:text-white text-center">{t('testimonials.title')}</h2>
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white dark:bg-[#221d29] border-0 dark:border-0 shadow-md">
              <CardHeader className="flex flex-row items-center space-x-4">
                <Avatar>
                  <AvatarImage src={`/placeholder-user.jpg`} alt={testimonial.name} />
                  <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-[#2d2342] dark:text-white">{testimonial.name}</CardTitle>
                  <p className="text-sm text-[#5e548e] dark:text-[#bdb6c9]">{testimonial.title}</p>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-[#5e548e] dark:text-[#bdb6c9]">{testimonial.quote}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}