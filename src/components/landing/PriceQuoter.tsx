import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import QuoteForm from '@/components/shared/QuoteForm';

// Tipos
interface Options {
  dominioHosting: boolean;
  disenoWeb: boolean;
  agregarProductos: boolean;
  subidaTienda: boolean;
}

interface ServiceSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

interface OptionsFormProps {
  service: string;
  options: Options;
  onChange: (opts: Options) => void;
}

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

interface PriceDisplayProps {
  price: number;
}

const SERVICES: { key: string; label: string }[] = [
  { key: 'webBasico', label: 'Desarrollo Web Básico' },
  { key: 'webMedida', label: 'Desarrollo Web a Medida' },
  { key: 'softwareMedida', label: 'Desarrollo de Software a Medida' },
  { key: 'ecommerce', label: 'E-commerce' },
  { key: 'appMovil', label: 'Aplicación Móvil' },
];

const EXTRAS = {
  dominioHosting: { label: 'Incluir dominio y hosting', priceKey: 'dominioHosting' },
  disenoWeb: { label: 'Diseño web', priceKey: 'disenoWeb' },
  agregarProductos: { label: 'Agregar productos', priceKey: 'agregarProductos' },
  subidaTienda: { label: 'Incluir subida a tienda de aplicaciones', priceKey: 'subidaTienda' },
};

const EXCHANGE_RATE = 3.8; // S/ 3.80 = 1 USD

// Simulación de importación de precios desde db.json
const DB = {
  services: {
    webBasico: { basePrice: 1500 },
    webMedida: { basePrice: 3000 },
    softwareMedida: { basePrice: 4500 },
    ecommerce: { basePrice: 2500 },
    appMovil: { basePrice: 4000 },
  },
  extras: {
    dominioHosting: 200,
    disenoWeb: 300,
    agregarProductos: 100,
    subidaTienda: 500,
  },
};

function ServiceSelector({ value, onChange }: ServiceSelectorProps) {
  return (
    <div className="mb-4">
      <label className="block font-semibold mb-2">Tipo de servicio</label>
      <select
        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#26dcb4]"
        value={value}
        onChange={e => onChange(e.target.value)}
      >
        <option value="">Selecciona un servicio</option>
        {SERVICES.map((s) => (
          <option key={s.key} value={s.key}>{s.label}</option>
        ))}
      </select>
    </div>
  );
}

function OptionsForm({ service, options, onChange }: OptionsFormProps) {
  if (!service) return null;
  return (
    <div className="space-y-3">
      {service === 'appMovil' ? (
        <Checkbox
          label={EXTRAS.subidaTienda.label}
          checked={options.subidaTienda}
          onChange={v => onChange({ ...options, subidaTienda: v })}
        />
      ) : (
        <>
          <Checkbox
            label={EXTRAS.dominioHosting.label}
            checked={options.dominioHosting}
            onChange={v => onChange({ ...options, dominioHosting: v })}
          />
          {(service === 'webBasico' || service === 'webMedida' || service === 'ecommerce') && (
            <Checkbox
              label={EXTRAS.disenoWeb.label}
              checked={options.disenoWeb}
              onChange={v => onChange({ ...options, disenoWeb: v })}
            />
          )}
          {service === 'ecommerce' && (
            <Checkbox
              label={EXTRAS.agregarProductos.label}
              checked={options.agregarProductos}
              onChange={v => onChange({ ...options, agregarProductos: v })}
            />
          )}
        </>
      )}
    </div>
  );
}

function Checkbox({ label, checked, onChange }: CheckboxProps) {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={e => onChange(e.target.checked)}
        className="accent-[#26dcb4] w-5 h-5"
      />
      <span>{label}</span>
    </label>
  );
}

function PriceDisplay({ price }: PriceDisplayProps) {
  return (
    <div className="mt-6 p-4 bg-[#f7f5fa] dark:bg-[#18151c] rounded-lg text-center">
      <div className="text-lg font-semibold mb-1">Precio estimado:</div>
      <div className="text-3xl font-bold text-[#26dcb4]">S/ {price.toLocaleString()}</div>
      <div className="text-md text-[#5e548e] dark:text-[#bdb6c9]">USD {(price / EXCHANGE_RATE).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
    </div>
  );
}

export function PriceQuoter() {
  const [service, setService] = useState<string>('');
  const [options, setOptions] = useState<Options>({ dominioHosting: false, disenoWeb: false, agregarProductos: false, subidaTienda: false });
  const [modalOpen, setModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  let price = 0;
  if (service) {
    price += DB.services[service as keyof typeof DB.services].basePrice;
    if (options.dominioHosting) price += DB.extras.dominioHosting;
    if (options.disenoWeb) price += DB.extras.disenoWeb;
    if (service === 'ecommerce' && options.agregarProductos) price += DB.extras.agregarProductos;
    if (service === 'appMovil' && options.subidaTienda) price += DB.extras.subidaTienda;
  }

  return (
    <section className="py-16 px-4 bg-white dark:bg-[#18151c]">
      <div className="max-w-lg mx-auto bg-[#f7f5fa] dark:bg-[#221d29] rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-6 text-[#2d2342] dark:text-white">Cotizador de Precios</h2>
        <ServiceSelector value={service} onChange={setService} />
        <OptionsForm service={service} options={options} onChange={setOptions} />
        {service && <PriceDisplay price={price} />}
        <div className="flex flex-col sm:flex-row gap-3 mt-8">
          <Button
            disabled={!service}
            className="w-full"
            onClick={() => setModalOpen(true)}
            variant="default"
          >
            Quiero cotizar
          </Button>
          <Button
            type="button"
            className="w-full"
            variant="outline"
            onClick={() => navigate('/')}
          >
            Volver al inicio
          </Button>
        </div>
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogContent className="bg-white dark:bg-[#18151c]">
            <DialogHeader>
              <DialogTitle>Solicita tu cotización</DialogTitle>
            </DialogHeader>
            {/* Resumen de cotización */}
            <div className="bg-white dark:bg-[#18151c] rounded p-3 text-sm mb-4">
              <div className="font-semibold mb-1">Resumen de cotización:</div>
              <div><span className="font-medium">Servicio:</span> {SERVICES.find(s => s.key === service)?.label}</div>
              {service !== 'appMovil' && options.dominioHosting && <div>Incluye: {EXTRAS.dominioHosting.label}</div>}
              {service !== 'appMovil' && options.disenoWeb && <div>Incluye: {EXTRAS.disenoWeb.label}</div>}
              {service === 'ecommerce' && options.agregarProductos && <div>Incluye: {EXTRAS.agregarProductos.label}</div>}
              {service === 'appMovil' && options.subidaTienda && <div>Incluye: {EXTRAS.subidaTienda.label}</div>}
              <div><span className="font-medium">Precio estimado:</span> S/ {price.toLocaleString()} (USD {(price / EXCHANGE_RATE).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })})</div>
            </div>
            <QuoteForm onSuccess={() => setSubmitted(true)} />
            {submitted && (
              <div className="text-center py-8">
                <div className="text-lg font-semibold text-[#26dcb4] mb-2">¡Cotización enviada!</div>
                <div className="text-sm text-[#5e548e] dark:text-[#bdb6c9]">Nos pondremos en contacto contigo pronto.</div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
