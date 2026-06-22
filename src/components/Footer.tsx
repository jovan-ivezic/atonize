import { FaHeart } from 'react-icons/fa';
import { useTranslations } from 'next-intl';

const Footer = () => {
  const t = useTranslations('Footer');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="flex items-center justify-center gap-2 mb-2">
            {t('made_with')} <FaHeart className="text-red-500" /> {t('by')}
          </p>
          <p className="text-sm text-gray-400">
            © {currentYear} {t('rights')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
