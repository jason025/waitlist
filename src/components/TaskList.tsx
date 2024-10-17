import React from 'react';
import { Check, Trash2 } from 'lucide-react';
import { Task } from '../App';

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggle, onDelete }) => {
  return (
    <ul className="space-y-2">
      {tasks.map((task) => (
        <li
          key={task.id}
          className="flex items-center justify-between bg-gray-50 p-3 rounded-md"
        >
          <div className="flex items-center">
            <button
              onClick={() => onToggle(task.id)}
              className={`mr-2 p-1 rounded-full ${
                task.completed ? 'bg-green-500 text-white' : 'bg-gray-200'
              }`}
            >
              <Check size={16} />
            </button>
            <span
              className={`${
                task.completed ? 'line-through text-gray-500' : 'text-gray-800'
              }`}
            >
              {task.text}
            </span>
          </div>
          <button
            onClick={() => onDelete(task.id)}
            className="text-red-500 hover:text-red-700"
          >
            <Trash2 size={18} />
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;