import React from "react";

const TodoItem = ({
  title,
  description,
  isCompleted,
  id,
  updateHandler,
  deleteHandler,
}) => {
  return (
    <>
      <div className="todo">
        <div>
          <h4>{title}</h4>
          <p>{description}</p>
        </div>
        <div>
          <input
            type="checkbox"
            onChange={() => updateHandler(id)}
            checked={isCompleted}
          />
          <button onClick={() => deleteHandler(id)} className="btn">
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default TodoItem;
