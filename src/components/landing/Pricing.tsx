import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

export function Pricing() {
	const { t } = useTranslation();
	const [isYearly, setIsYearly] = useState(false);
	type Plan = {
		title: string;
		price: string;
		priceYearly?: string;
		oldPrice?: string;
		oldPriceYearly?: string;
		saveText?: string;
		features: string[];
		cta: string;
		highlight?: boolean;
		onCtaClick?: () => void;
	};
	const plans: Plan[] = (t('pricing.plans', { returnObjects: true }) as Plan[]).map((plan) => ({
		...plan,
		price: isYearly && plan.priceYearly ? plan.priceYearly : plan.price,
		oldPrice: isYearly && plan.oldPriceYearly ? plan.oldPriceYearly : plan.oldPrice,
		saveText: plan.saveText,
		highlight: plan.highlight || false,
	}));

	return (
		<section className="py-20 bg-[#f7f5fa]">
			<div className="container mx-auto px-4 max-w-[1300px]">
				<div className="text-center mb-8">
					<span className="block text-sm font-semibold text-blue-900 mb-2">
						{t('pricing.subtitle', 'Our Pricing Plans')}
					</span>
					<h2 className="text-4xl font-extrabold text-[#18181b] mb-3">
						{t('pricing.title', 'Pricing and Plans')}
					</h2>
					<p className="text-base text-[#6b7280] max-w-xl mx-auto">
						{t(
							'pricing.description',
							'There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form.'
						)}
					</p>
				</div>
				<div className="flex justify-center mb-10">
					<div className="flex items-center gap-4 bg-white rounded-full px-2 py-1 shadow-sm border border-[#e5e7eb]">
						<button
							className={`px-4 py-1 rounded-full text-sm font-medium transition-colors ${
								!isYearly ? 'bg-blue-900 text-white' : 'text-[#18181b]'
							}`}
							onClick={() => setIsYearly(false)}
						>
							{t('pricing.payMonthly', 'Pay Monthly')}
						</button>
						<div className="w-10 h-5 flex items-center bg-[#e5e7eb] rounded-full px-1">
							<div
								className={`w-4 h-4 rounded-full bg-blue-900 shadow transform transition-transform duration-300 ${
									isYearly ? 'translate-x-5' : ''
								}`}
							></div>
						</div>
						<button
							className={`px-4 py-1 rounded-full text-sm font-medium transition-colors ${
								isYearly ? 'bg-blue-900 text-white' : 'text-[#18181b]'
							}`}
							onClick={() => setIsYearly(true)}
						>
							{t('pricing.payYearly', 'Pay Yearly')}
						</button>
					</div>
				</div>
				<div className="grid gap-8 md:grid-cols-3 mt-8">
					{plans.map((plan) => (
						<div
							key={plan.title}
							className={`relative rounded-2xl shadow-md p-8 flex flex-col items-center border transition-all duration-300 bg-white
                ${plan.highlight ? 'border-2 border-blue-900 z-10 scale-105' : 'border border-[#e5e7eb]'}
              `}
						>
							{plan.highlight && (
								<span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-900 text-white text-xs font-bold px-4 py-1 rounded-full shadow">
									{t('pricing.bestChoice', 'BEST CHOICE')}
								</span>
							)}
							<h3 className="text-lg font-semibold mb-2 text-[#18181b]">{plan.title}</h3>
							<div className="flex flex-col items-center mb-4">
								{plan.oldPrice && (
									<span className="text-base text-[#a1a1aa] line-through font-semibold">
										{plan.oldPrice}
									</span>
								)}
								<span className="text-3xl font-extrabold text-[#18181b]">
									{plan.price}
									<span className="text-base font-medium text-[#6b7280] ml-1">
										{isYearly
											? t('pricing.perYear', '/Year')
											: t('pricing.perMonth', '/Month')}
									</span>
								</span>
								{plan.saveText && (
									<span className="mt-2 text-xs font-semibold bg-blue-100 text-blue-900 px-3 py-1 rounded-full">
										{plan.saveText}
									</span>
								)}
							</div>
							<Button
								className={`w-full rounded-lg font-semibold px-6 py-2 shadow-none transition text-base flex items-center justify-center gap-2
                  ${plan.highlight ? 'bg-blue-900 text-white hover:bg-blue-400' : 'bg-[#18181b] text-white hover:bg-blue-400'}
                `}
								onClick={plan.onCtaClick}
							>
								{plan.cta}
								<svg
									width="18"
									height="18"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									className="ml-1"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M17 8l4 4m0 0l-4 4m4-4H3"
									/>
								</svg>
							</Button>
							<ul className="mt-8 space-y-2 text-[#18181b] text-sm w-full">
								{plan.features.map((feature, i) => (
									<li key={i} className="flex items-start gap-2">
										<span className="mt-1 w-2 h-2 rounded-full bg-blue-900 inline-block"></span>
										<span>{feature}</span>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
