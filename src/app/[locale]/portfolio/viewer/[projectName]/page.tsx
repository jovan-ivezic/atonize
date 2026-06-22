import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
import projectsData from '../../../../../data/projects.json';

const createSlug = (title: string): string => {
  return title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
};

export default async function PortfolioViewer({ params }: { params: Promise<{ projectName: string }> }) {
  const resolvedParams = await params;
  const { projectName } = resolvedParams;
  const project = projectsData.find(p => createSlug(p.title) === projectName);

  if (!project) {
    return (
      <div className="min-h-screen grid grid-rows-[auto_1fr]">
        <nav className="bg-white shadow-md py-4 z-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/#portfolio" className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium transition-colors">
              <FaArrowLeft /> Back to Portfolio
            </Link>
          </div>
        </nav>
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-600 text-xl">Project Not Found</p>
        </div>
      </div>
    );
  }

  const r2Url = process.env.NEXT_PUBLIC_PORTFOLIO_URL || 'https://projects.atonize.com';
  let projectUrl = project.link;
  
  if (project.link.startsWith('/portfolio/') && !project.link.includes('/images/')) {
    // Ako počinje sa /portfolio/ (npr. /portfolio/alriyada/home.html), skidamo taj deo
    // i spajamo sa R2 URL-om.
    const path = project.link.replace('/portfolio', '');
    projectUrl = `${r2Url}${path}`;
  } else if (!project.link.startsWith('http')) {
    projectUrl = project.link.startsWith('/') ? project.link : `/${project.link}`;
  }

  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr]">
      <nav className="bg-white shadow-md py-4 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link
              href="/#portfolio"
              className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium transition-colors cursor-pointer"
            >
              <FaArrowLeft />
              Back to Portfolio
            </Link>
            <h2 className="text-lg font-display font-semibold text-gray-800 hidden sm:block">
              {project.title}
            </h2>
          </div>
        </div>
      </nav>

      <div className="w-full h-full overflow-hidden">
        <iframe
          src={projectUrl}
          className="w-full h-full border-0"
          title={project.title}
          style={{ minHeight: 'calc(100vh - 80px)' }}
          allow="fullscreen"
        />
      </div>
    </div>
  );
}
