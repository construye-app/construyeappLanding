import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { PriceQuoter } from './PriceQuoter';
import { ContactForm } from './ContactForm';
import { tabIcons } from './tabIcons';


export function Hero() {
  const { t } = useTranslation();
  const [openTab, setOpenTab] = useState<string | null>(null);
  const tabs = [
    {
      key: 'cotizar',
      label: 'Cotizar',
      content: <PriceQuoter />,
    },
    {
      key: 'contacto',
      label: 'Contacto',
      content: <ContactForm title="¡Contáctanos ahora!" />,
    },
  ];

  return (
    <section className="relative py-20 bg-[#f7f5fa] overflow-hidden w-full">
      {/* Imagen de fondo parallax */}
      <div
        className="absolute inset-0 w-full h-full z-0"
        style={{
          backgroundImage: "url('/images/hero-bg.jpg')",
          backgroundAttachment: 'fixed',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          opacity: 0.18,
          filter: 'blur(1px)',
        }}
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
      <div className="fixed left-0 right-0 bottom-0 z-40 md:hidden">
        {/* Tab content overlay, slides up from bottom */}
        <div className="pointer-events-none">
          {tabs.map(tab => (
            <div
              key={tab.key}
              className={`fixed left-0 right-0 bottom-14 px-0 pb-2 z-50 w-full pointer-events-auto bg-white shadow-2xl rounded-t-2xl transition-all duration-300 ease-in-out
                ${openTab === tab.key ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0 scale-95'}`}
              style={{ minHeight: openTab === tab.key ? 340 : 0, maxHeight: '80vh' }}
            >
              <div className="p-4">{openTab === tab.key && tab.content}</div>
            </div>
          ))}
        </div>
        {/* Tab bar */}
        <div className="flex w-full bg-blue-900 text-white border-t border-blue-900 rounded-none shadow-lg z-50">
          {tabs.map(tab => (
            <button
              key={tab.key}
              className={`flex-1 flex flex-col items-center justify-center py-2 text-xs font-semibold transition-colors focus:outline-none ${openTab === tab.key ? 'text-[#26dcb4]' : 'text-white/80'}`}
              onClick={() => setOpenTab(openTab === tab.key ? null : tab.key)}
              type="button"
            >
              <span className="flex items-center justify-center mb-1">
                {tabIcons[tab.key]}
              </span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </section>  
  );
}
