import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaExternalLinkAlt } from 'react-icons/fa';
import projectsData from '../data/projects.json';
import ProjectModal from './ProjectModal';

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
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const Motion = motion;

  const categories: Category[] = [
    { id: 'all', label: 'All Projects' },
    { id: 'react', label: 'React' },
    { id: 'in-progress', label: 'In Progress' },
    { id: 'wordpress', label: 'WordPress' },
    { id: 'rtl', label: 'RTL Websites' },
    { id: 'animation', label: 'CSS Animation' },
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
    <section id="portfolio" className="py-20 bg-gray-50" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4">
            My <span className="text-gradient">Portfolio</span>
          </h2>
          <div className="w-20 h-1 bg-primary-600 mx-auto mb-8"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Here are some of my recent projects. Click on any project to view the live demo.
          </p>
        </Motion.div>

        {/* Filter Buttons */}
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveFilter(category.id)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                activeFilter === category.id
                  ? 'bg-primary-600 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category.label}
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
                  className={`group bg-white rounded-xl overflow-hidden shadow-lg transition-shadow ${
                    isDisabled 
                      ? 'opacity-60 cursor-not-allowed' 
                      : 'hover:shadow-2xl'
                  }`}
                >
                  {isDisabled ? (
                    <div className="block">
                      {/* Project Image */}
                      <div className="relative overflow-hidden aspect-video">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover grayscale"
                        />
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <span className="text-white font-medium px-4 py-2 bg-gray-800/80 rounded-lg">
                            {project.category === 'in-progress' ? 'In Progress' : 'Coming Soon'}
                          </span>
                        </div>
                      </div>

                      {/* Project Info */}
                      <div className="p-6">
                        <h3 className="text-xl font-display font-bold text-gray-500 mb-2">
                          {project.title}
                        </h3>
                        <p className="text-gray-500 text-sm mb-4">
                          {project.description}
                        </p>

                        {/* Technologies */}
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-gray-100 text-gray-500 text-xs rounded-full font-medium"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
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
                          <div className="relative overflow-hidden aspect-video">
                            <img
                              src={project.image}
                              alt={project.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                              <span className="text-white flex items-center gap-2">
                                View Project {isExternalLink && <FaExternalLinkAlt size={14} />}
                              </span>
                            </div>
                          </div>

                          {/* Project Info */}
                          <div className="p-6">
                            <h3 className="text-xl font-display font-bold text-gray-800 mb-2 group-hover:text-primary-600 transition-colors">
                              {project.title}
                            </h3>
                            <p className="text-gray-600 text-sm mb-4">
                              {project.description}
                            </p>

                            {/* Technologies */}
                            <div className="flex flex-wrap gap-2">
                              {project.technologies.map((tech, index) => (
                                <span
                                  key={index}
                                  className="px-3 py-1 bg-primary-50 text-primary-600 text-xs rounded-full font-medium"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
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
                        <Link to={linkTo} className="block">
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
