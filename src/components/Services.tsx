'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  FaCode,
  FaSearch,
  FaDatabase,
  FaPaintBrush,
  FaServer,
  FaChartLine,
} from 'react-icons/fa';
import { IconType } from 'react-icons';
import { useTranslations } from 'next-intl';

interface Service {
  name: string;
  icon: IconType;
  color: string;
}

const Services = () => {
  const t = useTranslations('Services');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const services: Service[] = [
    { name: 'Full-Stack Development', icon: FaCode, color: 'text-primary' },
    { name: 'B2B Platforms & CRM', icon: FaDatabase, color: 'text-inverse-primary' },
    { name: 'Technical SEO', icon: FaSearch, color: 'text-primary' },
    { name: 'UI/UX Design', icon: FaPaintBrush, color: 'text-outline' },
    { name: 'Cloud Architecture', icon: FaServer, color: 'text-secondary' },
    { name: 'Digital Strategy', icon: FaChartLine, color: 'text-primary' },
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
    <section id="services" className="py-section-gap bg-surface" ref={ref}>
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
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.name}
              variants={itemVariants}
              className="bg-surface-container-lowest p-10 rounded-xl border border-outline-variant/30 ambient-hover flex flex-col items-center justify-center text-center h-full"
            >
              {/* Icon */}
              <div className={`${service.color} mb-6`}>
                <service.icon size={48} />
              </div>

              {/* Service Name */}
              <h3 className="font-headline-md font-semibold text-secondary text-xl">
                {service.name}
              </h3>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="font-body-md text-on-surface-variant italic serif-italic">
            {t('footer_note')}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
