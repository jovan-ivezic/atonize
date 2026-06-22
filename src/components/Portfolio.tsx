'use client';

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Link } from '../i18n/routing';
import { FaExternalLinkAlt } from 'react-icons/fa';
import projectsData from '../data/projects.json';
import ProjectModal from './ProjectModal';
import { useTranslations } from 'next-intl';

interface Category {
  id: string;
  label: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  link: string;
  technologies: string[];
  hidden?: boolean;
  disabled?: boolean;
  hasModal?: boolean;
  gallery?: string[];
  details?: {
    role: string;
    features: { title: string; description: string }[];
  };
}

const Portfolio = () => {
  const t = useTranslations('Portfolio');
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const Motion = motion;

  const categories: Category[] = [
    { id: 'all', label: 'All Projects' },
    { id: 'b2b', label: 'B2B & Enterprise' },
    { id: 'saas', label: 'SaaS & Web Apps' },
    { id: 'wordpress', label: 'Corporate & CMS' },
    { id: 'other', label: 'Other' },
  ];

  // Filtriraj sakrivene projekte
  const visibleProjects = (projectsData as Project[]).filter((project) => !project.hidden);
  
  const filteredProjects =
    activeFilter === 'all'
      ? visibleProjects
      : visibleProjects.filter((project) => project.category === activeFilter);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <section id="portfolio" className="py-section-gap bg-surface-container-lowest" ref={ref}>
      <div className="container max-w-container-max mx-auto px-margin-mobile md:px-gutter">
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="max-w-2xl"
        >
          <h2 className="font-headline-lg text-headline-lg md:text-[42px] mb-6">
            {t('title_gradient')}
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            {t('description')}
          </p>
        </Motion.div>

        {/* Filter Buttons */}
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-6 mt-12 border-b border-outline-variant/30 pb-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveFilter(category.id)}
              className={`pb-4 font-label-caps text-label-caps transition-all -mb-[17px] ${
                activeFilter === category.id
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-on-surface-variant hover:text-primary border-b-2 border-transparent'
              }`}
            >
              {category.label.toUpperCase()}
            </button>
          ))}
        </Motion.div>

        {/* Projects Grid */}
        <Motion.div
          key={activeFilter}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => {
              const isDisabled = project.disabled === true;
              
              return (
                <Motion.div
                  key={`${activeFilter}-${project.id}`}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  custom={index}
                  className={`group transition-all duration-500 ${
                    isDisabled 
                      ? 'opacity-60 cursor-not-allowed' 
                      : ''
                  }`}
                >
                  {isDisabled ? (
                    <div className="block">
                      {/* Project Image */}
                      <div className="relative overflow-hidden aspect-[4/3] rounded-none mb-6">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover grayscale"
                        />
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <span className="text-white font-medium px-4 py-2 bg-gray-800/80 rounded-none">
                            {project.category === 'in-progress' ? 'In Progress' : 'Coming Soon'}
                          </span>
                        </div>
                      </div>

                      {/* Project Info */}
                      <div className="space-y-3">
                        <div className="flex gap-3 items-center">
                          <span className="text-[10px] font-label-caps tracking-widest text-secondary font-bold">
                            {project.technologies[0]?.toUpperCase()}
                          </span>
                        </div>
                        <h3 className="font-headline-md text-headline-md text-secondary">
                          {project.title}
                        </h3>
                        <p className="text-on-surface-variant font-body-md leading-relaxed">
                          {project.description}
                        </p>
                      </div>
                    </div>
                  ) : (
                    (() => {
                      const isExternalLink = project.link.startsWith('http');
                      const isDirectRoute = project.link.startsWith('/') && !project.link.startsWith('/portfolio/');
                      
                      // Determine link destination
                      const linkTo = isDirectRoute 
                        ? project.link 
                        : `/portfolio/viewer/${project.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`;

                      const linkContent = (
                        <>
                          {/* Project Image */}
                          <div className="relative overflow-hidden aspect-[4/3] rounded-none mb-6">
                            <img
                              src={project.image}
                              alt={project.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                              <span className="text-white font-label-caps flex items-center gap-2">
                                View Project {isExternalLink && <FaExternalLinkAlt size={12} />}
                              </span>
                            </div>
                          </div>

                          {/* Project Info */}
                          <div className="space-y-3">
                            <div className="flex gap-3 items-center flex-wrap">
                              <span className="text-[10px] font-label-caps tracking-widest text-primary font-bold">
                                {project.technologies.slice(0, 3).join(' / ').toUpperCase()}
                              </span>
                            </div>
                            <h3 className="font-headline-md text-headline-md group-hover:text-primary transition-colors">
                              {project.title}
                            </h3>
                            <p className="text-on-surface-variant font-body-md leading-relaxed">
                              {project.description}
                            </p>
                          </div>
                        </>
                      );

                      if (project.hasModal) {
                        return (
                          <div
                            onClick={() => setSelectedProject(project)}
                            className="block cursor-pointer"
                          >
                            {linkContent}
                          </div>
                        );
                      }

                      return isExternalLink ? (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block"
                        >
                          {linkContent}
                        </a>
                      ) : (
                        <Link href={linkTo} className="block">
                          {linkContent}
                        </Link>
                      );
                    })()
                  )}
                </Motion.div>
              );
            })}
          </AnimatePresence>
        </Motion.div>

        {/* Project Count */}
        <Motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 mb-6">
            Showing <span className="font-bold text-primary-600">{filteredProjects.length}</span> of{' '}
            <span className="font-bold">{visibleProjects.length}</span> projects
          </p>
        </Motion.div>

        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <ProjectModal
              project={selectedProject}
              onClose={() => setSelectedProject(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Portfolio;
