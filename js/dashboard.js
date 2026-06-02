// ===== DASHBOARD SCRIPT =====

function loadDashboardStats() {
  const notes = Storage.get('notes', []);
  const tasks = Storage.get('tasks', []);
  const goals = Storage.get('goals', []);
  
  const notesCount = document.getElementById('notes-count');
  const tasksCount = document.getElementById('tasks-count');
  const goalsCount = document.getElementById('goals-count');
  const activityCount = document.getElementById('activity-count');
  
  if (notesCount) notesCount.textContent = notes.length;
  if (tasksCount) tasksCount.textContent = tasks.filter(t => !t.completed).length;
  if (goalsCount) goalsCount.textContent = goals.length;
  if (activityCount) activityCount.textContent = notes.length + tasks.length;
  
  loadTodayTasks(tasks);
  loadRecentNotes(notes);
}

function loadTodayTasks(tasks) {
  const container = document.getElementById('today-tasks');
  if (!container) return;
  
  const today = new Date().toDateString();
  const todayTasks = tasks.filter(t => new Date(t.dueDate).toDateString() === today);
  
  if (todayTasks.length === 0) {
    container.innerHTML = '<p>Nuk ka detyra për sot</p>';
    return;
  }
  
  container.innerHTML = todayTasks.map(task => `
    <div class="task-item">
      <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask('${task.id}')">
      <h4>${task.title}</h4>
      <p>${task.description || ''}</p>
    </div>
  `).join('');
}

function loadRecentNotes(notes) {
  const container = document.getElementById('recent-notes');
  if (!container) return;
  
  const recentNotes = notes.slice(0, 5);
  
  if (recentNotes.length === 0) {
    container.innerHTML = '<p>Nuk ka shënime</p>';
    return;
  }
  
  container.innerHTML = recentNotes.map(note => `
    <div class="note-item">
      <h4>${note.title}</h4>
      <p>${note.content.substring(0, 100)}...</p>
      <small>${formatDate(note.updated)}</small>
    </div>
  `).join('');
}

function toggleTask(taskId) {
  const tasks = Storage.get('tasks', []);
  const task = tasks.find(t => t.id === taskId);
  if (task) {
    task.completed = !task.completed;
    Storage.set('tasks', tasks);
    loadDashboardStats();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  loadDashboardStats();
});
