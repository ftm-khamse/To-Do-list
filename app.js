
  const addBtn = document.getElementById('add-btn');
  const todoInput = document.getElementById('todo-input');
  const todoList = document.getElementById('todo-list');

  // Load from localStorage on startup
  window.addEventListener('DOMContentLoaded', loadTodos);

  addBtn.addEventListener('click', addTodo);
  todoInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      addTodo();
    }
  });

  function loadTodos() {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.forEach(task => {
      createTodoItem(task);
    });
  }

  function saveTodos() {
    const allTasks = [];
    document.querySelectorAll('#todo-list li span').forEach(span => {
      allTasks.push(span.textContent);
    });
    localStorage.setItem('todos', JSON.stringify(allTasks));
  }

  function addTodo() {
    const task = todoInput.value.trim();
    if (task === '') return;

    createTodoItem(task);
    saveTodos();

    todoInput.value = '';
    todoInput.focus();
  }

  function createTodoItem(task) {
    const li = document.createElement('li');

    const span = document.createElement('span');
    span.textContent = task;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '×';
    deleteBtn.className = 'delete-btn';

    deleteBtn.addEventListener('click', function() {
      li.remove();
      saveTodos();
    });

    li.appendChild(span);
    li.appendChild(deleteBtn);

    todoList.appendChild(li);
  }