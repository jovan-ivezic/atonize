'use client';

import { motion as Motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useTranslations } from 'next-intl';

const About = () => {
  const t = useTranslations('About');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const stats = [
    { value: t('stats.exp_value'), label: t('stats.exp_label') },
    { value: t('stats.speed_value'), label: t('stats.speed_label') },
    { value: t('stats.control_value'), label: t('stats.control_label') },
    { value: t('stats.efficiency_value'), label: t('stats.efficiency_label') },
  ];

  return (
    <section id="about" className="py-24 md:py-32 bg-[#faf8ff] border-t border-gray-100 overflow-hidden" ref={ref}>
      <div className="container max-w-container-max mx-auto px-margin-mobile md:px-gutter">
        <Motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center"
        >
          {/* Left Column - Big Story with Few Words */}
          <div className="lg:col-span-7 xl:col-span-7">
            {/* Minimal Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gray-200/90 shadow-2xs text-xs font-semibold text-primary mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="tracking-wider uppercase text-[11px] font-bold">{t('eyebrow')}</span>
            </div>

            {/* Clear, Powerful Headline */}
            <h2 className="font-manrope text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-gray-950 tracking-[-0.035em] leading-[1.18] mb-6">
              {t('title')}
            </h2>

            {/* Single High-Impact Paragraph */}
            <p className="text-base sm:text-lg text-gray-600 font-normal leading-relaxed max-w-2xl">
              {t('description')}
            </p>
          </div>

          {/* Right Column - 4 Minimalist Facts */}
          <div className="lg:col-span-5 xl:col-span-5">
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, idx) => (
                <Motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 16 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                  transition={{ duration: 0.45, delay: 0.1 + idx * 0.06 }}
                  className="p-6 sm:p-7 rounded-2xl bg-white border border-gray-200/80 shadow-xs hover:border-primary/30 hover:shadow-md transition-all flex flex-col justify-between min-h-[140px] group"
                >
                  <div className="text-3xl sm:text-4xl font-manrope font-extrabold text-primary tracking-tight mb-2 group-hover:scale-105 transition-transform origin-left">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-[13px] text-gray-600 font-medium leading-snug">
                    {stat.label}
                  </div>
                </Motion.div>
              ))}
            </div>
          </div>
        </Motion.div>
      </div>
    </section>
  );
};

export default About;
