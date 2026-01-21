import { Link } from 'react-router-dom';
import TaskManager from '../components/TaskManager';
import Footer from '../components/Footer';
import { FaArrowLeft } from 'react-icons/fa';

const Tasks = () => {
  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
      <nav className="bg-white shadow-md py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium transition-colors"
          >
            <FaArrowLeft />
            Back to Portfolio
          </Link>
        </div>
      </nav>
      <TaskManager />
      <Footer />
    </div>
  );
};

export default Tasks;
