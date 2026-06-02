// ===== GOALS API =====

const GoalsAPI = {
  // Merr të gjithë qëllimet
  async getAll() {
    return Storage.get('goals', []);
  },
  
  // Merr një qëllim të veçantë
  async getById(id) {
    const goals = Storage.get('goals', []);
    return goals.find(g => g.id === id);
  },
  
  // Krijo një qëllim
  async create(title, description = '', targetDate = null) {
    const goals = Storage.get('goals', []);
    const newGoal = {
      id: generateId(),
      title,
      description,
      progress: 0,
      created: new Date(),
      targetDate
    };
    goals.unshift(newGoal);
    Storage.set('goals', goals);
    return newGoal;
  },
  
  // Përditëso progresion
  async updateProgress(id, progress) {
    return this.update(id, { progress: Math.min(progress, 100) });
  },
  
  // Përditëso një qëllim
  async update(id, data) {
    const goals = Storage.get('goals', []);
    const goal = goals.find(g => g.id === id);
    if (goal) {
      Object.assign(goal, data);
      Storage.set('goals', goals);
    }
    return goal;
  },
  
  // Fshij një qëllim
  async delete(id) {
    let goals = Storage.get('goals', []);
    goals = goals.filter(g => g.id !== id);
    Storage.set('goals', goals);
  }
};
