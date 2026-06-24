'use client';
import { motion as Motion } from 'framer-motion';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { FaArrowRight } from 'react-icons/fa';

const Hero = () => {
  const t = useTranslations('Hero');

  return (
    <section id="home" className="pt-32 pb-20 md:pt-40 md:pb-32 flex items-center bg-surface-container-lowest relative overflow-hidden min-h-[85vh]">
      <div className="absolute inset-0 z-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#00236f 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}></div>
      
      {/* Text Content */}
      <div className="container max-w-container-max mx-auto px-margin-mobile md:px-gutter relative z-20 pointer-events-none">
        <div className="max-w-4xl py-20 pointer-events-auto">
          <Motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-headline-xl-mobile md:text-[64px] font-headline-xl text-on-surface leading-tight mb-8"
          >
            {t('greeting')} <span className="text-primary italic serif-italic">Atonize</span>.<br />
            <span className="font-normal">{t('role')}</span>
          </Motion.h1>
          
          <Motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-body-lg font-body-lg text-on-surface-variant max-w-2xl leading-relaxed mb-12"
          >
            {t('description')}
          </Motion.p>

          <Motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex flex-wrap gap-6"
          >
            <Link 
              href="#portfolio"
              className="bg-primary text-on-primary px-8 py-4 rounded-DEFAULT font-label-caps text-label-caps flex items-center gap-3 ambient-hover no-underline shadow-lg shadow-primary/20"
            >
              <span className="font-label-caps">{t('cta_projects').toUpperCase()}</span>
              <FaArrowRight size={16} />
            </Link>
            
            <Link 
              href="#contact" 
              className="border border-outline text-primary px-8 py-4 rounded-DEFAULT font-label-caps text-label-caps hover:bg-surface-container-low transition-all no-underline"
            >
              {t('cta_contact').toUpperCase()}
            </Link>
          </Motion.div>
        </div>
      </div>
      
      {/* Background Graphics (Sun + Mountains) - Wrapped for opacity & layering */}
      <div className="absolute bottom-0 left-0 w-full z-0 pointer-events-none opacity-40">
        
        {/* Animated Sun exactly behind the peak */}
        <div className="absolute bottom-0 left-0 w-full z-0 pointer-events-none" style={{ aspectRatio: '1440/600' }}>
          <Motion.div 
            className="absolute rounded-full bg-gradient-to-tr from-[#ff7e00] via-[#ffaa00] to-[#ffdd66] blur-[2px] shadow-[0_0_80px_rgba(255,170,0,0.4)]"
            style={{
              left: '36.8%',  // 530px / 1440px (peak X)
              top: '36.6%',   // 220px / 600px (peak Y)
              width: '8%',    // ~115px responsive width
              aspectRatio: '1/1',
              marginLeft: '-4%', // Center horizontally
              marginTop: '-4%',  // Center vertically
            }}
            initial={{ y: '80%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{ duration: 2.5, ease: "easeOut", delay: 0.8 }}
          />
        </div>

        {/* Decorative Wave (Athos Mountains) */}
        <div className="relative w-full pointer-events-none z-10 text-primary">
          <svg width="1440" height="600" viewBox="0 0 1440 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            {/* Furthest Mountain */}
            <Motion.g
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
            >
              <path d="M0 600H1440V450C1300 450 1150 300 1000 350C850 400 700 150 500 250C300 350 150 450 0 450V600Z" fill="#ffffff" />
              <path d="M0 600H1440V450C1300 450 1150 300 1000 350C850 400 700 150 500 250C300 350 150 450 0 450V600Z" fill="currentColor" fillOpacity="0.15" />
            </Motion.g>
            
            {/* Middle Mountain */}
            <Motion.g
              initial={{ y: 150, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.4 }}
            >
              <path d="M0 600H1440V500C1350 480 1250 420 1150 450C1000 480 800 320 650 380C500 440 350 520 0 520V600Z" fill="#ffffff" />
              <path d="M0 600H1440V500C1350 480 1250 420 1150 450C1000 480 800 320 650 380C500 440 350 520 0 520V600Z" fill="currentColor" fillOpacity="0.2" />
            </Motion.g>
            
            {/* Closest Peak */}
            <Motion.g
              initial={{ y: 200, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.6 }}
            >
              <path d="M500 250L530 220L560 250H500Z" fill="#ffffff" />
              <path d="M500 250L530 220L560 250H500Z" fill="currentColor" fillOpacity="0.25" />
            </Motion.g>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;
