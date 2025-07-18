import React from 'react';
import { Calculator, User, Globe2 } from 'lucide-react';

export const tabIcons: Record<string, React.ReactNode> = {
  cotizar: <Calculator className="w-5 h-5 mr-2" />, // Calculadora para Cotizar
  contacto: <User className="w-5 h-5 mr-2" />,     // Usuario para Contacto
  idioma: <Globe2 className="w-5 h-5 mr-2" />      // Globo para Idioma
};
