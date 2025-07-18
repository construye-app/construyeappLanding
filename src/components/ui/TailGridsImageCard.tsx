import React from 'react';

export function TailGridsImageCard({ image, title, description }: { image: string; title: string; description: string }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col h-full border border-gray-100">
      <img src={image} alt={title} className="w-full h-40 object-cover" />
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-lg font-bold text-[#2d2342] mb-2">{title}</h3>
        <p className="text-[#5e548e] flex-1">{description}</p>
      </div>
    </div>
  );
}
