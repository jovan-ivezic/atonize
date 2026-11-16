import { useTranslations } from 'next-intl';
import { Link } from '../i18n/routing';
import Logo from './Logo';

const Footer = () => {
  const t = useTranslations('Footer');
  const tNav = useTranslations('Navbar');
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { label: tNav('work'), href: '/#portfolio' },
    { label: tNav('insights'), href: '/insights' },
    { label: tNav('about'), href: '/#about' },
    { label: tNav('contact'), href: '/#contact' },
  ];

  return (
    <footer className="bg-tertiary text-on-tertiary border-t border-white/10">
      <div className="container max-w-container-max mx-auto px-margin-mobile md:px-gutter py-12 md:py-14">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-10 border-b border-white/10">
          <div className="space-y-3">
            <Link href={'/#home' as any} className="inline-block">
              <Logo variant="light" />
            </Link>
            <p className="text-sm text-on-tertiary-container max-w-sm">
              {t('tagline')}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-sm font-medium text-on-tertiary-container">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href as any}
                className="hover:text-white transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <a
              href="https://atonizer.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Atonizer
            </a>
            <a
              href="https://www.linkedin.com/in/jovanivezic/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-on-tertiary-container/80">
          <p>© {currentYear} {t('rights')}</p>
          <a
            href="mailto:jovan.ivezic@atonize.com"
            className="hover:text-white transition-colors"
          >
            jovan.ivezic@atonize.com
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
