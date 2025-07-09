import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

export interface PricingPlan {
  title: string;
  price: string;
  features: string[];
  cta: string;
  onCtaClick?: () => void;
}

export function Pricing() {
  const { t } = useTranslation();
  const plans = (t('pricing.plans', { returnObjects: true }) as PricingPlan[]);

  return (
    <section className="py-20 bg-[#f7f5fa] dark:bg-[#18151c]">
      <div className="container mx-auto px-4 max-w-[1300px]">
        <h2 className="text-3xl font-bold text-[#2d2342] dark:text-white text-center mb-12">{t('pricing.title')}</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.title}
              className="bg-white dark:bg-[#221d29] rounded-2xl shadow-md p-8 flex flex-col items-center border border-[#e2d9f7] dark:border-[#55416d]"
            >
              <h3 className="text-xl font-bold mb-2 text-[#2d2342] dark:text-white">{plan.title}</h3>
              <div className="text-3xl font-extrabold mb-4 text-[#7c4dff] dark:text-[#b39ddb]">{plan.price}</div>
              <ul className="mb-8 space-y-2 text-[#5e548e] dark:text-[#bdb6c9] text-sm">
                {plan.features.map((feature, i) => (
                  <li key={i}>• {feature}</li>
                ))}
              </ul>
              <Button
                className="w-full rounded-full bg-[#e2d9f7] text-[#2d2342] dark:text-black font-semibold px-6 py-2 shadow-none hover:bg-[#d1c4e9] transition"
                onClick={plan.onCtaClick}
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
