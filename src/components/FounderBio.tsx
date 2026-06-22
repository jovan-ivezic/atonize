'use client';
import { motion as Motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { useTranslations } from 'next-intl';

interface Stat {
  number: string;
  label: string;
}

const FounderBio = () => {
  const t = useTranslations('AboutFounder');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const stats: Stat[] = [
    { number: '13+', label: t('stats.exp_years') },
    { number: '100+', label: t('stats.projects') },
    { number: '3+', label: t('stats.seo_years') },
    { number: '100%', label: t('stats.commitment') },
  ];

  return (
    <section id="about" className="py-20 bg-white" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Section Title */}
          <Motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4">
              {t('title_first')} <span className="text-gradient">{t('title_gradient')}</span>
            </h2>
            <div className="w-20 h-1 bg-primary-600 mx-auto"></div>
          </Motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
            {/* Left Column - Text */}
            <Motion.div variants={itemVariants} className="space-y-5">
              <h3 className="text-2xl font-display font-bold text-gray-800">
                {t('role')}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t.rich('p1', { strong: (chunks) => <strong>{chunks}</strong> })}
              </p>
              <p className="text-gray-600 leading-relaxed">
                {t.rich('p2', { strong: (chunks) => <strong>{chunks}</strong> })}
              </p>
              <p className="text-gray-600 leading-relaxed">
                {t.rich('p3', { strong: (chunks) => <strong>{chunks}</strong> })}
              </p>
              <p className="text-gray-600 leading-relaxed">
                {t.rich('p4', { strong: (chunks) => <strong>{chunks}</strong> })}
              </p>
              <p className="text-gray-600 leading-relaxed">
                {t.rich('p5', { strong: (chunks) => <strong>{chunks}</strong> })}
              </p>
            </Motion.div>

            {/* Right Column - Stats */}
            <Motion.div variants={itemVariants} className="grid grid-cols-2 gap-6">
              {stats.map((stat) => (
                <Motion.div
                  key={stat.label}
                  className="bg-gradient-to-br from-primary-50 to-blue-50 p-6 rounded-xl text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="text-3xl font-display font-bold text-primary-600 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium text-sm">{stat.label}</div>
                </Motion.div>
              ))}
            </Motion.div>
          </div>
        </Motion.div>
      </div>
    </section>
  );
};

export default FounderBio;
