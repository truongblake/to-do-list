import React, { useRef, useState, useEffect } from "react";
import TodoItems from "./TodoItems";

const Todo = () => {
  const [todoList, setTodoList] = useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );

  const inputRef = useRef();

  // Function to add a new todo
  const add = () => {
    const inputText = inputRef.current.value.trim();

    // Prevent empty todos
    if (!inputText) return; 

    const newTodo = {
      id: Date.now(),
      text: inputText,
      isComplete: false,
    };

    setTodoList((prev) => [...prev, newTodo]);
    inputRef.current.value = "";
  };

  // Handle "Enter" key press to add a todo
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      add();
    }
  };

  // Delete a todo by ID
  const deleteTodo = (id) => {
    setTodoList((prev) => prev.filter((todo) => todo.id !== id));
  };

  // Toggle the completion status of a todo
  const toggle = (id) => {
    setTodoList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isComplete: !item.isComplete } : item
      )
    );
  };

  // Save todos to local storage whenever todoList changes
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList]);

  // Auto-focus on the input field on component mount
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className="bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl">
      {/* Title */}
      <div className="flex items-center mt-7 gap-2">
        <h1 className="text-3xl font-semibold">To-Do List</h1>
      </div>
      
      {/* Input Box */}
      <div className="flex items-center my-7 bg-gray-200 rounded-full">
        <input
          onKeyDown={handleKeyDown}
          ref={inputRef}
          className="bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600"
          type="text"
          placeholder="Add your task"
        />
        <button
          onClick={add}
          className="hover:bg-orange-700 border-none rounded-full bg-orange-600 w-32 h-14 text-white text-lg font-medium cursor-pointer"
        >
          ADD
        </button>
      </div>
      
      {/* Todo List */}
      <div>
        {todoList.map((item) => (
          <TodoItems
            key={item.id}
            text={item.text}
            id={item.id}
            isComplete={item.isComplete}
            deleteTodo={deleteTodo}
            toggle={toggle}
          />
        ))}
      </div>
    </div>
  );
};

export default Todo;
