import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const countryPrefixes = [
	{ code: '+51', name: 'Perú' },
	{ code: '+54', name: 'Argentina' },
	{ code: '+57', name: 'Colombia' },
	{ code: '+56', name: 'Chile' },
	{ code: '+1', name: 'EE.UU.' },
	{ code: '+34', name: 'España' },
	{ code: '+55', name: 'Brasil' },
	{ code: '+502', name: 'Guatemala' },
	{ code: '+593', name: 'Ecuador' },
	{ code: '+58', name: 'Venezuela' }
];

export function ContactForm({ title }: { title?: string }) {
	const { t } = useTranslation();
	const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
	const [countryCode, setCountryCode] = useState('+51');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [mensajeExito, setMensajeExito] = useState('');
	const [mensajeError, setMensajeError] = useState('');

	useEffect(() => {
		if (mensajeExito || mensajeError) {
			const timeout = setTimeout(() => {
				setMensajeExito('');
				setMensajeError('');
			}, 5000);
			return () => clearTimeout(timeout);
		}
	}, [mensajeExito, mensajeError]);

	useEffect(() => {
		fetch('https://ipapi.co/json/')
			.then(res => res.json())
			.then(data => {
				if (data.country_calling_code) {
					setCountryCode(data.country_calling_code);
				}
			});
	}, []);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		setFormData(prev => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsSubmitting(true);
		const fullPhoneNumber = countryCode + formData.phone.replace(/[^\d]/g, '');
		const data = {
			email: formData.email,
			attributes: {
				FIRSTNAME: formData.name,
				SMS: fullPhoneNumber,
				WHATSAPP: fullPhoneNumber
			},
			listIds: [17],
			updateEnabled: true
		};
		try {
			const response = await fetch('https://api.brevo.com/v3/contacts', {
				method: 'POST',
				headers: {
					'api-key': import.meta.env.VITE_BREVO_API_KEY,
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				},
				body: JSON.stringify(data)
			});
			if (!response.ok) {
				const error = await response.json();
				if (error.code === 'duplicate_parameter') {
					setMensajeError('Este correo ya está registrado en nuestra base de datos.');
				} else {
					setMensajeError(error.message || 'Ocurrió un error al registrar tu contacto.');
				}
			} else {
				setMensajeExito(`¡Hola ${formData.name.split(' ')[0]}! Te hemos registrado con éxito. Pronto recibirás un correo de confirmación de suscripción.`);
				setFormData({ name: '', email: '', phone: '' });
			}
		} catch (error) {
			setMensajeError('Error de red o servidor.');
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="w-full flex flex-col items-start justify-center">
			{title && (
				<h2 className="text-xl font-bold text-[#2d2342] mb-4 w-full text-left">{title}</h2>
			)}
			{/* Mensaje de éxito */}
			{mensajeExito && (
				<div className="bg-green-100 border border-green-300 text-green-800 px-4 py-3 rounded-md shadow-sm mb-2">
					<p className="text-lg font-semibold mb-1">Registro exitoso</p>
					<p>{mensajeExito}</p>
				</div>
			)}
			{/* Mensaje de error */}
			{mensajeError && (
				<div className="bg-red-100 border border-red-300 text-red-800 px-4 py-3 mb-2 rounded-md shadow-sm">
					<p className="text-lg font-semibold mb-1">Error al registrar</p>
					<p>{mensajeError}</p>
				</div>
			)}
			{/* Formulario */}
			{!mensajeExito && (
				<form onSubmit={handleSubmit} className="w-full max-w-md space-y-3">
					<Input
						type="text"
						name="name"
						placeholder="Nombre y Apellido"
						value={formData.name}
						onChange={handleChange}
						required
					/>
					<Input
						type="email"
						name="email"
						placeholder="Correo Electrónico"
						value={formData.email}
						onChange={handleChange}
						required
					/>
					<div className="flex gap-2 w-full">
						<select
							value={countryCode}
							onChange={(e) => setCountryCode(e.target.value)}
							className="w-full md:w-28 px-1 py-2 border rounded-md bg-transparent border-[#e2d9f7] text-[#2d2342] md:transition-none lg:transition-colors"
						>
							{countryPrefixes.map((c) => (
								<option key={c.code} value={c.code}>
									{c.name} ({c.code})
								</option>
							))}
						</select>
						<Input
							type="tel"
							name="phone"
							placeholder="Número"
							value={formData.phone}
							onChange={handleChange}
							required
							className="flex-1 min-w-0"
						/>
					</div>
					<div className="flex justify-center md:justify-end">
						<Button
							type="submit"
							disabled={isSubmitting}
							className="bg-blue-900 text-white font-semibold px-6 py-2 rounded-full shadow-none hover:bg-blue-800 transition w-full md:w-auto"
						>
							{isSubmitting ? 'Enviando...' : t('hero.form_button')}
						</Button>
					</div>
				</form>
			)}
		</div>
	);
}
