import { useTranslation } from 'react-i18next';
import { Github, Twitter, Linkedin } from 'lucide-react';

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer id="contact" className="py-8 text-center bg-[#f7f5fa] dark:bg-[#18151c] border-t border-[#ede7f6] dark:border-[#28232e]">
      <div className="container mx-auto px-4 max-w-[1300px]">
        <div className="flex justify-center space-x-4 mb-4">
          <a href="#" className="text-[#5e548e] dark:text-[#bdb6c9] hover:text-[#7c4dff] dark:hover:text-white"><Github /></a>
          <a href="#" className="text-[#5e548e] dark:text-[#bdb6c9] hover:text-[#7c4dff] dark:hover:text-white"><Twitter /></a>
          <a href="#" className="text-[#5e548e] dark:text-[#bdb6c9] hover:text-[#7c4dff] dark:hover:text-white"><Linkedin /></a>
        </div>
        <p className="text-[#5e548e] dark:text-[#bdb6c9]">{t('footer.rights')}</p>
      </div>
    </footer>
  );
}