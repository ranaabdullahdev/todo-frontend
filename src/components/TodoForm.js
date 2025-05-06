import React, { useState } from 'react';
import { createTodo } from '../api';

const TodoForm = ({ onTodoCreated }) => {
  const [title, setTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    setIsSubmitting(true);
    try {
      const newTodo = { title };
      const createdTodo = await createTodo(newTodo);
      onTodoCreated(createdTodo);
      setTitle('');
    } catch (error) {
      console.error('Failed to create todo:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-xl overflow-hidden max-w-md mx-auto border border-gray-200">
      {/* Header Bar - LinkedIn Style */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-500 p-4">
        <h2 className="text-xl font-bold text-white">Add New Task</h2>
        <p className="text-blue-100 text-sm">Organize your work efficiently</p>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit} className="p-5">
        <div className="mb-4">
          <label htmlFor="taskTitle" className="block text-sm font-medium text-gray-700 mb-1">
            Task Title
          </label>
          <div className="relative">
            <input
              id="taskTitle"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What needs to be done?"
              className="w-full p-3 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-gray-700"
              required
            />
            {title && (
              <button
                type="button"
                onClick={() => setTitle('')}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                aria-label="Clear input"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !title.trim()}
          className={`w-full py-3 px-4 rounded-full font-medium text-white transition-colors duration-200 flex items-center justify-center
            ${isSubmitting || !title.trim() 
              ? 'bg-blue-300 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'}`}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Adding...
            </>
          ) : (
            <>
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              Add Task
            </>
          )}
        </button>
      </form>

      {/* Bottom Bar */}
      <div className="bg-gray-50 px-5 py-3 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          Stay organized and boost your productivity
        </p>
      </div>
    </div>
  );
};

export default TodoForm;