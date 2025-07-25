const todoInput = document.getElementById('todo-input');
const dateInput = document.getElementById('date-input');
const addBtn = document.getElementById('add-btn');
const deleteAllBtn = document.getElementById('delete-all-btn');
const todoList = document.getElementById('todo-list');
const searchInput = document.getElementById('search-input');

let todos = [
  { task: "Belajar JavaScript", date: "2025-07-21", completed: false }
];

function renderTodos(filter = "") {
  todoList.innerHTML = "";
  let filteredTodos = todos.filter(t => t.task.toLowerCase().includes(filter.toLowerCase()));
  
  if (filteredTodos.length === 0) {
    todoList.innerHTML = `<tr><td colspan="4">Tidak ada tugas</td></tr>`;
    return;
  }

  filteredTodos.forEach((todo, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${todo.task}</td>
      <td>${todo.date}</td>
      <td>${todo.completed ? "Selesai" : "Belum"}</td>
      <td>
        <button class="edit-btn" onclick="editTodo(${index})">Edit</button>
        <button class="delete-btn" onclick="deleteTodo(${index})">Hapus</button>
      </td>
    `;
    todoList.appendChild(row);
  });
}

function addTodo() {
  const task = todoInput.value.trim();
  const date = dateInput.value;

  if (!task || !date) {
    alert("Harap isi tugas dan tanggal.");
    return;
  }

  todos.push({ task, date, completed: false });
  todoInput.value = "";
  dateInput.value = "";
  renderTodos(searchInput.value);
}

function deleteTodo(index) {
  todos.splice(index, 1);
  renderTodos(searchInput.value);
}

function editTodo(index) {
  const newTask = prompt("Edit tugas:", todos[index].task);
  if (newTask !== null) {
    todos[index].task = newTask.trim();
    renderTodos(searchInput.value);
  }
}

function deleteAll() {
  if (confirm("Yakin ingin menghapus semua tugas?")) {
    todos = [];
    renderTodos();
  }
}

addBtn.addEventListener("click", addTodo);
deleteAllBtn.addEventListener("click", deleteAll);
searchInput.addEventListener("input", () => renderTodos(searchInput.value));

renderTodos();
