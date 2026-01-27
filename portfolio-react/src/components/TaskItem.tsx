import { Task } from '../types/task';
import { FaTrash, FaCheck, FaTimes, FaEdit, FaCopy } from 'react-icons/fa';

interface TaskItemProps {
  task: Task;
  onToggleStatus: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit?: (task: Task) => void;
  showDetails?: boolean;
  duplicateTask?: (id: string) => void;
}

// Priority color mapping
const priorityColors = {
  low: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-red-100 text-red-800',
};

const TaskItem = ({ task, onToggleStatus, onDelete, onEdit, showDetails, duplicateTask }: TaskItemProps) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-md p-4 border-l-4 ${
        task.status === 'completed'
          ? 'border-green-500 opacity-75'
          : task.priority === 'high'
          ? 'border-red-500'
          : task.priority === 'medium'
          ? 'border-yellow-500'
          : 'border-green-500'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3
              className={`font-bold text-lg ${
                task.status === 'completed'
                  ? 'line-through text-gray-500'
                  : 'text-gray-800'
              }`}
            >
              {task.title}
            </h3>
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[task.priority]}`}
            >
              {task.priority}
            </span>
            {task.category && (
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                {task.category}
              </span>
            )}
          </div>
          {showDetails && task.description && (
            <p
              className={`text-gray-600 mb-2 ${
                task.status === 'completed' ? 'line-through' : ''
              }`}
            >
              {task.description}
            </p>
          )}
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>
              Created: {new Date(task.createdAt).toLocaleDateString()}
            </span>
            {task.dueDate && (
              <span>
                Due: {new Date(task.dueDate).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 ml-4">
          {duplicateTask && (
            <button
              onClick={() => duplicateTask(task.id)}
              className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
              aria-label="Duplicate task"
            >
              <FaCopy size={16} />
            </button>
          )}
          <button
            onClick={() => onToggleStatus(task.id)}
            className={`p-2 rounded-full transition-colors ${
              task.status === 'completed'
                ? 'bg-green-100 text-green-600 hover:bg-green-200'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            aria-label={task.status === 'completed' ? 'Mark as pending' : 'Mark as completed'}
          >
            {task.status === 'completed' ? (
              <FaCheck size={16} />
            ) : (
              <FaTimes size={16} />
            )}
          </button>
          {onEdit && (
            <button
              onClick={() => onEdit(task)}
              className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
              aria-label="Edit task"
            >
              <FaEdit size={16} />
            </button>
          )}
          <button
            onClick={() => onDelete(task.id)}
            className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
            aria-label="Delete task"
          >
            <FaTrash size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
