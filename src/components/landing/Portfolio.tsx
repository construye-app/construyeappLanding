import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

interface PortfolioItem {
  title: string;
  description: string;
  link: string;
  image?: string;
  technologies?: string[];
  client?: string;
  category?: string;
}

export function Portfolio() {
  const { t, i18n } = useTranslation();
  const portfolioItems = t('portfolio.items', { returnObjects: true }) as PortfolioItem[];
  const isSpanish = i18n.language === 'es';

  return (
    <section
      id="portfolio"
      className="py-20 bg-[#f7f5fa]"
    >
      <div className="container mx-auto px-4 max-w-[1300px]">
        <div className="text-center mb-8">
          <span className="block text-sm font-semibold text-blue-900 mb-2">
            {isSpanish ? 'Nuestros Trabajos' : 'Our Work'}
          </span>
          <h2 className="text-4xl font-extrabold text-[#18181b] mb-3">
            {t('portfolio.title')}
          </h2>
          <p className="text-base text-[#6b7280] max-w-xl mx-auto">
            {isSpanish 
              ? 'Descubre algunos de nuestros proyectos más destacados y las soluciones innovadoras que hemos desarrollado para nuestros clientes.'
              : 'Discover some of our most outstanding projects and the innovative solutions we have developed for our clients.'}
          </p>
        </div>
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          {portfolioItems.map((item, index) => (
            <Card
              key={index}
              className="bg-white border border-[#e5e7eb] shadow-md rounded-2xl hover:shadow-lg transition-all duration-300"
            >
              <CardHeader>
                <CardTitle className="text-[#18181b] text-lg font-semibold">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative mb-4">
                  <div className="w-full h-48 bg-[#ede7f6] rounded-lg overflow-hidden flex items-center justify-center">
                    <img
                      src={item.image || `/placeholder.svg`}
                      alt={item.title}
                      className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                      style={{ maxWidth: '80%', maxHeight: '80%' }}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/placeholder.svg';
                      }}
                    />
                  </div>
                  {item.category && (
                    <Badge 
                      variant="secondary" 
                      className="absolute top-2 right-2 bg-blue-900 text-white text-xs font-semibold px-3 py-1 rounded-full"
                    >
                      {item.category}
                    </Badge>
                  )}
                </div>
                {item.client && (
                  <p className="text-sm font-semibold text-blue-900 mb-2">
                    {t('portfolio.client')} {item.client}
                  </p>
                )}
                <p className="text-[#6b7280] text-sm mb-4">
                  {item.description}
                </p>
                {item.technologies && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.technologies.map((tech, techIndex) => (
                                              <Badge 
                          key={techIndex} 
                          variant="outline" 
                          className="text-xs border-blue-900 text-blue-900 bg-blue-50"
                        >
                          {tech}
                        </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
              {item.link && (
                <CardFooter>
                  <Button
                    variant="link"
                    className="text-[#b39ddb] dark:text-[#b39ddb] text-[#7c4dff]"
                  >
                    {item.link}
                  </Button>
                </CardFooter>
              )}
            </Card>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link to="/portfolio">
            <Button 
              size="lg"
              className="bg-blue-900 text-white hover:bg-blue-800 rounded-lg font-semibold px-8 py-3 shadow-md transition-all duration-300"
            >
              {t('portfolio.viewMore')}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}