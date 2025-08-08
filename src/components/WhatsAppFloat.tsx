import { useState } from 'react';
import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// Componente de ícono de WhatsApp SVG
const WhatsAppIcon = ({ className = "h-6 w-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.687"/>
  </svg>
);

export function WhatsAppFloat() {
  // Estilos CSS para animación suave
  const pulseKeyframes = `
    @keyframes gentle-pulse {
      0%, 100% { 
        transform: scale(1); 
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3), 0 0 0 0 rgba(37, 211, 102, 0.7); 
      }
      50% { 
        transform: scale(1.05); 
        box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4), 0 0 0 10px rgba(37, 211, 102, 0.2); 
      }
    }
  `;
  const [isOpen, setIsOpen] = useState(false);
  const { i18n } = useTranslation();
  const isSpanish = i18n.language === 'es';

  const phoneNumber = "51938150845"; // Número de WhatsApp
  const message = isSpanish 
    ? "¡Hola! Me interesa saber más sobre sus servicios de desarrollo."
    : "Hello! I'm interested in learning more about your development services.";

  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    setIsOpen(false);
  };

  return (
    <>
      {/* Inyectar estilos CSS */}
      <style dangerouslySetInnerHTML={{ __html: pulseKeyframes }} />
      {/* Botón principal flotante */}
      <div className="fixed left-4 bottom-20 md:left-6 md:bottom-6 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-105"
          style={{
            animation: 'gentle-pulse 3s ease-in-out infinite'
          }}
          aria-label="WhatsApp"
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <WhatsAppIcon className="h-6 w-6" />
          )}
        </button>

        {/* Tooltip/Mensaje emergente */}
        {isOpen && (
          <div className="absolute bottom-16 left-0 mb-2 w-64 md:w-72 bg-white rounded-lg shadow-xl border border-gray-200 p-4 animate-in slide-in-from-bottom-2 duration-300">
            <div className="flex items-start space-x-3">
              <div className="bg-green-500 rounded-full p-2 flex-shrink-0">
                <WhatsAppIcon className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 text-sm mb-1">
                  {isSpanish ? '¡Hablemos por WhatsApp!' : 'Let\'s talk on WhatsApp!'}
                </h4>
                <p className="text-gray-600 text-xs mb-3">
                  {isSpanish 
                    ? 'Estamos aquí para ayudarte con tu proyecto.'
                    : 'We\'re here to help you with your project.'}
                </p>
                <button
                  onClick={handleWhatsAppClick}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 w-full"
                >
                  {isSpanish ? 'Iniciar Chat' : 'Start Chat'}
                </button>
              </div>
            </div>
            
            {/* Flecha del tooltip */}
            <div className="absolute bottom-[-6px] left-8 w-3 h-3 bg-white border-r border-b border-gray-200 transform rotate-45"></div>
          </div>
        )}
      </div>

      {/* Overlay para cerrar cuando se hace clic fuera */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-30" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
