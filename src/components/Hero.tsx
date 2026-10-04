'use client';

import { motion as Motion } from 'framer-motion';
import { Link } from '../i18n/routing';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { FaArrowRight, FaExternalLinkAlt, FaChartLine, FaShieldAlt } from 'react-icons/fa';

const Hero = () => {
  const t = useTranslations('Hero');

  const stats = [
    { value: t('stat_experience'), label: t('stat_experience_label') },
    { value: t('stat_perf'), label: t('stat_perf_label') },
    { value: t('stat_delivery'), label: t('stat_delivery_label') },
  ];

  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-[#faf8ff] via-white to-white">
      {/* Subtle Ambient Background Elements */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.035]" 
        style={{ 
          backgroundImage: 'radial-gradient(#0C457B 1px, transparent 1px)', 
          backgroundSize: '24px 24px' 
        }} 
      />
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-16 right-0 w-96 h-96 bg-accent/12 rounded-full blur-3xl pointer-events-none" />

      <div className="container max-w-container-max mx-auto px-margin-mobile md:px-gutter relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Column: Heading, Pitch & CTAs */}
          <div className="lg:col-span-6 xl:col-span-6">
            {/* Pill Eyebrow */}
            <Motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white border border-gray-200/90 shadow-sm text-xs font-semibold text-gray-800 mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>{t('badge')}</span>
            </Motion.div>

            {/* Main Headline in Manrope */}
            <Motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-[52px] font-manrope font-extrabold tracking-[-0.035em] text-gray-950 leading-[1.12] mb-6"
            >
              {t('greeting')} <span className="text-primary">Atonize</span>.<br />
              <span className="text-gray-800 font-bold">{t('role')}</span>
            </Motion.h1>

            {/* Description */}
            <Motion.p 
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-gray-600 font-normal leading-relaxed max-w-xl mb-9"
            >
              {t('description')}
            </Motion.p>

            {/* Action Buttons */}
            <Motion.div 
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 mb-12"
            >
              <Link 
                href="/portfolio"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-lg bg-primary text-white font-medium text-sm shadow-md shadow-primary/20 hover:bg-[#08335c] hover:shadow-lg transition-all"
              >
                <span>{t('cta_projects')}</span>
                <FaArrowRight size={13} />
              </Link>
              
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg border border-gray-300 text-gray-800 font-medium text-sm hover:bg-gray-50 hover:border-gray-400 transition-all bg-white"
              >
                <span>{t('cta_contact')}</span>
              </a>
            </Motion.div>

            {/* Trust Metrics */}
            <Motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="pt-8 border-t border-gray-200/70 grid grid-cols-3 gap-4 sm:gap-8 max-w-lg"
            >
              {stats.map((stat, idx) => (
                <div key={idx}>
                  <div className="text-2xl sm:text-3xl font-manrope font-extrabold text-gray-900 tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500 font-medium mt-0.5 leading-snug">
                    {stat.label}
                  </div>
                </div>
              ))}
            </Motion.div>
          </div>

          {/* Right Column: Real Admin Dashboard Showcase */}
          <div className="lg:col-span-6 xl:col-span-6 relative">
            <Motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              className="relative mx-auto max-w-lg lg:max-w-none"
            >
              {/* Subtle back ambient glow */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-primary/10 via-accent/15 to-transparent rounded-2xl blur-xl opacity-70 pointer-events-none" />

              {/* Elevated Light Browser Frame */}
              <div className="relative rounded-2xl bg-white border border-gray-200/90 shadow-2xl shadow-primary/10 overflow-hidden group">
                
                {/* Browser Top Bar */}
                <div className="px-4 py-2.5 bg-gray-50/95 border-b border-gray-200/80 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-400/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80 inline-block" />
                  </div>
                  
                  {/* Clean URL Bar */}
                  <div className="px-3.5 py-1 rounded-md bg-white border border-gray-200 text-[11px] font-mono text-gray-600 text-center truncate max-w-[240px] shadow-2xs">
                    app.veevio.com/sales/dashboard
                  </div>

                  <span className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Live B2B
                  </span>
                </div>

                {/* Exact Dashboard Screenshot */}
                <div className="relative aspect-[3450/1926] overflow-hidden bg-gray-950">
                  <Image
                    src="/images/dashboard-hero.png"
                    alt="VEEVIO B2B Sales System Admin Dashboard"
                    width={1725}
                    height={963}
                    priority
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.01]"
                  />
                </div>

                {/* Bottom Showcase Info Bar */}
                <div className="p-4 bg-white border-t border-gray-100 flex items-center justify-between gap-4">
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-primary">
                      {t('featured_badge')}
                    </div>
                    <div className="text-sm font-manrope font-bold text-gray-900 mt-0.5">
                      {t('featured_title')}
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5 line-clamp-1">
                      {t('featured_sub')}
                    </div>
                  </div>

                  <Link
                    href="/portfolio"
                    className="shrink-0 px-3.5 py-1.5 rounded-lg bg-gray-100 hover:bg-primary hover:text-white text-gray-700 text-xs font-semibold transition-colors flex items-center gap-1.5"
                  >
                    <span>{t('featured_view')}</span>
                    <FaArrowRight size={10} />
                  </Link>
                </div>
              </div>

            </Motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
