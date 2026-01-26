import { useParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import projectsData from '../data/projects.json';

// Helper funkcija za kreiranje slug-a iz title-a
const createSlug = (title: string): string => {
  return title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
};

const PortfolioViewer = () => {
  const { projectName } = useParams<{ projectName: string }>();
  const [projectUrl, setProjectUrl] = useState<string>('');
  const [projectTitle, setProjectTitle] = useState<string>('Portfolio Project');

  const handleBackClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = '/#portfolio';
  };

  useEffect(() => {
    if (projectName) {
      // Pronađi projekat po slug-u (poređenje title-a sa slug-om)
      const project = projectsData.find(p => {
        const projectSlug = createSlug(p.title);
        return projectSlug === projectName;
      });

      if (project) {
        setProjectTitle(project.title);
        // Koristi originalni link iz projekta
        // Za eksterne linkove (http/https) koristi direktno, za interne dodaj leading slash
        if (project.link.startsWith('http')) {
          setProjectUrl(project.link);
        } else {
          setProjectUrl(project.link.startsWith('/') ? project.link : `/${project.link}`);
        }
      } else {
        // Ako projekat nije pronađen, prikaži grešku
        setProjectTitle('Project Not Found');
        setProjectUrl('');
      }
    }
  }, [projectName]);

  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr]">
      {/* Navbar sa dugmetom za povratak */}
      <nav className="bg-white shadow-md py-4 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <a
              href="/#portfolio"
              onClick={handleBackClick}
              className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium transition-colors cursor-pointer"
            >
              <FaArrowLeft />
              Back to Portfolio
            </a>
            <h2 className="text-lg font-display font-semibold text-gray-800 hidden sm:block">
              {projectTitle}
            </h2>
          </div>
        </div>
      </nav>

      {/* Iframe sa portfolio projektom */}
      <div className="w-full h-full overflow-hidden">
        {projectUrl ? (
          <iframe
            src={projectUrl}
            className="w-full h-full border-0"
            title={projectTitle}
            style={{ minHeight: 'calc(100vh - 80px)' }}
            allow="fullscreen"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <p className="text-gray-600 mb-4">Loading project...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PortfolioViewer;
