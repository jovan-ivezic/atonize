import { motion as Motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { IconType } from 'react-icons';

interface SocialLink {
  icon: IconType;
  href: string;
  label: string;
}

const Hero = () => {
  const socialLinks: SocialLink[] = [
    { icon: FaGithub, href: 'https://github.com/jovan-ivezic', label: 'GitHub' },
    { icon: FaLinkedin, href: 'https://linkedin.com/in/jovan-ivezic', label: 'LinkedIn' },
    { icon: FaEnvelope, href: 'mailto:your.email@example.com', label: 'Email' },
  ];

  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 pt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          {/* Avatar */}
          <Motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="mb-8"
          >
            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-primary-500 shadow-xl">
              <img
                src="/images/avatar.jpg"
                alt="Jovan Ivezic"
                className="w-full h-full object-cover"
              />
            </div>
          </Motion.div>

          {/* Name & Title */}
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-4">
              Hi, I'm <span className="text-gradient">Jovan Ivezić</span>
            </h1>
            <h2 className="text-xl sm:text-2xl md:text-3xl text-gray-600 mb-6">
              Senior Front-End Developer
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Crafting scalable web solutions with <strong>13+ years of experience</strong> in JavaScript, HTML & SCSS.
              Currently serving as a Team Lead, specializing in architecture and building maintainable SPAs.
            </p>
          </Motion.div>

          {/* CTA Buttons */}
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-4 mb-8"
          >
            <a
              href="#portfolio"
              className="px-8 py-3 bg-primary-600 text-white rounded-full font-medium hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="px-8 py-3 bg-white text-primary-600 border-2 border-primary-600 rounded-full font-medium hover:bg-primary-50 transition-colors"
            >
              Get In Touch
            </a>
          </Motion.div>

          {/* Social Links */}
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex gap-6"
          >
            {socialLinks.map((social) => (
              <Motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-primary-600 transition-colors"
                whileHover={{ scale: 1.2, y: -3 }}
                whileTap={{ scale: 0.9 }}
              >
                <social.icon size={28} />
              </Motion.a>
            ))}
          </Motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <Motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2"></div>
        </div>
      </Motion.div>
    </section>
  );
};

export default Hero;
