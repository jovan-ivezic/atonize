'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { IconType } from 'react-icons';
import { useTranslations } from 'next-intl';
import ContactForm from './ContactForm';

interface ContactInfo {
  icon: IconType;
  title: string;
  value: string;
  link: string | null;
}

interface SocialLink {
  icon: IconType;
  name: string;
  url: string;
  color: string;
}

const Contact = () => {
  const t = useTranslations('Contact');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const contactInfo: ContactInfo[] = [
    {
      icon: FaEnvelope,
      title: t('info.email'),
      value: 'jovanivezic@gmail.com',
      link: 'mailto:jovanivezic@gmail.com',
    },
    {
      icon: FaPhone,
      title: t('info.phone'),
      value: '+387 64 294 3372',
      link: 'tel:+387642943372',
    },
    {
      icon: FaMapMarkerAlt,
      title: t('info.location'),
      value: 'Novi Sad, Serbia',
      link: null,
    },
  ];

  const socialLinks: SocialLink[] = [
    {
      icon: FaGithub,
      name: 'GitHub',
      url: 'https://github.com/jovan-ivezic',
      color: 'hover:text-gray-900',
    },
    {
      icon: FaLinkedin,
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/jovanivezic/',
      color: 'hover:text-blue-600',
    },
    {
      icon: FaEnvelope,
      name: 'Email',
      url: 'mailto:jovanivezic@gmail.com',
      color: 'hover:text-primary',
    },
  ];

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

  return (
    <section id="contact" className="py-section-gap bg-surface" ref={ref}>
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

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16"
        >
          {/* Left Column: Info & Socials */}
          <div className="space-y-8">
            <div className="space-y-6">
              {contactInfo.map((info) => (
                <motion.div
                  key={info.title}
                  variants={itemVariants}
                  className="bg-surface-container-lowest p-6 md:p-8 rounded-xl border border-outline-variant/30 ambient-hover flex items-center gap-6"
                >
                  <div className="flex-shrink-0 inline-flex items-center justify-center w-14 h-14 bg-surface-dim text-primary rounded-full">
                    <info.icon size={24} />
                  </div>
                  <div className="text-left">
                    <h3 className="font-headline-md font-semibold text-on-surface mb-1">
                      {info.title}
                    </h3>
                    {info.link ? (
                      <a
                        href={info.link}
                        className="font-body-md text-secondary hover:text-primary transition-colors text-lg"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="font-body-md text-secondary text-lg">{info.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <motion.div
              variants={itemVariants}
              className="bg-surface-container-lowest p-8 rounded-xl border border-outline-variant/30 ambient-hover"
            >
              <h3 className="text-xl font-headline-md font-semibold text-on-surface mb-6 text-left">
                {t('connect')}
              </h3>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center justify-center w-12 h-12 bg-surface-dim rounded-full text-secondary transition-colors ${social.color}`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column: Form */}
          <motion.div variants={itemVariants} className="h-full">
            <ContactForm />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
