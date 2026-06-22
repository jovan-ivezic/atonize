'use client';

import { useState, useRef } from 'react';
import { Task, Priority } from '../types/task';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';
import { useTaskContext } from '../context/TaskContext';
import { FaDownload, FaUpload, FaTimes, FaList, FaCircle, FaCheckCircle, FaChartLine, FaEyeSlash, FaEye, FaArchive } from 'react-icons/fa';
type SortOption = 'date-desc' | 'date-asc' | 'priority' | 'title';

const TaskManager = () => {
  const { 
    state, 
    addTask, 
    updateTask, 
    deleteTask, 
    toggleStatus, 
    clearCompletedTasks, 
    duplicateTask, 
    exportTasks, 
    importTasks, 
    archiveTask, 
    restoreTask 
  } = useTaskContext();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [showForm, setShowForm] = useState(false);

  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const [showStatistics, setShowStatistics] = useState(true);
  const [priorityFilter, setPriorityFilter] = useState<Priority | 'all'>('all');

  const [sortBy, setSortBy] = useState<SortOption>('date-desc');
  const [searchQuery, setSearchQuery] = useState('');

  const [showArchived, setShowArchived] = useState(false);


  // Computed values
  const tasks = state.tasks;
  const activeTasks = tasks.filter(t => !t.archived);
  const completedCount = activeTasks.filter(t => t.status === 'completed').length;
  const pendingCount = activeTasks.filter(t => t.status === 'pending').length;
  const progressPercentage = activeTasks.length > 0 ? Math.round((completedCount / activeTasks.length) * 100) : 0;
  const archivedCount = tasks.filter(t => t.archived).length;  // Koristi 'tasks', ne 'activeTasks'!

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

  const activedOrArchivedTasks = showArchived
    ? tasks.filter(task => task.archived)
    : tasks.filter(task => !task.archived);

  const filteredTasks = priorityFilter === 'all'
    ? activedOrArchivedTasks
    : activedOrArchivedTasks.filter(task => task.priority === priorityFilter);

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
    <section id="task-manager" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        {/* Section Title */}
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4">
            Task <span className="text-gradient">Manager</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            Manage your tasks efficiently. Add, complete, and organize your daily tasks.
          </p>
          {!showForm && (
            <button
              onClick={() => {
                setEditingTask(null);
                setShowForm(true);
              }}
              className="px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors inline-flex items-center gap-2"
            >
              <span className="text-xl">+</span> Add New Task
            </button>
          )}
        </div>

        {/* Statistics Cards */}
        {!showForm && showStatistics && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {/* Total Tasks */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FaList className="text-blue-600 text-lg" />
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Total</p>
                  <p className="text-2xl font-bold text-gray-900">{activeTasks.length}</p>
                </div>
              </div>
            </div>

            {/* Active Tasks */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FaCircle className="text-yellow-600 text-lg" />
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Active</p>
                  <p className="text-2xl font-bold text-gray-900">{pendingCount}</p>
                </div>
              </div>
            </div>

            {/* Completed Tasks */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FaCheckCircle className="text-green-600 text-lg" />
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Completed</p>
                  <p className="text-2xl font-bold text-gray-900">{completedCount}</p>
                </div>
              </div>
            </div>

            {/* Progress */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FaChartLine className="text-purple-600 text-lg" />
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Progress</p>
                  <p className="text-2xl font-bold text-gray-900">{progressPercentage}%</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Toolbar - responsive: stacked on mobile, single row on desktop */}
        {!showForm && tasks.length > 0 && (
          <div className="mb-6">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3">
                {/* Search - Full width on mobile, flex-1 on desktop */}
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Search tasks..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2.5 pr-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
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
                  <div className="flex items-center gap-2">
                    <label className="text-gray-600 font-medium text-sm whitespace-nowrap">Filter:</label>
                    <select
                      value={priorityFilter}
                      onChange={(e) => setPriorityFilter(e.target.value as Priority | 'all')}
                      className="px-3 py-2.5 bg-white text-gray-800 rounded-lg border border-gray-200 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer text-sm"
                    >
                      <option value="all">All</option>
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>

                  {/* Sort */}
                  <div className="flex items-center gap-2">
                    <label className="text-gray-600 font-medium text-sm whitespace-nowrap">Sort:</label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as SortOption)}
                      className="px-3 py-2.5 bg-white text-gray-800 rounded-lg border border-gray-200 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer text-sm"
                    >
                      <option value="date-desc">Newest</option>
                      <option value="date-asc">Oldest</option>
                      <option value="priority">Priority</option>
                      <option value="title">A-Z</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">
              No tasks yet. Click "Add New Task" to get started!
            </p>
          </div>
        ) : displayTasks.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">
              {searchQuery 
                ? `No tasks found for "${searchQuery}"`
                : 'No tasks match the selected filters.'}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {displayTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggleStatus={toggleStatus}
                onDelete={deleteTask}
                onEdit={handleEdit}
                duplicateTask={duplicateTask}
                showDetails={true}
                archiveTask={archiveTask}
                restoreTask={restoreTask}
              />
            ))}
          </div>
        )}

        {/* Footer Actions */}
        {tasks.length > 0 && (
          <div className="mt-6 flex flex-col sm:flex-row flex-wrap justify-center gap-3">
            <button
              onClick={exportTasks}
              className="w-full sm:w-auto px-4 py-2.5 text-sm text-gray-700 bg-white border border-gray-200 rounded-lg font-medium hover:bg-gray-50 transition-colors inline-flex items-center justify-center gap-2 shadow-sm"
            >
              <FaDownload size={14} /> Export
            </button>
            <label className="w-full sm:w-auto px-4 py-2.5 text-sm text-gray-700 bg-white border border-gray-200 rounded-lg font-medium hover:bg-gray-50 transition-colors inline-flex items-center justify-center gap-2 cursor-pointer shadow-sm">
              <FaUpload size={14} /> Import
              <input
                ref={fileInputRef}
                type="file"
                accept=".json,application/json"
                onChange={handleImportChange}
                className="hidden"
              />
            </label>
            {completedCount > 0 && (
              <button
                onClick={clearCompletedTasks}
                className="w-full sm:w-auto px-4 py-2.5 text-sm text-gray-700 bg-white border border-gray-200 rounded-lg font-medium hover:bg-gray-50 transition-colors shadow-sm"
              >
                Clear Completed ({completedCount})
              </button>
            )}
            <button
              onClick={() => setShowStatistics(!showStatistics)}
              className="w-full sm:w-auto px-4 py-2.5 text-sm text-gray-700 bg-white border border-gray-200 rounded-lg font-medium hover:bg-gray-50 transition-colors inline-flex items-center justify-center gap-2 shadow-sm"
            >
              {showStatistics ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
              {showStatistics ? 'Hide Statistics' : 'Show Statistics'}
            </button>
            {(archivedCount > 0 || showArchived) && ( 
              <button
                onClick={() => setShowArchived(!showArchived)}
                className="w-full sm:w-auto px-4 py-2.5 text-sm text-gray-700 bg-white border border-gray-200 rounded-lg font-medium hover:bg-gray-50 transition-colors inline-flex items-center justify-center gap-2 shadow-sm"
              >
                <FaArchive size={14} />
                {showArchived 
                  ? 'Hide Archived' 
                  : `Show Archived ${archivedCount > 0 ? `(${archivedCount})` : ''}`
                }
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default TaskManager;
