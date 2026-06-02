// ===== NOTES API =====

const NotesAPI = {
  // Merr të gjithë shënimet
  async getAll() {
    return Storage.get('notes', []);
  },
  
  // Merr një shënim të veçantë
  async getById(id) {
    const notes = Storage.get('notes', []);
    return notes.find(n => n.id === id);
  },
  
  // Krijo një shënim
  async create(title, content, tags = []) {
    const notes = Storage.get('notes', []);
    const newNote = {
      id: generateId(),
      title,
      content,
      tags,
      created: new Date(),
      updated: new Date()
    };
    notes.unshift(newNote);
    Storage.set('notes', notes);
    return newNote;
  },
  
  // Përditëso një shënim
  async update(id, data) {
    const notes = Storage.get('notes', []);
    const note = notes.find(n => n.id === id);
    if (note) {
      Object.assign(note, data, { updated: new Date() });
      Storage.set('notes', notes);
    }
    return note;
  },
  
  // Fshij një shënim
  async delete(id) {
    let notes = Storage.get('notes', []);
    notes = notes.filter(n => n.id !== id);
    Storage.set('notes', notes);
  },
  
  // Kërko shënime
  async search(query) {
    const notes = Storage.get('notes', []);
    return notes.filter(n => 
      n.title.toLowerCase().includes(query.toLowerCase()) ||
      n.content.toLowerCase().includes(query.toLowerCase()) ||
      n.tags.some(t => t.toLowerCase().includes(query.toLowerCase()))
    );
  }
};
