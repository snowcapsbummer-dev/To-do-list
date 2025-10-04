const form = document.getElementById("todo-form");
const taskInput = document.getElementById("task");
const dateInput = document.getElementById("date");
const todoList = document.getElementById("todo-list");

let todos = [];

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const task = taskInput.value.trim();
  const date = dateInput.value;

  if (!task || !date) return;

  const todo = { id: Date.now(), task, date };
  todos.push(todo);

  renderTodos();
  form.reset();
});

function renderTodos(filter = "all") {
  todoList.innerHTML = "";

  let filtered = todos;
  const today = new Date().toISOString().split("T")[0];

  if (filter === "today") {
    filtered = todos.filter(t => t.date === today);
  } else if (filter === "upcoming") {
    filtered = todos.filter(t => t.date > today);
  }

  if (filtered.length === 0) {
    todoList.innerHTML = "<p style='text-align:center'>No task found</p>";
    return;
  }

  filtered.forEach(todo => {
    const li = document.createElement("li");
    li.className = "todo-item";
    li.innerHTML = `
      <span>${todo.task} - ${todo.date}</span>
      <button class="delete-btn" onclick="deleteTodo(${todo.id})">Delete</button>
    `;
    todoList.appendChild(li);
  });
}

function deleteTodo(id) {
  todos = todos.filter(todo => todo.id !== id);
  renderTodos();
}

document.getElementById("filter-all").addEventListener("click", () => renderTodos("all"));
document.getElementById("filter-today").addEventListener("click", () => renderTodos("today"));
document.getElementById("filter-upcoming").addEventListener("click", () => renderTodos("upcoming"));