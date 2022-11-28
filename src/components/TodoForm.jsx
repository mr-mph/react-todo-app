import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function TodoForm(props) {
  const [input, setInput] = useState("");

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (input.trim().length === 0) return;
    props.onSubmit({
      id: uuidv4(),
      text: input,
      completed: false,
    });

    setInput("");
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        placeholder="What's your todo?"
        value={input}
        className="todo-input"
        onChange={handleChange}
      />
      <button className="submit-button">Add Todo</button>
    </form>
  );
}
