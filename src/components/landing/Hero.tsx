import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function Hero() {
  const { t } = useTranslation();

  return (
    <section className="py-20 bg-[#f7f5fa] dark:bg-[#18151c]">
      <div className="container mx-auto px-4 max-w-[1300px]">
        <div className="flex flex-col md:flex-row items-center justify-center gap-12">
          {/* Imagen a la izquierda */}
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src="/landing1.jpg"
              alt="Code example"
              className="rounded-xl shadow-lg object-cover w-[350px] h-[260px] md:w-[400px] md:h-[320px] bg-[#ede7f6] dark:bg-transparent"
            />
          </div>
          {/* Texto y formulario a la derecha */}
          <div className="w-full md:w-1/2 flex flex-col items-start justify-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-left mb-4 leading-tight text-[#2d2342] dark:text-white">
              {t('hero.title')}
            </h1>
            <p className="mb-8 text-base md:text-lg text-[#5e548e] dark:text-[#bdb6c9] text-left max-w-md">
              {t('hero.subtitle')}
            </p>
            <form className="w-full max-w-md space-y-3">
              <Input
                type="text"
                placeholder="Nombre y Apellido"
                className="bg-transparent border border-[#e2d9f7] dark:border-[#55416d] text-[#2d2342] dark:text-white placeholder:text-[#bdb6c9] focus:ring-0 focus:outline-none"
                required
              />
              <Input
                type="email"
                placeholder="Correo Electrónico"
                className="bg-transparent border border-[#e2d9f7] dark:border-[#55416d] text-[#2d2342] dark:text-white placeholder:text-[#bdb6c9] focus:ring-0 focus:outline-none"
                required
              />
              <Input
                type="tel"
                placeholder="Número de WhatsApp"
                className="bg-transparent border border-[#e2d9f7] dark:border-[#55416d] text-[#2d2342] dark:text-white placeholder:text-[#bdb6c9] focus:ring-0 focus:outline-none"
                required
              />
              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="bg-[#e2d9f7] text-[#2d2342] dark:text-black font-semibold px-6 py-2 rounded-xl shadow-none hover:bg-[#d1c4e9] transition"
                >
                  {t('hero.form_button')}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}