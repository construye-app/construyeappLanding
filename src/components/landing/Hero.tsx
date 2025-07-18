import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { PriceQuoter } from './PriceQuoter';
import { ContactForm } from './ContactForm';
import { tabIcons } from './tabIcons';


export function Hero() {
  const { t } = useTranslation();
  const [openTab, setOpenTab] = useState<string | null>(null);
  const { i18n } = useTranslation();
  const tabs = [
    {
      key: 'cotizar',
      label: t('Cotizar'),
      content: <PriceQuoter hideBackButtonOnMobile={true} />, // <-- pasamos la prop
    },
    {
      key: 'contacto',
      label: t('navigation.contact', 'Contacto'),
      content: <ContactForm title={t('contact.title', '¡Contáctanos ahora!')} />,
    },
    {
      key: 'idioma',
      label: t('tabs.language', 'Idioma'),
      content: (
        <div className="flex flex-col items-center gap-4 py-4">
          <span className="text-base font-semibold mb-2">{t('tabs.language', 'Idioma')}</span>
          <div className="flex gap-4">
            <button
              className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 transition font-semibold text-sm ${i18n.language === 'es' ? 'bg-blue-900 text-white border-blue-900' : 'bg-white text-blue-900 border-blue-900'}`}
              onClick={() => { setOpenTab(null); i18n.changeLanguage('es'); }}
            >
              <img src="/images/es-flag.svg" alt="Español" className="w-5 h-5" />
              ES
            </button>
            <button
              className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 transition font-semibold text-sm ${i18n.language === 'en' ? 'bg-blue-900 text-white border-blue-900' : 'bg-white text-blue-900 border-blue-900'}`}
              onClick={() => { setOpenTab(null); i18n.changeLanguage('en'); }}
            >
              <img src="/images/us-flag.svg" alt="English" className="w-5 h-5" />
              EN
            </button>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section className="relative py-20 bg-[#f7f5fa] overflow-hidden w-full min-h-screen">
      {/* Imagen de fondo parallax */}
      <div
        className="absolute inset-0 w-full h-full z-0"
        style={{
          backgroundImage: "url('/images/hero-bg.jpg')",
          backgroundAttachment: 'fixed',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          opacity: 0.18 as any,
          filter: 'blur(1px)',
        } as React.CSSProperties}
        aria-hidden="true"
      />
      <div className="relative container mx-auto px-4 max-w-[1300px] z-10">
        <div className="flex flex-col md:flex-row items-center justify-center gap-12">
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src="/images/web-app.svg"
              alt="Code example"
              className="w-[220px] h-[220px] md:w-[320px] md:h-[320px] object-contain bg-transparent rounded-xl "
            />
          </div>
          <div className="w-full md:w-1/2 flex flex-col items-start justify-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-left mb-4 leading-tight text-[#2d2342]">
              {t('hero.title')}
            </h1>
            <p className="mb-8 text-base md:text-lg text-gray-800 text-left max-w-md">
              {t('hero.subtitle')}
            </p>
            <ContactForm />
          </div>
        </div>
      </div>
      {/* Mobile-only tab bar at bottom of hero */}
      <div className="fixed left-0 right-0 bottom-0 z-50 md:hidden">
        {/* Tab content overlay, slides up from bottom, scrollable */}
        <div className="pointer-events-none">
          {tabs.map(tab => (
            <div
              key={tab.key}
              className={`fixed left-0 right-0 bottom-14 px-0 pb-2 z-40 w-full pointer-events-auto bg-white shadow-2xl rounded-t-2xl transition-all duration-300 ease-in-out
                ${openTab === tab.key ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0 scale-95'}`}
              style={{
                minHeight: openTab === tab.key ? undefined : 0,
                maxHeight: '70vh',
                overflowY: 'auto',
                height: openTab === tab.key ? 'auto' : 0
              }}
            >
              <div className="p-4">{openTab === tab.key && tab.content}</div>
            </div>
          ))}
        </div>
        {/* Tab bar */}
        <div className="flex w-full bg-blue-900 text-white border-t border-blue-900 rounded-none shadow-lg z-50">
          {tabs.map(tab => (
            <div
              key={tab.key}
              className={`flex-1`}
            >
              <button
                className={`w-full flex flex-col items-center justify-center py-2 text-xs font-semibold transition-colors focus:outline-none ${openTab === tab.key ? 'text-[#26dcb4]' : 'text-white/80'}`}
                onClick={() => setOpenTab(openTab === tab.key ? null : tab.key)}
                type="button"
                style={{ minHeight: 56 }}
              >
                <span className="flex items-center justify-center mb-1">
                  {tabIcons[tab.key]}
                </span>
                {tab.label}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>  
  );
}
