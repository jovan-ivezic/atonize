'use client';
import { useState, useEffect } from 'react';
import { motion as Motion } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link } from '../i18n/routing';
import { useTranslations, useLocale } from 'next-intl';
import LanguageSwitcher from './LanguageSwitcher';

interface MenuItem {
  name: string;
  href: any; // using any because next-intl Link href has complex types
  isExternalPage?: boolean;
}

const Navbar = () => {
  const t = useTranslations('Navbar');
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems: MenuItem[] = [
    { name: t('work'), href: `/#portfolio` },
    { name: t('about'), href: `/about`, isExternalPage: true },
    { name: t('insights'), href: `/insights`, isExternalPage: true },
    { name: t('contact'), href: `/#contact` },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string, isExternalPage?: boolean) => {
    if (isExternalPage) return;
    
    // Ako smo na pocetnoj strani pokusavamo scroll
    if (window.location.pathname === '/') {
      const targetId = href.replace('/#', '#');
      if (targetId.startsWith('#')) {
        e.preventDefault();
        const element = document.querySelector(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          setIsOpen(false);
        }
      }
    }
  };

  return (
    <Motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 border-b ${
        scrolled ? 'bg-surface/90 backdrop-blur-md shadow-sm border-outline-variant' : 'bg-surface/50 backdrop-blur-sm border-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Motion.div whileHover={{ scale: 1.05 }}>
            <Link
              href="/#home"
              className="text-headline-md font-headline-md text-primary tracking-tight"
              onClick={(e) => scrollToSection(e, '/#home')}
            >
              Atonize
            </Link>
          </Motion.div>

          {/* Desktop Menu & Switcher */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href, item.isExternalPage)}
                className="text-secondary hover:text-primary font-label-caps text-label-caps transition-colors"
              >
                {item.name.toUpperCase()}
              </Link>
            ))}
            <div className="pl-4 border-l border-gray-200">
              <LanguageSwitcher />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <Motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white border-t"
        >
          <div className="px-4 py-4 space-y-3">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href, item.isExternalPage)}
                className="block text-secondary hover:text-primary font-label-caps text-label-caps py-3 border-b border-outline-variant/30"
              >
                {item.name.toUpperCase()}
              </Link>
            ))}
            <div className="pt-2 border-t border-gray-100">
              <LanguageSwitcher />
            </div>
          </div>
        </Motion.div>
      )}
    </Motion.nav>
  );
};

export default Navbar;
