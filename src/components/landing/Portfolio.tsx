import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function Portfolio() {
  const { t } = useTranslation();
  const portfolioItems = t('portfolio.items', { returnObjects: true }) as { title: string, description: string, link: string }[];

  return (
    <section
      id="portfolio"
      className="py-20 bg-[#18151c] dark:bg-[#18151c] bg-[#f7f5fa]"
    >
      <div className="container mx-auto px-4 max-w-[1300px]">
        <h2 className="text-3xl font-bold text-blue-900 dark:text-white text-[#2d2342] text-center">
          {t('portfolio.title')}
        </h2>
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          {portfolioItems.map((item, index) => (
            <Card
              key={index}
              className="bg-[#221d29] dark:bg-[#221d29] bg-white border-0 dark:border-0 shadow-md"
            >
              <CardHeader>
                <CardTitle className="text-white dark:text-white text-[#2d2342]">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <img
                  src={`/placeholder.svg`}
                  alt={item.title}
                  className="w-full h-48 object-cover mb-4 rounded-lg bg-[#ede7f6] dark:bg-transparent"
                />
                <p className="text-[#bdb6c9] dark:text-[#bdb6c9] text-[#5e548e]">
                  {item.description}
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  variant="link"
                  className="text-[#b39ddb] dark:text-[#b39ddb] text-[#7c4dff]"
                >
                  {item.link}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}