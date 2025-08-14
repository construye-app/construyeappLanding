import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface HeaderProps {
  hideNavigation?: boolean;
}

export function Header({ hideNavigation = false }: HeaderProps) {
  const { t } = useTranslation();

  return (
    <header className="bg-grey-100 sticky top-0 z-[100] w-full py-4">
      <div className="container mx-auto px-4">
        {/* Header con forma de píldora */}
        <div className="bg-blue-900 rounded-full px-8 py-4 flex items-center justify-between">
          {/* Logo a la izquierda */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-white">
              Construy<span className="text-lime-400">app</span>
            </span>
          </Link>
          
          {!hideNavigation && (
            <>
              {/* Navegación solo desktop */}
              <nav className="hidden md:flex items-center space-x-8 text-sm font-medium md:items-center md:gap-12">
                <a href="#services" className="hover:text-blue-300 text-white transition">{t('navigation.services')}</a>
                <a href="#portfolio" className="hover:text-blue-300 text-white transition">{t('navigation.portfolio')}</a>
                <a href="#about" className="hover:text-blue-300 text-white transition">{t('navigation.about')}</a>
                <a href="#contact" className="hover:text-blue-300 text-white transition">{t('navigation.contact')}</a>
              </nav>
            </>
          )}
          
          {/* CTA Cotizar Desktop - Siempre visible */}
          <div className="hidden md:flex items-center gap-2">
            <Link to="/cotizador">
              <Button className="rounded-full bg-transparent border-2 border-lime-500 text-white bg-lime-500 font-semibold px-5 py-2 text-xs shadow-none hover:bg-lime-600 hover:text-white transition hover:border-lime-600">
                {t('navigation.quote')}
              </Button>
            </Link>
          </div>
        </div>
        
        {/* CTA Cotizar Mobile - Fuera del header principal */}
        <div className="flex justify-center mt-4 md:hidden">
          <Link to="/cotizador">
            <Button className="rounded-full bg-transparent border-2 border-lime-500 text-white font-semibold bg-lime-500 px-5 py-2 text-xs shadow-none hover:bg-lime-600 hover:text-white transition">
              {t('navigation.quote')}
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}