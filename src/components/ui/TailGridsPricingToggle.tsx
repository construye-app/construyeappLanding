import React from 'react';

export interface TailGridsPricingPlan {
  title: string;
  price: string;
  features: string[];
  cta: string;
  highlight?: boolean;
  onCtaClick?: () => void;
}

export function TailGridsPricingToggle({ plans, toggleLabel, toggleValue, onToggle }: {
  plans: TailGridsPricingPlan[];
  toggleLabel: string;
  toggleValue: boolean;
  onToggle: () => void;
}) {
  return (
    <div>
      <div className="flex justify-center mb-8">
        <span className="mr-2 font-medium text-[#2d2342]">{toggleLabel}</span>
        <button
          className={`relative w-14 h-7 bg-gray-200 rounded-full transition-colors duration-200 ${toggleValue ? 'bg-blue-900' : ''}`}
          onClick={onToggle}
          type="button"
        >
          <span
            className={`absolute left-1 top-1 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${toggleValue ? 'translate-x-7' : ''}`}
          />
        </button>
      </div>
      <div className="grid gap-8 md:grid-cols-3">
        {plans.slice(0, 3).map((plan, planIdx) => (
          <div
            key={plan.title}
            className={`bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center border-2 relative overflow-hidden transition-all duration-300 ${plan.highlight ? 'border-blue-900 scale-105 ring-2 ring-blue-900' : 'border-[#e2d9f7]'}`}
          >
            {plan.highlight && (
              <span className="absolute top-4 right-4 px-3 py-1 bg-blue-900 text-white text-xs rounded-full font-semibold shadow">Popular</span>
            )}
            <h3 className="text-2xl font-extrabold mb-2 text-[#2d2342] tracking-tight text-center">{plan.title}</h3>
            <div className="text-4xl font-black mb-4 text-[#7c4dff] text-center">{plan.price}</div>
            <ul className="mb-8 space-y-2 text-[#5e548e] text-base w-full max-w-xs mx-auto">
              {plan.features.map((featureText, featureIdx) => (
                <li key={featureIdx} className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 bg-blue-900 rounded-full"></span>
                  <span>{featureText}</span>
                </li>
              ))}
            </ul>
            <button
              className="w-full rounded-full bg-blue-900 text-white font-bold px-6 py-3 shadow hover:bg-blue-800 transition text-lg mt-auto"
              onClick={plan.onCtaClick}
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
