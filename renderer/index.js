"use strict";

const { ipcRenderer } = require("electron");

const deleteTodo = (e) => {
  ipcRenderer.send("delete-todo", e.target.textContent);
};

document.getElementById("createTodoBtn").addEventListener("click", (e) => {
  ipcRenderer.send("add-todo-window");
});

ipcRenderer.on("todos", (event, todos) => {
  const todoList = document.getElementById("todoList");

  todoList.innerHTML = todos.reduce(
    (prev, curr) => prev + `<li class="todo-item">${curr}</li>`,
    ""
  );

  todoList.querySelectorAll(".todo-item").forEach((item) => {
    item.addEventListener("click", deleteTodo);
  });
});
