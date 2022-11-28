import "./App.scss";
import { useState, useEffect } from "react";
import Todo from "./components/Todo";
import TodoForm from "./components/TodoForm";

export default function App() {
  const [todos, setTodos] = useState(
    window.localStorage.getItem("saved_todos")
      ? JSON.parse(window.localStorage.getItem("saved_todos"))
      : []
  );

  const addTodo = (todo) => {
    setTodos((oldTodos) => [...oldTodos, todo]);
  };

  const removeTodo = (id) => {
    setTodos((oldTodos) => oldTodos.filter((oldTodo) => oldTodo.id !== id));
  };

  const updateTodo = (id, newText) => {
    setTodos((oldTodos) => {
      return oldTodos.map((oldTodo) => {
        return oldTodo.id === id
          ? {
              ...oldTodo,
              text: newText,
            }
          : oldTodo;
      });
    });
  };

  const completeTodo = (id) => {
    setTodos((oldTodos) => {
      return oldTodos.map((oldTodo) => {
        return oldTodo.id === id
          ? {
              ...oldTodo,
              completed: !oldTodo.completed,
            }
          : oldTodo;
      });
    });
  };

  useEffect(() => {
    window.localStorage.setItem("saved_todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div>
      <h1>Todo List</h1>
      <TodoForm onSubmit={addTodo} />
      <ul className="list-group">
        {todos.map((todo) => (
          <Todo
            key={todo.id}
            {...todo}
            handleRemove={() => removeTodo(todo.id)}
            handleComplete={() => completeTodo(todo.id)}
            handleUpdate={(newText) => updateTodo(todo.id, newText)}
          />
        ))}
      </ul>
    </div>
  );
}
