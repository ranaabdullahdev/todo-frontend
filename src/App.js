// src/App.js
import React, { useState } from 'react';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';

const App = () => {
  const [todos, setTodos] = useState([]);

  const handleTodoCreated = (newTodo) => {
    setTodos([...todos, newTodo]);
  };

  return (
    <div className='p-3'>
     
      <TodoForm onTodoCreated={handleTodoCreated} />
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
};

export default App;