import { PriceQuoter } from '@/components/landing/PriceQuoter';

export default function CotizadorPage() {
  return (
    <div className="min-h-screen bg-[#f7f5fa] dark:bg-[#18151c] font-sans antialiased">
      <div className="container mx-auto px-4 max-w-[1300px] py-10">
        <h1 className="text-3xl font-bold text-[#2d2342] dark:text-white mb-8">Cotizador de Precios</h1>
        <PriceQuoter />
      </div>
    </div>
  );
}
