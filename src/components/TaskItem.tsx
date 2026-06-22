import { Task } from '../types/task';
import { FaTrash, FaCheck, FaTimes, FaEdit, FaCopy, FaArchive, FaUndo } from 'react-icons/fa';

interface TaskItemProps {
  task: Task;
  onToggleStatus: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit?: (task: Task) => void;
  showDetails?: boolean;
  duplicateTask?: (id: string) => void;
  archiveTask?: (id: string) => void;
  restoreTask?: (id: string) => void;
}

// Priority color mapping for border
const priorityBorderColors = {
  low: 'border-l-green-500',
  medium: 'border-l-yellow-400',
  high: 'border-l-red-500',
};

// Priority badge colors
const priorityBadgeColors = {
  low: 'bg-green-50 text-green-700 border-green-200',
  medium: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  high: 'bg-red-50 text-red-700 border-red-200',
};

const TaskItem = ({ task, onToggleStatus, onDelete, onEdit, showDetails, duplicateTask, archiveTask, restoreTask }: TaskItemProps) => {
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'completed';
  
  return (
    <div
      className={`bg-white rounded-xl shadow-sm border border-gray-100 border-l-4 p-4 transition-all hover:shadow-md
        ${task.archived ? 'opacity-50' : ''} ${
        task.status === 'completed'
          ? 'border-l-green-500 opacity-60'
          : priorityBorderColors[task.priority]
      }`}
    >
      <div className="flex flex-col sm:flex-row items-start justify-between gap-3">
        <div className="flex-1 min-w-0 w-full">
          {/* Title and badges */}
          <div className="flex flex-wrap items-start gap-2 mb-2">
            <h3
              className={`font-semibold text-base break-words ${
                task.status === 'completed'
                  ? 'line-through text-gray-400'
                  : 'text-gray-900'
              }`}
            >
              {task.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              <span
                className={`px-2.5 py-0.5 rounded-md text-xs font-medium border ${priorityBadgeColors[task.priority]}`}
              >
                {task.priority}
              </span>
              {task.category && (
                <span className="px-2.5 py-0.5 bg-purple-50 text-purple-700 border border-purple-200 rounded-md text-xs font-medium">
                  {task.category}
                </span>
              )}
              {task.archived && (
                <span className="px-2.5 py-0.5 bg-gray-50 text-gray-700 border border-gray-200 rounded-md text-xs font-medium">
                  Archived
                </span>
              )}
            </div>
          </div>
          
          {/* Description */}
          {showDetails && task.description && (
            <p
              className={`text-sm text-gray-600 mb-3 break-words ${
                task.status === 'completed' ? 'line-through text-gray-400' : ''
              }`}
            >
              {task.description}
            </p>
          )}
          
          {/* Dates */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
            <span className="whitespace-nowrap">
              Created: {new Date(task.createdAt).toLocaleDateString()}
            </span>
            {task.dueDate && (
              <span className={`whitespace-nowrap flex items-center gap-1 ${
                isOverdue ? 'text-red-600 font-medium' : ''
              }`}>
                {isOverdue && '⚠️'} Due: {new Date(task.dueDate).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>
        
        {/* Action buttons */}
        <div className="flex items-center gap-1.5 sm:ml-4 flex-shrink-0">
        { !task.archived && archiveTask && (
              <button
                onClick={() => archiveTask(task.id)}
                className="p-2 rounded-lg bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors"
                aria-label="Archive task"
                title="Archive task"
              >
                <FaArchive size={14} />
              </button>
            )}
            {task.archived && restoreTask && (
              <button
                onClick={() => restoreTask(task.id)}
                className="p-2 rounded-lg bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors"
                aria-label="Restore task"
                title="Restore task"
              >
                <FaUndo size={14} />
              </button>
            )}
          {duplicateTask && (
            <button
              onClick={() => duplicateTask(task.id)}
              className="p-2 rounded-lg bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors"
              aria-label="Duplicate task"
              title="Duplicate task"
            >
              <FaCopy size={14} />
            </button>
          )}
          
          <button
            onClick={() => onToggleStatus(task.id)}
            className={`p-2 rounded-lg transition-colors ${
              task.status === 'completed'
                ? 'bg-green-50 text-green-600 hover:bg-green-100'
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
            }`}
            aria-label={task.status === 'completed' ? 'Mark as pending' : 'Mark as completed'}
            title={task.status === 'completed' ? 'Mark as pending' : 'Mark as completed'}
          >
            {task.status === 'completed' ? (
              <FaCheck size={14} />
            ) : (
              <FaTimes size={14} />
            )}
          </button>
          {onEdit && (
            <button
              onClick={() => onEdit(task)}
              className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
              aria-label="Edit task"
              title="Edit task"
            >
              <FaEdit size={14} />
            </button>
          )}
          <button
            onClick={() => onDelete(task.id)}
            className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
            aria-label="Delete task"
            title="Delete task"
          >
            <FaTrash size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
