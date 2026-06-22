'use client';
import { useState, useEffect } from 'react';
import { Task, Priority, Category, CATEGORIES, PRIORITIES } from '../types/task';
import { FaTimes } from 'react-icons/fa';

interface TaskFormProps {
  onSubmit: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  onCancel?: () => void;
  initialTask?: Task | null;
}

const TaskForm = ({ onSubmit, onCancel, initialTask }: TaskFormProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [category, setCategory] = useState<Category | ''>('');
  const [dueDate, setDueDate] = useState('');
  const [notes, setNotes] = useState('');

  // Blokiraj scroll na body-u kada je modal otvoren
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Populate form if editing
  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title);
      setDescription(initialTask.description);
      setPriority(initialTask.priority);
      setCategory(initialTask.category || '');
      setDueDate(
        initialTask.dueDate
          ? new Date(initialTask.dueDate).toISOString().split('T')[0]
          : ''
      );
      setNotes(initialTask.notes || '');
    }
  }, [initialTask]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation
    if (title.trim().length < 3) {
      alert('Title must be at least 3 characters');
      return;
    }

    if (dueDate) {
      const selectedDate = new Date(dueDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        alert('Due date cannot be in the past');
        return
      }
    }

    if (description.length > 500) {
      alert('Description  must be less than 500 caracters');
      return;
    }

    const taskData: Omit<Task, 'id' | 'createdAt'> = {
      title: title.trim(),
      description: description.trim(),
      priority,
      status: initialTask?.status || 'pending',
      category: category || undefined,
      dueDate: dueDate ? new Date(dueDate) : undefined,
      notes: notes.trim(),
    };

    onSubmit(taskData);
  };

  return (
    /* Modal Overlay */
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onCancel}
    >
      {/* Modal Content */}
      <div 
        className="bg-white rounded-xl shadow-lg p-4 sm:p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
          <h3 className="text-xl font-semibold text-gray-900">
            {initialTask ? 'Edit Task' : 'Add Task'}
          </h3>
          {onCancel && (
            <button
              onClick={onCancel}
              className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
              type="button"
            >
              <FaTimes size={18} className="text-gray-400" />
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
              placeholder="Enter task title"
              required
              minLength={3}
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 resize-none"
              placeholder="Enter task description (optional)"
            />
          </div>

          {/* Priority and Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2">
                Priority
              </label>
              <select
                id="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value as Priority)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 cursor-pointer"
              >
                {PRIORITIES.map((p) => (
                  <option key={p} value={p}>
                    {p.charAt(0).toUpperCase() + p.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value as Category | '')}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 cursor-pointer"
              >
                <option value="">Select a category</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Due Date */}
          <div>
            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-2">
              Due Date
            </label>
            <input
              type="date"
              id="dueDate"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
            />
          </div>

          {/* Notes */}
          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
              Notes
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 resize-none"
              placeholder="Additional notes (optional)"
            />
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="px-6 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              {initialTask ? 'Update Task' : 'Add Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
