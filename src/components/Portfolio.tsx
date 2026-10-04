'use client';

import { useState, useRef } from 'react';
import { motion as Motion, useInView, AnimatePresence } from 'framer-motion';
import { Link } from '../i18n/routing';
import { FaArrowRight, FaExternalLinkAlt } from 'react-icons/fa';
import projectsData from '../data/projects.json';
import ProjectModal from './ProjectModal';
import { useTranslations } from 'next-intl';

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
  featured?: boolean;
  hasModal?: boolean;
  gallery?: string[];
  details?: {
    role: string;
    features: { title: string; description: string }[];
  };
}

type Variant = 'featured' | 'full';

const FILTERS = ['all', 'b2b', 'saas', 'wordpress', 'other'] as const;
type Filter = (typeof FILTERS)[number];

const visibleProjects = (projectsData as Project[]).filter((p) => !p.hidden);
const featuredProjects = visibleProjects.filter((p) => p.featured);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4 } },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
};

function ProjectCard({ project, onSelect }: { project: Project; onSelect: (p: Project) => void }) {
  const t = useTranslations('Portfolio');
  const isDisabled = project.disabled === true;
  const isExternalLink = project.link.startsWith('http');

  return (
    <div
      onClick={isDisabled ? undefined : () => onSelect(project)}
      className={`block ${isDisabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      <div className="relative overflow-hidden aspect-[4/3] mb-6">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className={`w-full h-full object-cover ${
            isDisabled ? 'grayscale' : 'group-hover:scale-105 transition-transform duration-700'
          }`}
        />
        {isDisabled ? (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-medium px-4 py-2 bg-gray-800/80">
              {t(project.category === 'in-progress' ? 'in_progress' : 'coming_soon')}
            </span>
          </div>
        ) : (
          <>
            <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
              <span className="text-white font-medium flex items-center gap-2">
                {t('view_project')} {isExternalLink && <FaExternalLinkAlt size={12} />}
              </span>
            </div>
          </>
        )}
      </div>

      <div className="space-y-3">
        <span className={`block text-[11px] tracking-widest font-semibold uppercase ${isDisabled ? 'text-secondary' : 'text-primary'}`}>
          {project.technologies.slice(0, 3).join(' / ')}
        </span>
        <h3 className={`font-headline-md text-xl font-bold transition-colors ${isDisabled ? 'text-secondary' : 'group-hover:text-primary'}`}>
          {project.title}
        </h3>
        <p className="text-on-surface-variant font-body-md leading-relaxed line-clamp-3">
          {project.description}
        </p>
      </div>
    </div>
  );
}

const Portfolio = ({ variant = 'full' }: { variant?: Variant }) => {
  const t = useTranslations('Portfolio');
  const [activeFilter, setActiveFilter] = useState<Filter>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const isFeatured = variant === 'featured';
  const Heading = isFeatured ? 'h2' : 'h1';

  const projects = isFeatured
    ? featuredProjects
    : activeFilter === 'all'
      ? visibleProjects
      : visibleProjects.filter((p) => p.category === activeFilter);

  const viewAllLink = (
    <Link
      href="/portfolio"
      className="group/cta inline-flex items-center gap-2 font-semibold text-primary hover:text-primary-container transition-colors"
    >
      {t('view_all', { total: visibleProjects.length })}
      <FaArrowRight size={14} className="transition-transform group-hover/cta:translate-x-1" />
    </Link>
  );

  return (
    <section
      id="portfolio"
      ref={ref}
      className={`bg-surface-container-lowest ${isFeatured ? 'py-section-gap' : 'pt-32 pb-section-gap min-h-screen'}`}
    >
      <div className="container max-w-container-max mx-auto px-margin-mobile md:px-gutter">
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div className="max-w-2xl">
            <Heading className="font-headline-lg text-4xl md:text-[42px] font-bold mb-6">
              {t(isFeatured ? 'title_gradient' : 'page_title')}
            </Heading>
            <p className="font-body-lg text-lg text-on-surface-variant">{t('description')}</p>
          </div>
          {isFeatured && <div className="hidden md:block shrink-0">{viewAllLink}</div>}
        </Motion.div>

        {!isFeatured && (
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-6 mt-12 border-b border-outline-variant/30 pb-4"
          >
            {FILTERS.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`pb-4 text-[15px] font-medium transition-all -mb-[17px] border-b-2 ${
                  activeFilter === filter
                    ? 'text-primary border-primary'
                    : 'text-on-surface-variant hover:text-primary border-transparent'
                }`}
              >
                {t(`filters.${filter}`)}
              </button>
            ))}
          </Motion.div>
        )}

        <Motion.div
          key={activeFilter}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
        >
          <AnimatePresence mode="wait">
            {projects.map((project) => (
              <Motion.div
                key={`${activeFilter}-${project.id}`}
                variants={itemVariants}
                exit="exit"
                className="group transition-all duration-500"
              >
                <ProjectCard project={project} onSelect={setSelectedProject} />
              </Motion.div>
            ))}
          </AnimatePresence>
        </Motion.div>

        <div className="text-center mt-12">
          {isFeatured ? (
            <div className="md:hidden">{viewAllLink}</div>
          ) : (
            <p className="text-on-surface-variant">
              {t.rich('showing', {
                count: projects.length,
                total: visibleProjects.length,
                b: (chunks) => <span className="font-bold text-primary">{chunks}</span>,
              })}
            </p>
          )}
        </div>

        <AnimatePresence>
          {selectedProject && (
            <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Portfolio;
