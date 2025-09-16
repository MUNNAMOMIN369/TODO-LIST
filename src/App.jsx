import { useEffect, useState } from "react";
import axios from "axios";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";
import './App.css';

const API_URL = "http://localhost:5000/api/todos";

function App() {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    const res = await axios.get(API_URL);
    setTodos(res.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async (text) => {
    if (!text.trim()) return; // simple validation
    const res = await axios.post(API_URL, { text });
    setTodos([...todos, res.data]);
  };

  const toggleComplete = async (id, completed) => {
    const res = await axios.put(`${API_URL}/${id}`, { completed });
    setTodos(todos.map(todo => (todo._id === id ? res.data : todo)));
  };

  const deleteTodo = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    setTodos(todos.filter(todo => todo._id !== id));
  };

  return (
    <div className="container">
      <h1>Todo List</h1>
      <TodoForm addTodo={addTodo} />
      {todos.length === 0 ? (
        <p>No todos yet. Add one!</p>
      ) : (
        <ul>
          {todos.map(todo => (
            <TodoItem
              key={todo._id}
              todo={todo}
              toggleComplete={toggleComplete}
              deleteTodo={deleteTodo}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
