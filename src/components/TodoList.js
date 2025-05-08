import React, { useState, useEffect } from 'react';
import { fetchTodos, deleteTodo, updateTodo } from '../api';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTodos = async () => {
      try {
        setLoading(true);
        const data = await fetchTodos();
        setTodos(data.todos);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch todos:', err);
        setError('Failed to load tasks. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    getTodos();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (err) {
      console.error('Failed to delete todo:', err);
      setError('Failed to delete task. Please try again.');
    }
  };

  const handleToggleComplete = async (id, completed) => {
    try {
      const updatedTodo = await updateTodo(id, { completed: !completed });
      setTodos(todos.map(todo => (todo._id === id ? updatedTodo : todo)));
    } catch (err) {
      console.error('Failed to update todo:', err);
      setError('Failed to update task status. Please try again.');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-xl overflow-hidden max-w-md mx-auto border border-gray-200 mt-6">
      {/* Header Bar - LinkedIn Style */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-500 p-4">
        <h2 className="text-xl font-bold text-white">My Tasks</h2>
        <p className="text-blue-100 text-sm">
          {todos.length} {todos.length === 1 ? 'task' : 'tasks'} on your list
        </p>
      </div>

      {/* Content Area */}
      <div className="p-1">
        {loading ? (
          <div className="flex justify-center items-center p-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-600 p-4 rounded-md m-4">
            <p>{error}</p>
          </div>
        ) : todos.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 text-gray-500">
            <svg className="w-16 h-16 mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path>
            </svg>
            <p className="text-center">No tasks yet. Add your first task to get started!</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {todos.map(todo => (
              <li key={todo._id} className="group hover:bg-blue-50 transition-colors duration-150">
                <div className="flex items-center py-3 px-4">
                  <button
                    onClick={() => handleToggleComplete(todo._id, todo.completed)}
                    className={`flex-shrink-0 h-5 w-5 rounded border ${
                      todo.completed 
                        ? 'bg-blue-600 border-blue-600 flex items-center justify-center' 
                        : 'border-gray-300 hover:border-blue-500'
                    } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-3`}
                    aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
                  >
                    {todo.completed && (
                      <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 12 12">
                        <path d="M3.72 7.96l-1.68-1.48L1 7.54l2.72 2.42L11 3.82l-1.04-1.06z" />
                      </svg>
                    )}
                  </button>
                  
                  <span 
                    className={`flex-grow text-gray-700 cursor-pointer ${
                      todo.completed ? 'line-through text-gray-400' : ''
                    }`}
                    onClick={() => handleToggleComplete(todo._id, todo.completed)}
                  >
                    {todo.title}
                  </span>
                  
                  <button
                    onClick={() => handleDelete(todo._id)}
                    className="flex-shrink-0 ml-2 p-1 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50 opacity-0 group-hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-red-500 transition-opacity duration-150"
                    aria-label="Delete task"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Footer */}
      {!loading && !error && todos.length > 0 && (
        <div className="bg-gray-50 px-4 py-3 border-t border-gray-200 text-xs text-gray-500">
          <p className="text-center">
            {todos.filter(todo => todo.completed).length} of {todos.length} tasks completed
          </p>
        </div>
      )}
    </div>
  );
};

export default TodoList;