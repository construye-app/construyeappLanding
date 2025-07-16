import React from 'react';
import { Calculator, User } from 'lucide-react';

export const tabIcons: Record<string, React.ReactNode> = {
  cotizar: <Calculator className="w-5 h-5 mr-2" />, // Calculadora para Cotizar
  contacto: <User className="w-5 h-5 mr-2" />,     // Usuario para Contacto
};
