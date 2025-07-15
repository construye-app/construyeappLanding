import { useTranslation } from 'react-i18next';
import QuoteForm from '@/components/shared/QuoteForm';

export function Hero() {
  const { t } = useTranslation();
  const handleQuoteSuccess = (name: string) => {
    // Aquí puedes manejar el éxito, por ejemplo mostrar un toast
  };
  return (
    <section className="py-20 bg-[#f7f5fa] dark:bg-[#18151c]">
      <div className="container mx-auto px-4 max-w-[1300px]">
        <div className="flex flex-col md:flex-row items-center justify-center gap-12">
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src="/landing1.jpg"
              alt="Code example"
              className="rounded-xl shadow-lg object-cover w-[350px] h-[260px] md:w-[400px] md:h-[320px] bg-[#ede7f6] dark:bg-transparent"
            />
          </div>
          <div className="w-full md:w-1/2 flex flex-col items-start justify-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-left mb-4 leading-tight text-[#2d2342] dark:text-white">
              {t('hero.title')}
            </h1>
            <p className="mb-8 text-base md:text-lg text-[#5e548e] dark:text-[#bdb6c9] text-left max-w-md">
              {t('hero.subtitle')}
            </p>
            <QuoteForm onSuccess={handleQuoteSuccess} />
          </div>
        </div>
      </div>
    </section>
  );
}
