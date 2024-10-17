import React, { useState } from 'react';
import { X } from 'lucide-react';

interface TaskFormProps {
  onSubmit: (text: string) => void;
  onCancel: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, onCancel }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onSubmit(text.trim());
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="flex items-center">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter a new task"
          className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-r-md hover:bg-blue-600 transition-colors"
        >
          Add
        </button>
      </div>
      <button
        type="button"
        onClick={onCancel}
        className="mt-2 flex items-center justify-center w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
      >
        <X className="mr-2" size={16} />
        Cancel
      </button>
    </form>
  );
};

export default TaskForm;