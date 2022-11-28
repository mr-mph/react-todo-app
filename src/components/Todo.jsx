import { useState } from "react";
import {
  MdCheckBoxOutlineBlank,
  MdCheckBox,
  MdOutlineDeleteOutline,
  MdEdit,
} from "react-icons/md";

export default function Todo(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(props.text);

  const style = {
    textDecoration: props.completed ? "line-through" : "none",
    filter: props.completed ? "opacity(0.5)" : "opacity(1)",
  };

  const toggleEdit = () => {
    setIsEditing((prevState) => !prevState);
  };

  const updateValue = (e) => {
    if (e.target.value.includes("\n")) {
      toggleEdit();
      return;
    }
    setText(e.target.value);
    props.handleUpdate(e.target.value);
  };
  return (
    <li className="todo">
      <div className="actions">
        <i onClick={props.handleRemove}>
          <MdOutlineDeleteOutline />
        </i>
        <i onClick={toggleEdit}>
          <MdEdit />
        </i>
      </div>
      <div className="name" style={style}>
        <i onClick={props.handleComplete}>
          {props.completed ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
        </i>
        {isEditing ? (
          <textarea style={style} value={text} onChange={updateValue}>
            {props.text}
          </textarea>
        ) : (
          props.text
        )}
      </div>
    </li>
  );
}
