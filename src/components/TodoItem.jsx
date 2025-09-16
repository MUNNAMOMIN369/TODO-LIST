export default function TodoItem({ todo, toggleComplete, deleteTodo }) {
  return (
    <li className="todo-item">
      <label>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleComplete(todo._id, !todo.completed)}
        />
        <span style={{ marginLeft: '8px', textDecoration: todo.completed ? "line-through" : "none" }}>
          {todo.text}
        </span>
      </label>
      <button onClick={() => deleteTodo(todo._id)}>Delete</button>
    </li>
  );
}
