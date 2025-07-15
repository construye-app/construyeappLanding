import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

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

interface QuoteFormProps {
	onSuccess?: (name: string) => void;
}

export default function QuoteForm({ onSuccess }: QuoteFormProps) {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		phone: ''
	});
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

	const apiKey = (import.meta as ImportMeta & { env: { VITE_BREVO_API_KEY: string } }).env.VITE_BREVO_API_KEY;

	const handleSubmit = async (e: React.FormEvent) => {
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
					'api-key': apiKey,
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
				if (onSuccess) onSuccess(formData.name);
			}
		} catch (error) {
			setMensajeError('Error de red o servidor.');
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div>
			{mensajeExito && (
				<div className="bg-green-100 border border-green-300 text-green-800 px-4 py-3 rounded-md shadow-sm mb-2">
					<p className="text-lg font-semibold mb-1">Registro exitoso</p>
					<p>{mensajeExito}</p>
				</div>
			)}
			{mensajeError && (
				<div className="bg-red-100 border border-red-300 text-red-800 px-4 py-3 mb-2 rounded-md shadow-sm">
					<p className="text-lg font-semibold mb-1">Error al registrar</p>
					<p>{mensajeError}</p>
				</div>
			)}
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
					<div className="flex gap-2">
						<select
							name="countryCode"
							value={countryCode}
							onChange={e => setCountryCode(e.target.value)}
							className="px-1 py-2 border rounded-md bg-transparent border-[#e2d9f7] dark:border-[#55416d] text-[#2d2342] dark:text-white"
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
							className="flex-1"
						/>
					</div>
					<div className="flex justify-end">
						<Button
							type="submit"
							disabled={isSubmitting}
							className="bg-[#e2d9f7] text-[#2d2342] dark:text-black font-semibold px-6 py-2 rounded-xl shadow-none hover:bg-[#d1c4e9] transition"
						>
							{isSubmitting ? 'Enviando...' : 'Quiero cotizar'}
						</Button>
					</div>
				</form>
			)}
		</div>
	);
}
