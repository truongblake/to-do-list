import React from "react";
import tick from "../assets/tick.png";
import not_tick from "../assets/not_tick.png";
import delete_icon from "../assets/delete.png";

const TodoItems = ({ text, id, isComplete, deleteTodo, toggle }) => {
  return (
    <div className="flex items-center my-3 gap-2 bg-gray-100 p-3 border rounded-md hover:bg-slate-100">
      {/* Task Toggle Area */}
      <div
        onClick={() => toggle(id)}
        className="flex flex-1 min-w-0 items-center cursor-pointer"
      >
        <img
          src={isComplete ? tick : not_tick}
          alt="Status icon"
          className="w-7"
        />
        <p
          className={`ml-4 text-[17px] text-slate-700 decoration-slate-500 ${
            isComplete ? "line-through" : ""
          } break-words`}
        >
          {text}
        </p>
      </div>

      {/* Delete Button */}
      <button
        onClick={() => deleteTodo(id)}
        className="hover:bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center"
        aria-label="Delete task"
      >
        <img
          src={delete_icon}
          alt="Delete icon"
          className="w-3.5 cursor-pointer"
        />
      </button>
      
    </div>
  );
};

export default TodoItems;