import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface HeaderProps {
  hideNavigation?: boolean;
}

export function Header({ hideNavigation = false }: HeaderProps) {
  const { t } = useTranslation();

  return (
    <header className="bg-blue-900 border-b border-gray-800 sticky top-0 z-30 w-full">
      <div className="container mx-auto px-4 py-5 flex items-center justify-between p-3 min-h-14">
        {/* Logo a la izquierda */}
        <Link to="/" className="flex items-center">
          <img 
            src="/images/construyapp.svg" 
            alt="Construye App" 
            className="h-10 w-auto"
          />
        </Link>
        {/* CTA Cotizar - Siempre visible */}
        <Link to="/cotizador" className="block md:hidden">
          <Button className="rounded-full bg-green-500 text-white font-semibold px-5 py-2 text-xs shadow-none hover:bg-green-400 transition mx-2 my-1">
            {t('navigation.quote')}
          </Button>
        </Link>
        
        {!hideNavigation && (
          <>
            {/* Navegación solo desktop */}
            <nav className="hidden md:flex items-center space-x-8 text-sm font-medium md:items-center md:gap-12">
              <a href="#services" className="hover:text-blue-600 text-white transition">{t('navigation.services')}</a>
              <a href="#portfolio" className="hover:text-blue-600 text-white transition">{t('navigation.portfolio')}</a>
              <a href="#about" className="hover:text-blue-600 text-white transition">{t('navigation.about')}</a>
              <a href="#contact" className="hover:text-blue-600 text-white transition">{t('navigation.contact')}</a>
            </nav>
          </>
        )}
        
        {/* CTA Cotizar Desktop - Siempre visible */}
        <div className="hidden md:flex items-center gap-2">
          <Link to="/cotizador">
            <Button className="rounded-full bg-green-500 text-white font-semibold px-5 py-2 text-xs shadow-none hover:bg-green-400 transition">
              {t('navigation.quote')}
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}