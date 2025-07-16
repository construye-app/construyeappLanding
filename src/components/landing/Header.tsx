import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';

export function Header() {
  const { t, i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-blue-900 border-b border-gray-800 sticky top-0 z-30 w-full">
      <div className="container mx-auto px-4 flex items-center justify-between p-2 min-h-12">
        {/* Logo y nombre alineados a la izquierda */}
        <div className="flex items-center space-x-2">
          <span className="text-lg text-yellow-500">✦</span>
          <span className="font-bold text-base text-white">Construye</span>
        </div>
        {/* Hamburguesa móvil */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 text-white focus:outline-none"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Abrir menú"
        >
          <span className={`block w-6 h-0.5 bg-white mb-1 transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-white mb-1 transition-all ${menuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-white transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
        {/* Navegación centrada desktop */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium md:items-center md:gap-12">
          <a href="#services" className="hover:text-blue-600 text-white transition">{t('navigation.services')}</a>
          <a href="#portfolio" className="hover:text-blue-600 text-white transition">{t('navigation.portfolio')}</a>
          <a href="#about" className="hover:text-blue-600 text-white transition">{t('navigation.about')}</a>
          <a href="#contact" className="hover:text-blue-600 text-white transition">{t('navigation.contact')}</a>
        </nav>
        {/* Botones a la derecha */}
        <div className="flex items-center gap-2">
          {/* Botón idioma español */}
          <Button
            variant={i18n.language === 'es' ? 'default' : 'outline'}
            className={`rounded-full px-3 py-1 text-xs font-semibold ${i18n.language === 'es' ? 'bg-blue-900 text-white' : 'hover:bg-blue-800 text-blue-900 border-blue-900 bg-white'} transition`}
            onClick={() => i18n.changeLanguage('es')}
          >
            ES
          </Button>
          {/* Botón idioma inglés */}
          <Button
            variant={i18n.language === 'en' ? 'default' : 'outline'}
            className={`rounded-full px-3 py-1 text-xs font-semibold ${i18n.language === 'en' ? 'bg-blue-900 text-white' : 'hover:bg-blue-800 text-blue-900 border-blue-900 bg-white'} transition`}
            onClick={() => i18n.changeLanguage('en')}
          >
            EN
          </Button>
          {/* Botón de cotización */}
          <Link to="/cotizador">
            <Button className="rounded-full bg-green-500 text-white font-semibold px-5 py-2 text-xs shadow-none hover:bg-green-400 transition hidden md:block">
              {t('navigation.quote')}
            </Button>
          </Link>
        </div>
      </div>
      {/* Menú móvil desplegable */}
      {menuOpen && (
        <nav className="md:hidden bg-blue-900 border-t border-blue-800 px-4 pb-4 pt-2 flex flex-col gap-3 animate-fade-in">
          <a href="#services" className="text-white py-2 px-2 rounded hover:bg-blue-800 transition" onClick={() => setMenuOpen(false)}>{t('navigation.services')}</a>
          <a href="#portfolio" className="text-white py-2 px-2 rounded hover:bg-blue-800 transition" onClick={() => setMenuOpen(false)}>{t('navigation.portfolio')}</a>
          <a href="#about" className="text-white py-2 px-2 rounded hover:bg-blue-800 transition" onClick={() => setMenuOpen(false)}>{t('navigation.about')}</a>
          <a href="#contact" className="text-white py-2 px-2 rounded hover:bg-blue-800 transition" onClick={() => setMenuOpen(false)}>{t('navigation.contact')}</a>
          <Link to="/cotizador" onClick={() => setMenuOpen(false)}>
            <Button className="w-full rounded-full bg-green-500 text-white font-semibold px-5 py-2 text-xs shadow-none hover:bg-green-400 transition mt-2">
              {t('navigation.quote')}
            </Button>
          </Link>
        </nav>
      )}
    </header>
  );
}