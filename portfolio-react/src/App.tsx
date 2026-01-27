import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TaskProvider } from './context/TaskContext';
import Home from './pages/Home';
import Tasks from './pages/Tasks';
import PortfolioViewer from './pages/PortfolioViewer';

function App() {
  return (
    <TaskProvider>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/portfolio/viewer/:projectName" element={<PortfolioViewer />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TaskProvider>
  );
}

export default App;
