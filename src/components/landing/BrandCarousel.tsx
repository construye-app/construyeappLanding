import React, { useEffect, useState } from 'react';
import { brandLogos } from '@/lib/brandLogos';

export function BrandCarousel() {
  const [startIdx, setStartIdx] = useState(0);
  const [visibleCount, setVisibleCount] = useState(6);
  const total = brandLogos.length;

  // Responsivo: cambia el número de logos según el ancho
  useEffect(() => {
    const updateCount = () => {
      if (window.innerWidth < 640) setVisibleCount(2);
      else if (window.innerWidth < 1024) setVisibleCount(4);
      else setVisibleCount(6);
    };
    updateCount();
    window.addEventListener('resize', updateCount);
    return () => window.removeEventListener('resize', updateCount);
  }, []);

  // Animación automática
  useEffect(() => {
    const interval = setInterval(() => {
      setStartIdx((prev) => (prev + 1) % total);
    }, 2500);
    return () => clearInterval(interval);
  }, [total]);

  // Obtener los logos visibles
  const visibleLogos = Array.from({ length: visibleCount }, (_, i) => brandLogos[(startIdx + i) % total]);

  return (
    <section className="w-full py-8 bg-[#f7f5fa] border-[#ece6fa]">
      <h2 className="text-2xl font-bold text-center mt-6 mb-6 text-[#2d2342]">
        Marcas que confían en nosotros
      </h2>
      <div className="w-full flex items-center justify-center gap-2 sm:gap-4 overflow-x-auto scrollbar-hide px-2">
        <div className="flex items-center gap-4 sm:gap-6 justify-center w-full max-w-4xl">
          {visibleLogos.map((brand, idx) => (
            <img
              key={brand.name + idx}
              src={brand.src}
              alt={brand.alt}
              className="h-12 w-24 sm:h-16 sm:w-32 object-contain grayscale hover:grayscale-0 transition duration-300 px-1 sm:px-2 rounded-md shadow-sm bg-transparent"
              style={{ minHeight: '3rem', minWidth: '6rem', maxHeight: '4rem', maxWidth: '8rem', background: 'transparent' }}
              draggable={false}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
