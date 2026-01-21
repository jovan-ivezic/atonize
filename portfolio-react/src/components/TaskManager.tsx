import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Task } from '../types/task';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';
import { useTaskContext } from '../context/TaskContext';

const TaskManager = () => {
  const { state, addTask, updateTask, deleteTask, toggleStatus } = useTaskContext();
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [showStatistics, setShowStatistics] = useState(true);

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
          <p className="text-gray-600 max-w-2xl mx-auto">
            Manage your tasks efficiently. Add, complete, and organize your daily tasks.
          </p>
        </motion.div>

        {/* Add Task Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="mb-8 flex justify-center gap-4"
        >
          {!showForm ? (
            <>
            <button
              onClick={() => {
                setEditingTask(null);
                setShowForm(true);
              }}
              className="px-6 py-3 bg-primary-600 text-white rounded-full font-medium hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl"
            >
              Add New Task
            </button>
            { tasks.length > 0 && (
              <button onClick={() => setShowStatistics(!showStatistics)} className="px-6 py-3 bg-primary-600 text-white rounded-full font-medium hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl"> {showStatistics ? 'Hide statistics' : 'Show statistics'}
              </button>
            )}
            </>
          ) : null}
        </motion.div>

        {/* Task Form */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-2xl mx-auto"
          >
            <TaskForm
              onSubmit={handleFormSubmit}
              onCancel={handleFormCancel}
              initialTask={editingTask}
            />
          </motion.div>
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
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="space-y-4 max-w-4xl mx-auto"
          >
            {tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggleStatus={toggleStatus}
                onDelete={deleteTask}
                onEdit={handleEdit}
                showDetails={true}
              />
            ))}
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
            <div className="inline-flex gap-6 bg-white rounded-lg shadow-md p-6">
              <div>
                <p className="text-2xl font-bold text-primary-600">{tasks.length}</p>
                <p className="text-sm text-gray-600">Total Tasks</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">{completedCount}</p>
                <p className="text-sm text-gray-600">Completed</p>
              </div>
              <div>
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
