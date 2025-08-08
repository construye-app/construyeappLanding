import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronRight, Home, Globe2 } from 'lucide-react';
import { ThemeProvider } from '@/components/theme-provider';
import { Header } from '@/components/landing/Header';
import { Footer } from '@/components/landing/Footer';
import { WhatsAppFloat } from '@/components/WhatsAppFloat';

interface PortfolioItem {
  title: string;
  description: string;
  link?: string;
  image?: string;
  technologies?: string[];
  client?: string;
  category?: string;
}

export default function Portfolio() {
  const { t, i18n } = useTranslation();
  const portfolioItems = t('portfolio.items', { returnObjects: true }) as PortfolioItem[];
  const isSpanish = i18n.language === 'es';
  const [languageTabOpen, setLanguageTabOpen] = useState(false);

  // Proyectos adicionales para la página completa
  const additionalProjects: PortfolioItem[] = [
    {
      title: isSpanish ? 'Láctea S.A. - Portal Corporativo' : 'Láctea S.A. - Corporate Portal',
      description: isSpanish
        ? 'Desarrollo del sitio web corporativo para Láctea S.A., primer laboratorio de biotecnología reproductiva en Perú. Plataforma que presenta sus servicios de producción in-vitro en bovinos, red de distribuidores y sistema de contacto integrado.'
        : 'Development of the corporate website for Láctea S.A., Peru\'s first reproductive biotechnology laboratory. Platform showcasing their in-vitro production services for cattle, distributor network and integrated contact system.',
      image: '/images/lactea.png',
      technologies: ['WordPress', 'PHP', 'MySQL', 'JavaScript', 'CSS'],
      client: 'Láctea S.A.',
      category: isSpanish ? 'Sitio Web Corporativo' : 'Corporate Website'
    },
    {
      title: isSpanish ? 'Gollo - Sistema de Inventario' : 'Gollo - Inventory System',
      description: isSpanish 
        ? 'Sistema personalizado de gestión de inventario para Gollo. Desarrollo de módulos para control de stock, reportes en tiempo real y sincronización con puntos de venta.'
        : 'Custom inventory management system for Gollo. Development of modules for stock control, real-time reporting and POS synchronization.',
      image: '/images/gollo.webp',
      technologies: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap'],
      client: 'Gollo',
      category: isSpanish ? 'Sistema de Gestión' : 'Management System'
    },
    {
      title: isSpanish ? 'Artefacta - Portal Web' : 'Artefacta - Web Portal',
      description: isSpanish
        ? 'Desarrollo del portal web corporativo para Artefacta. Plataforma moderna con diseño responsivo, catálogo de productos y sistema de contacto integrado.'
        : 'Development of corporate web portal for Artefacta. Modern platform with responsive design, product catalog and integrated contact system.',
      image: '/images/ArtefactaLogoHeader.webp',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
      client: 'Artefacta',
      category: isSpanish ? 'Portal Web' : 'Web Portal'
    },
    {
      title: isSpanish ? 'Sembryo - E-commerce Agrícola' : 'Sembryo - Agricultural E-commerce',
      description: isSpanish
        ? 'Plataforma de e-commerce especializada en productos agrícolas para Sembryo. Incluye catálogo especializado, sistema de pedidos y gestión de distribución.'
        : 'Specialized e-commerce platform for agricultural products for Sembryo. Includes specialized catalog, ordering system and distribution management.',
      image: '/images/sembryo.png',
      technologies: ['WooCommerce', 'WordPress', 'PHP', 'MySQL'],
      client: 'Sembryo',
      category: 'E-commerce'
    },
    {
      title: isSpanish ? 'Yukkazo - App Móvil' : 'Yukkazo - Mobile App',
      description: isSpanish
        ? 'Aplicación móvil nativa para Yukkazo con funcionalidades de geolocalización, notificaciones push y sincronización en tiempo real.'
        : 'Native mobile application for Yukkazo with geolocation features, push notifications and real-time synchronization.',
      image: '/images/yukkazo.png',
      technologies: ['React Native', 'Firebase', 'Node.js', 'MongoDB'],
      client: 'Yukkazo',
      category: isSpanish ? 'Aplicación Móvil' : 'Mobile App'
    },
    {
      title: isSpanish ? 'Sofos - Sistema Educativo' : 'Sofos - Educational System',
      description: isSpanish
        ? 'Plataforma educativa integral para Sofos con gestión de cursos, evaluaciones en línea, seguimiento de estudiantes y reportes académicos.'
        : 'Comprehensive educational platform for Sofos with course management, online assessments, student tracking and academic reports.',
      image: '/images/sofos.png',
      technologies: ['Laravel', 'Vue.js', 'MySQL', 'Redis'],
      client: 'Sofos',
      category: isSpanish ? 'Plataforma Educativa' : 'Educational Platform'
    }
  ];

  const allProjects = [...portfolioItems, ...additionalProjects];

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-[#f7f5fa] font-sans antialiased">
        <Header hideNavigation={true} />
        <main className="py-10 bg-[#f7f5fa]">
          <div className="container mx-auto px-4 max-w-[1300px]">
            {/* Migaja de pan mejorada - Solo en desktop */}
            <nav className="hidden md:flex items-center space-x-2 text-sm mb-8">
              <Link 
                to="/" 
                className="flex items-center text-[#6b7280] hover:text-blue-900 transition-colors duration-200"
              >
                <Home className="h-4 w-4 mr-1" />
                {isSpanish ? 'Inicio' : 'Home'}
              </Link>
              <ChevronRight className="h-4 w-4 text-[#d1d5db]" />
              <span className="text-blue-900 font-medium">
                {t('portfolio.title')}
              </span>
            </nav>

            {/* Header de la página */}
            <div className="mb-12">
              {/* Botón Volver - Solo en móvil */}
              <div className="flex items-center mb-4 md:hidden">
                <Link to="/">
                  <Button variant="ghost" size="sm" className="mr-4 text-[#6b7280] hover:text-blue-900 transition-colors duration-200">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    {isSpanish ? 'Volver' : 'Back'}
                  </Button>
                </Link>
              </div>
              <div className="text-center">
                <span className="inline-block text-sm font-semibold text-blue-900 bg-blue-50 px-3 py-1 rounded-full mb-4">
                  {isSpanish ? 'Nuestros Trabajos' : 'Our Work'}
                </span>
                <h1 className="text-5xl font-extrabold text-[#18181b] mb-4">
                  {t('portfolio.title')}
                </h1>
                <p className="text-lg text-[#6b7280] max-w-2xl mx-auto">
                  {isSpanish 
                    ? 'Explora nuestra colección completa de proyectos y descubre las soluciones innovadoras que hemos desarrollado para empresas de diversos sectores.'
                    : 'Explore our complete collection of projects and discover the innovative solutions we have developed for companies across various sectors.'}
                </p>
              </div>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {allProjects.map((item, index) => (
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
                      <div className="flex flex-wrap gap-2">
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
                </Card>
              ))}
            </div>
          </div>
        </main>
        <Footer />
        <WhatsAppFloat />
        
        {/* Selector de idioma flotante - Solo móvil */}
        <div className="fixed left-0 right-0 bottom-0 z-50 md:hidden">
          {/* Contenido del tab de idioma */}
          <div className="pointer-events-none">
            <div
              className={`fixed left-0 right-0 bottom-14 px-0 pb-2 z-40 w-full pointer-events-auto bg-white shadow-2xl rounded-t-2xl transition-all duration-300 ease-in-out
                ${languageTabOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0 scale-95'}`}
              style={{
                minHeight: languageTabOpen ? undefined : 0,
                maxHeight: '70vh',
                overflowY: 'auto',
                height: languageTabOpen ? 'auto' : 0
              }}
            >
              <div className="p-4">
                {languageTabOpen && (
                  <div className="flex flex-col items-center gap-4 py-4">
                    <span className="text-base font-semibold mb-2">
                      {isSpanish ? 'Idioma' : 'Language'}
                    </span>
                    <div className="flex gap-4">
                      <button
                        className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 transition font-semibold text-sm ${
                          i18n.language === 'es' 
                            ? 'bg-blue-900 text-white border-blue-900' 
                            : 'bg-white text-blue-900 border-blue-900'
                        }`}
                        onClick={() => { 
                          setLanguageTabOpen(false); 
                          i18n.changeLanguage('es'); 
                        }}
                      >
                        <img src="/images/es-flag.svg" alt="Español" className="w-5 h-5" />
                        ES
                      </button>
                      <button
                        className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 transition font-semibold text-sm ${
                          i18n.language === 'en' 
                            ? 'bg-blue-900 text-white border-blue-900' 
                            : 'bg-white text-blue-900 border-blue-900'
                        }`}
                        onClick={() => { 
                          setLanguageTabOpen(false); 
                          i18n.changeLanguage('en'); 
                        }}
                      >
                        <img src="/images/us-flag.svg" alt="English" className="w-5 h-5" />
                        EN
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Botón flotante de idioma */}
          <div className="flex w-full bg-blue-900 text-white border-t border-blue-900 rounded-none shadow-lg z-50">
            <button
              className={`w-full flex flex-col items-center justify-center py-2 text-xs font-semibold transition-colors focus:outline-none ${
                languageTabOpen ? 'text-[#26dcb4]' : 'text-white/80'
              }`}
              onClick={() => setLanguageTabOpen(!languageTabOpen)}
              type="button"
              style={{ minHeight: 56 }}
            >
              <span className="flex items-center justify-center mb-1">
                <Globe2 className="w-5 h-5" />
              </span>
              {isSpanish ? 'Idioma' : 'Language'}
            </button>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
