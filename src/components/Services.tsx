'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  LuCode,
  LuSearch,
  LuDatabase,
} from 'react-icons/lu';
import { IconType } from 'react-icons';
import { useTranslations } from 'next-intl';

interface Service {
  id: string;
  icon: IconType;
}

const Services = () => {
  const t = useTranslations('Services');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const services: Service[] = [
    { id: 'b2b', icon: LuDatabase },
    { id: 'fullstack', icon: LuCode },
    { id: 'seo', icon: LuSearch },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <section id="services" className="py-section-gap bg-surface overflow-x-hidden" ref={ref}>
      <div className="container max-w-container-max mx-auto px-margin-mobile md:px-gutter">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="w-8 h-px bg-primary/40"></span>
            <span className="font-label-caps text-label-caps text-primary tracking-[0.2em]">
              {t('title_first').toUpperCase()}
            </span>
            <span className="w-8 h-px bg-primary/40"></span>
          </div>
          <h2 className="text-headline-lg md:text-[42px] font-headline-lg font-semibold text-on-surface mb-8">
            {t('title_gradient')}
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
            {t('description')}
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              className="bg-surface-container-lowest p-8 rounded-xl border border-outline-variant/40 ambient-hover flex flex-col justify-between text-left h-full group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-11 h-11 rounded-lg bg-surface-container-low border border-outline-variant/50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                    <service.icon size={20} />
                  </div>
                  <span className="font-mono text-xs text-outline/70 tracking-wider">
                    0{index + 1}
                  </span>
                </div>

                <h3 className="font-headline-md font-semibold text-on-surface text-lg mb-3">
                  {t(`items.${service.id}.title`)}
                </h3>

                <p className="text-on-surface-variant font-body-md text-[15px] leading-relaxed">
                  {t(`items.${service.id}.description`)}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
