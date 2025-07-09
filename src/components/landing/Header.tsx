import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../theme-provider';

export function Header() {
  const { t, i18n } = useTranslation();
  const { theme, setTheme } = useTheme();

  return (
    <header className="bg-[#18151c] border-b border-[#28232e] sticky top-0 z-30 md:sticky md:top-0 md:z-30">
      <div className="container mx-auto px-4 flex items-center justify-between p-2 min-h-12">
        {/* Logo y nombre alineados a la izquierda */}
        <div className="flex items-center space-x-2">
          <span className="text-lg text-white">✦</span>
          <span className="font-bold text-base text-white">Construye</span>
        </div>
        {/* Navegación centrada */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
          <a href="#services" className="hover:underline text-white">{t('navigation.services')}</a>
          <a href="#portfolio" className="hover:underline text-white">{t('navigation.portfolio')}</a>
          <a href="#about" className="hover:underline text-white">{t('navigation.about')}</a>
          <a href="#contact" className="hover:underline text-white">{t('navigation.contact')}</a>
        </nav>
        {/* Botones a la derecha */}
        <div className="flex items-center gap-2">
          {/* Botón idioma español */}
          <Button
            variant={i18n.language === 'es' ? 'default' : 'outline'}
            className={`rounded-full px-3 py-1 text-xs font-semibold ${i18n.language === 'es' ? 'bg-[#e2d9f7] text-black' : 'text-white border-[#e2d9f7]'} transition`}
            onClick={() => i18n.changeLanguage('es')}
          >
            ES
          </Button>
          {/* Botón idioma inglés */}
          <Button
            variant={i18n.language === 'en' ? 'default' : 'outline'}
            className={`rounded-full px-3 py-1 text-xs font-semibold ${i18n.language === 'en' ? 'bg-[#e2d9f7] text-black' : 'text-white border-[#e2d9f7]'} transition`}
            onClick={() => i18n.changeLanguage('en')}
          >
            EN
          </Button>
          {/* Botón dark/light mode */}
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle theme"
            className="text-white hover:bg-[#28232e]"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          {/* Botón de cotización */}
          <Button className="rounded-full bg-[#e2d9f7] text-black font-semibold px-5 py-2 text-xs shadow-none hover:bg-[#cfc2e9] transition hidden md:block">
            {t('navigation.quote')}
          </Button>
        </div>
      </div>
    </header>
  );
}