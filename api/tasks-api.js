// ===== TASKS API =====

const TasksAPI = {
  // Merr të gjithë detyrat
  async getAll() {
    return Storage.get('tasks', []);
  },
  
  // Merr një detyrë të veçantë
  async getById(id) {
    const tasks = Storage.get('tasks', []);
    return tasks.find(t => t.id === id);
  },
  
  // Krijo një detyrë
  async create(title, description = '', priority = 'medium', dueDate = new Date()) {
    const tasks = Storage.get('tasks', []);
    const newTask = {
      id: generateId(),
      title,
      description,
      priority,
      dueDate,
      completed: false
    };
    tasks.unshift(newTask);
    Storage.set('tasks', tasks);
    return newTask;
  },
  
  // Përditëso një detyrë
  async update(id, data) {
    const tasks = Storage.get('tasks', []);
    const task = tasks.find(t => t.id === id);
    if (task) {
      Object.assign(task, data);
      Storage.set('tasks', tasks);
    }
    return task;
  },
  
  // Fshij një detyrë
  async delete(id) {
    let tasks = Storage.get('tasks', []);
    tasks = tasks.filter(t => t.id !== id);
    Storage.set('tasks', tasks);
  },
  
  // Marko si të përfunduar
  async markComplete(id) {
    return this.update(id, { completed: true });
  },
  
  // Merr detyrat e sotme
  async getTodayTasks() {
    const tasks = await this.getAll();
    const today = new Date().toDateString();
    return tasks.filter(t => new Date(t.dueDate).toDateString() === today);
  }
};
