// ===== TASKS SCRIPT =====

let tasks = Storage.get('tasks', []);
let currentFilter = 'all';

function loadTasks() {
  const container = document.getElementById('tasks-container');
  if (!container) return;

  let filtered = tasks;

  if (currentFilter === 'active') {
    filtered = tasks.filter(t => !t.completed);
  } else if (currentFilter === 'completed') {
    filtered = tasks.filter(t => t.completed);
  }

  if (filtered.length === 0) {
    container.innerHTML = '<p>Nuk ka detyra</p>';
    return;
  }

  container.innerHTML = filtered.map(task => `
    <div class="task-card ${task.completed ? 'completed' : ''}">
      <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask('${task.id}')">
      <div class="task-content">
        <h3>${task.title}</h3>
        <p>${task.description || ''}</p>
        <span class="task-priority priority-${task.priority}">${task.priority}</span>
        <small>${formatDate(task.dueDate)}</small>
      </div>
      <button onclick="deleteTask('${task.id}')">🗑️</button>
    </div>
  `).join('');
}

function addTask() {
  const title = prompt('Titull i detyrës:');
  if (!title) return;

  const newTask = {
    id: generateId(),
    title: title,
    description: '',
    priority: 'medium',
    dueDate: new Date(),
    completed: false,
  };

  tasks.unshift(newTask);
  Storage.set('tasks', tasks);
  loadTasks();
}

function toggleTask(taskId) {
  const task = tasks.find(t => t.id === taskId);
  if (task) {
    task.completed = !task.completed;
    Storage.set('tasks', tasks);
    loadTasks();
  }
}

function deleteTask(taskId) {
  tasks = tasks.filter(t => t.id !== taskId);
  Storage.set('tasks', tasks);
  loadTasks();
}

function filterTasks(filter) {
  currentFilter = filter;

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.remove('active');
  });

  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(btn => {
    if (btn.textContent.includes(filter)) {
      btn.classList.add('active');
    }
  });

  loadTasks();
}

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  loadTasks();
});
