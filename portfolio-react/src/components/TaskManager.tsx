import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Task, Priority } from '../types/task';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';
import { useTaskContext } from '../context/TaskContext';
import { FaDownload, FaUpload, FaTimes } from 'react-icons/fa';
type SortOption = 'date-desc' | 'date-asc' | 'priority' | 'title';

const TaskManager = () => {
  const { state, addTask, updateTask, deleteTask, toggleStatus, clearCompletedTasks, duplicateTask, exportTasks, importTasks } = useTaskContext();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [showStatistics, setShowStatistics] = useState(true);
  const [priorityFilter, setPriorityFilter] = useState<Priority | 'all'>('all');
  const [sortBy, setSortBy] = useState<SortOption>('date-desc');
  const [searchQuery, setSearchQuery] = useState('');

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Computed values
  const tasks = state.tasks;
  const completedCount = tasks.filter(t => t.status === 'completed').length;
  const pendingCount = tasks.filter(t => t.status === 'pending').length;

  // Form handlers
  const handleFormSubmit = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    if (editingTask) {
      updateTask(editingTask.id, taskData);
    } else {
      addTask(taskData);
    }
    setShowForm(false);
    setEditingTask(null);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleImportChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (text) importTasks(text);
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const filteredTasks = priorityFilter === 'all'
    ? tasks
    : tasks.filter(task => task.priority === priorityFilter);

  const getSortedTasks = (tasksToSort: Task[]) => {
    const sortedTasks = [...tasksToSort];

    switch (sortBy) {
      case 'date-desc':
        return sortedTasks.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      case 'date-asc':
        return sortedTasks.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
      case 'priority':
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return sortedTasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
      case 'title':
        return sortedTasks.sort((a, b) => a.title.localeCompare(b.title));
      default:
        return sortedTasks;
    }
  };

  const searchedTasks = filteredTasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayTasks = getSortedTasks(searchedTasks);


  return (
    <section id="task-manager" className="py-20 bg-gray-50" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4">
            Task <span className="text-gradient">Manager</span>
          </h2>
          <div className="w-20 h-1 bg-primary-600 mx-auto mb-8"></div>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            Manage your tasks efficiently. Add, complete, and organize your daily tasks.
          </p>
          {!showForm && (
            <button
              onClick={() => {
                setEditingTask(null);
                setShowForm(true);
              }}
              className="px-6 py-3 bg-primary-600 text-white rounded-full font-medium hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl"
            >
              Add New Task
            </button>
          )}
        </motion.div>

        {/* Toolbar - responsive: stacked on mobile, single row on desktop */}
        {!showForm && tasks.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="mb-8 max-w-4xl mx-auto"
          >
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Search - Full width on mobile, flex-1 on desktop */}
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 shadow-sm text-sm"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <FaTimes size={14} />
                  </button>
                )}
              </div>

              {/* Filter & Sort - Together in one row */}
              <div className="flex items-center gap-3">
                {/* Filter */}
                <div className="flex items-center gap-2 flex-1 sm:flex-none">
                  <label className="text-gray-600 font-medium text-sm whitespace-nowrap">Filter:</label>
                  <select
                    value={priorityFilter}
                    onChange={(e) => setPriorityFilter(e.target.value as Priority | 'all')}
                    className="flex-1 sm:w-auto px-3 py-2 bg-white text-gray-800 rounded-lg border border-gray-300 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30 cursor-pointer text-sm"
                  >
                    <option value="all">All</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                {/* Sort */}
                <div className="flex items-center gap-2 flex-1 sm:flex-none">
                  <label className="text-gray-600 font-medium text-sm whitespace-nowrap">Sort:</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="flex-1 sm:w-auto px-3 py-2 bg-white text-gray-800 rounded-lg border border-gray-300 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30 cursor-pointer text-sm"
                  >
                    <option value="date-desc">Newest</option>
                    <option value="date-asc">Oldest</option>
                    <option value="priority">Priority</option>
                    <option value="title">A-Z</option>
                  </select>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Task Form */}
        {showForm && (
          <TaskForm
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
            initialTask={editingTask}
          />
        )}

        {/* Tasks List */}
        {tasks.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="text-center py-12"
          >
            <p className="text-gray-500 text-lg">
              No tasks yet. Click "Add New Task" to get started!
            </p>
          </motion.div>
        ) : displayTasks.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="text-center py-12"
          >
            <p className="text-gray-500 text-lg">
              {searchQuery 
                ? `No tasks found for "${searchQuery}"`
                : 'No tasks match the selected filters.'}
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="space-y-4 max-w-4xl mx-auto"
          >
            {displayTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggleStatus={toggleStatus}
                onDelete={deleteTask}
                onEdit={handleEdit}
                duplicateTask={duplicateTask}
                showDetails={true}
              />
            ))}
          </motion.div>
        )}

        {/* Footer Actions */}
        {tasks.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="mt-6 text-center"
          >
            <div className="flex flex-wrap justify-center gap-2">
              <button
                onClick={exportTasks}
                className="px-3 py-1.5 text-sm text-green-700 bg-green-50 rounded-full font-medium hover:bg-green-100 transition-colors inline-flex items-center gap-1.5"
              >
                <FaDownload size={12} /> Export
              </button>
              <label className="px-3 py-1.5 text-sm text-blue-700 bg-blue-50 rounded-full font-medium hover:bg-blue-100 transition-colors inline-flex items-center gap-1.5 cursor-pointer">
                <FaUpload size={12} /> Import
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".json,application/json"
                  onChange={handleImportChange}
                  className="hidden"
                />
              </label>
              <button
                onClick={() => setShowStatistics(!showStatistics)}
                className="px-3 py-1.5 text-sm text-gray-600 bg-gray-100 rounded-full font-medium hover:bg-gray-200 transition-colors"
              >
                {showStatistics ? 'Hide statistics' : 'Show statistics'}
              </button>
              {completedCount > 0 && (
                <button
                  onClick={clearCompletedTasks}
                  className="px-3 py-1.5 text-sm text-amber-800 bg-amber-50 rounded-full font-medium hover:bg-amber-100 transition-colors"
                >
                  Clear Completed ({completedCount})
                </button>
              )}
            </div>
          </motion.div>
        )}

        {/* Statistics */}
        {tasks.length > 0 && showStatistics && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="mt-8 text-center"
          >
            <div className="inline-flex flex-wrap justify-center gap-4 sm:gap-6 bg-white rounded-lg shadow-md p-4 sm:p-6">
              <div className="text-center min-w-[80px]">
                <p className="text-2xl font-bold text-primary-600">{tasks.length}</p>
                <p className="text-sm text-gray-600">Total Tasks</p>
              </div>
              <div className="text-center min-w-[80px]">
                <p className="text-2xl font-bold text-green-600">{completedCount}</p>
                <p className="text-sm text-gray-600">Completed</p>
              </div>
              <div className="text-center min-w-[80px]">
                <p className="text-2xl font-bold text-yellow-600">{pendingCount}</p>
                <p className="text-sm text-gray-600">Pending</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default TaskManager;
