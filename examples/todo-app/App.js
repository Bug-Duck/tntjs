/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */

const app = new TNT.TNTApp({
  root: document.getElementById("root"),
  onload: (app) => {
    console.log("Hello from TNTjs!");
  },
  variables: {
    todo: [],
    deleteTodo: (todo, reverse = false) => {
      const todoCopy = window.variables.todo;
      for (const i in todoCopy) {
        if (todoCopy[i].id === todo.id) {
          todoCopy[i].completed = !reverse;
          break;
        }
      }
      window.variables.todo = todoCopy;
    },
    showEditPanel: (todo) => {
      window.variables.currentlyEditing = window.variables.currentlyEditing === todo.id ? -1 : todo.id;
    },
    editTodo: (todo) => {
      const todoCopy = window.variables.todo;
      const inputElement = document.getElementById(`edit-${todo.id}`);
      if (!inputElement.value) return;
      for (const i in todoCopy) {
        if (todoCopy[i].id === todo.id) {
          todoCopy[i].text = inputElement.value;
          break;
        }
      }
      window.variables.todo = todoCopy;
      window.variables.currentlyEditing = -1;
    },
    currentlyEditing: -1
  },
});

function addTodo() {
  const inputElement = document.getElementById("todoInput");
  if (!inputElement.value) return;
  app.variables.todo = [
    {
      text: inputElement.value,
      id: Math.round(Math.random() * 100),
      completed: false
    },
    ...app.variables.todo
  ];
  inputElement.value = "";
}
