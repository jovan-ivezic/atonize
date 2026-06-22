'use client';
import { motion as Motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { useTranslations } from 'next-intl';

interface Stat {
  number: string;
  label: string;
}

const About = () => {
  const t = useTranslations('About');
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
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  const stats: Stat[] = [
    { number: '13+', label: t('stats.exp_years') },
    { number: '100+', label: t('stats.projects') },
    { number: '3+', label: t('stats.seo_years') },
    { number: '100%', label: t('stats.commitment') },
  ];

  return (
    <section id="about" className="py-section-gap bg-surface overflow-hidden" ref={ref}>
      <div className="container max-w-container-max mx-auto px-margin-mobile md:px-gutter">
        <Motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="flex flex-col lg:flex-row gap-20 items-center"
        >
          {/* Left Column - Text */}
          <Motion.div variants={itemVariants} className="lg:w-7/12 order-2 lg:order-1">
            <div className="flex items-center gap-4 mb-8">
              <span className="w-8 h-px bg-primary/40"></span>
              <span className="font-label-caps text-label-caps text-primary tracking-[0.2em]">
                {t('title_first').toUpperCase()}
              </span>
            </div>
            <h2 className="font-headline-lg text-headline-lg md:text-[42px] mb-10 font-semibold text-on-surface">
              {t('title_gradient')}
            </h2>
            <div className="space-y-8 font-body-lg text-body-lg text-on-surface-variant leading-relaxed lg:pr-12">
              <p>
                {t.rich('p1', { strong: (chunks) => <strong className="text-on-surface font-semibold italic serif-italic">{chunks}</strong> })}
              </p>
              <p>
                {t.rich('p2', { strong: (chunks) => <strong className="text-on-surface font-semibold">{chunks}</strong> })}
              </p>
              <p>
                {t.rich('p3', { strong: (chunks) => <strong className="text-on-surface font-semibold">{chunks}</strong> })}
              </p>
              <p>
                {t.rich('p4', { strong: (chunks) => <strong className="text-on-surface font-semibold">{chunks}</strong> })}
              </p>
              <p>
                {t.rich('p5', { strong: (chunks) => <strong className="text-on-surface font-semibold">{chunks}</strong> })}
              </p>
            </div>
          </Motion.div>

          {/* Right Column - Stats */}
          <Motion.div variants={itemVariants} className="lg:w-5/12 order-1 lg:order-2 self-start lg:mt-12">
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <Motion.div
                  key={stat.label}
                  className="bg-surface-container-lowest p-10 border border-outline-variant/60 rounded-xl ambient-hover flex flex-col justify-center"
                  custom={index}
                  variants={{
                    hidden: { opacity: 0, y: 40 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: index * 0.1 } }
                  }}
                >
                  <span className="font-headline-xl text-[48px] text-primary block mb-3 leading-none">
                    {stat.number}
                  </span>
                  <span className="font-label-caps text-[11px] text-secondary tracking-widest uppercase">
                    {stat.label}
                  </span>
                </Motion.div>
              ))}
            </div>
          </Motion.div>
        </Motion.div>
      </div>
    </section>
  );
};

export default About;
