import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaVuejs,
  FaWordpress,
  FaGitAlt,
  FaSass,
  FaSearch,
} from 'react-icons/fa';
import { SiTailwindcss, SiVite, SiAdobexd, SiTypescript } from 'react-icons/si';
import { IconType } from 'react-icons';

interface Skill {
  name: string;
  icon: IconType;
  color: string;
  level: number;
}

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const skills: Skill[] = [
    { name: 'HTML5', icon: FaHtml5, color: 'text-orange-600', level: 98 },
    { name: 'CSS3/SCSS', icon: FaSass, color: 'text-pink-600', level: 98 },
    { name: 'JavaScript', icon: FaJs, color: 'text-yellow-500', level: 70 },
    { name: 'WordPress', icon: FaWordpress, color: 'text-blue-700', level: 70 },
    { name: 'SEO', icon: FaSearch, color: 'text-green-600', level: 90 },
    { name: 'Git', icon: FaGitAlt, color: 'text-orange-700', level: 90 },
    { name: 'Tailwind CSS', icon: SiTailwindcss, color: 'text-cyan-400', level: 85 },
    { name: 'AdobeXD', icon: SiAdobexd, color: 'text-purple-600', level: 85 },
    { name: 'React', icon: FaReact, color: 'text-cyan-500', level: 35 },
    { name: 'Vue.js', icon: FaVuejs, color: 'text-green-500', level: 30 },
    { name: 'Vite', icon: SiVite, color: 'text-purple-500', level: 50 },
    { name: 'TypeScript', icon: SiTypescript, color: 'text-blue-600', level: 35 },
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
    <section id="skills" className="py-20 bg-white" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4">
            My <span className="text-gradient">Skills</span>
          </h2>
          <div className="w-20 h-1 bg-primary-600 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-6xl mx-auto"
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow border border-gray-100"
            >
              <div className="flex flex-col items-center text-center">
                {/* Icon */}
                <div className={`${skill.color} mb-4`}>
                  <skill.icon size={48} />
                </div>

                {/* Skill Name */}
                <h3 className="font-display font-bold text-gray-800 mb-3">
                  {skill.name}
                </h3>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${skill.level}%` } : {}}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className="bg-primary-600 h-2 rounded-full"
                  />
                </div>
                <span className="text-sm text-gray-500 font-medium">
                  {skill.level}%
                </span>
              </div>
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
          <p className="text-gray-600 italic">
            Always learning and exploring new technologies to stay current with industry trends
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
