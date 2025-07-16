import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const technologies = [
	{ name: 'HTML5', src: '/images/html-5.svg' },
	{ name: 'JavaScript', src: '/images/javascript.svg' },
	{ name: 'React', src: '/images/react.svg' },
	{ name: 'Node.js', src: '/images/node.svg' },
	{ name: 'PHP', src: '/images/php.svg' },
	{ name: 'Magento', src: '/images/magento.svg' },
	{ name: 'Prestashop', src: '/images/prestashop.svg' },
	{ name: 'Shopify', src: '/images/shopify.svg' },
	{ name: 'WooCommerce', src: '/images/woocommerce.svg' },
	{ name: 'WordPress', src: '/images/wordpress.svg' },
	{ name: 'Astro', src: '/images/astroframework.svg' },
	{ name: 'Web Apps', src: '/images/web-app.svg' },
];

type TechnologyType = { name: string; src: string };

export function Technology() {
	const { t } = useTranslation();
	const [startIdx, setStartIdx] = useState(0);
	const [phone, setPhone] = useState('');
	const [phoneError, setPhoneError] = useState('');
	const [showSuccess, setShowSuccess] = useState(false);
	// Mostrar menos logos en móvil
	const getVisibleCount = () => {
		if (typeof window !== 'undefined') {
			if (window.innerWidth < 640) return 2;
			if (window.innerWidth < 1024) return 4;
		}
		return 6;
	};
	const [visibleCount, setVisibleCount] = useState(getVisibleCount());
	const total = technologies.length;
	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	// Animación automática
	useEffect(() => {
		intervalRef.current = setInterval(() => {
			setStartIdx((prev) => (prev + 1) % total);
		}, 2500);
		return () => {
			if (intervalRef.current) clearInterval(intervalRef.current);
		};
	}, [total]);

	// Flechas manuales
	const handlePrev = () => {
		setStartIdx((prev) => (prev - 1 + total) % total);
		resetInterval();
	};
	const handleNext = () => {
		setStartIdx((prev) => (prev + 1) % total);
		resetInterval();
	};
	const resetInterval = () => {
		if (intervalRef.current) clearInterval(intervalRef.current);
		intervalRef.current = setInterval(() => {
			setStartIdx((prev) => (prev + 1) % total);
		}, 2500);
	};

	// Obtener las tecnologías visibles
	const visibleTechs: TechnologyType[] = Array.from(
		{ length: visibleCount },
		(_, i: number) => technologies[(startIdx + i) % total]
	);

	// Validación simple de teléfono
	const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.replace(/[^\d+]/g, '');
		setPhone(value);
		if (value.length < 8) {
			setPhoneError('Ingresa un número válido');
		} else {
			setPhoneError('');
		}
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (phone.length < 8) {
			setPhoneError('Ingresa un número válido');
			return;
		}
		setShowSuccess(true);
		setPhone('');
		setTimeout(() => setShowSuccess(false), 3500);
	};

	useEffect(() => {
		const handleResize = () => setVisibleCount(getVisibleCount());
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return (
		<section id="technologies" className="py-20">
			<div className="container mx-auto px-4 max-w-[1200px] flex flex-col items-center gap-10">
				{/* Texto, descripción y CTA con input */}
				<div className="w-full flex flex-col items-center justify-center mb-2">
					<h2 className="text-3xl md:text-4xl font-bold text-[#2d2342] mb-3 text-center">
						{t('technologies.title', 'Tecnologías que usamos')}
					</h2>
					<p className="mb-6 text-base md:text-lg text-[#5e548e] max-w-xl text-center">
						{t(
							'technologies.desc',
							'Trabajamos con las tecnologías más modernas y robustas para asegurar el éxito de tu proyecto digital.'
						)}
					</p>
					<form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md mx-auto">
						<input
							type="tel"
							placeholder="Tu número de teléfono"
							value={phone}
							onChange={handlePhoneChange}
							className="flex-1 rounded-full border border-[#ece6fa] px-5 py-3 text-base focus:outline-none focus:ring-2 focus:ring-green-400 bg-white text-[#2d2342] transition"
							maxLength={20}
							required
						/>
						<Button
							type="submit"
							className="rounded-full bg-green-500 text-white font-semibold px-6 py-3 text-base shadow-none hover:bg-green-400 transition"
						>
							{t('technologies.cta', 'Quiero que me contacten')}
						</Button>
					</form>
					{phoneError && <span className="text-red-500 text-sm mt-1">{phoneError}</span>}
					{showSuccess && (
						<div className="mt-4 px-4 py-2 rounded-lg bg-green-100 text-green-800 shadow text-center animate-fade-in">
							¡Gracias! Te contactaremos pronto.
						</div>
					)}
				</div>

				{/* Carrusel de tecnologías */}
				<div className="relative w-full flex items-center justify-center mt-6 overflow-hidden scrollbar-hide px-2">
					<div className="flex flex-row items-center justify-center gap-4 sm:gap-6 md:gap-8 w-full max-w-4xl bg-transparent md:bg-transparent md:border-0 md:px-0 md:py-0 rounded-xl shadow-none transition-all duration-500 overflow-x-auto">
						{visibleTechs.map((tech: TechnologyType, idx: number) => (
							<img
								key={tech.name + idx}
								src={tech.src}
								alt={tech.name}
								className="h-12 w-24 sm:h-16 sm:w-32 object-contain grayscale hover:grayscale-0 transition duration-300 px-1 sm:px-2 rounded-md shadow-sm bg-transparent"
								style={{ minHeight: '3rem', minWidth: '6rem', maxHeight: '4rem', maxWidth: '8rem', background: 'transparent' }}
								draggable={false}
							/>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
