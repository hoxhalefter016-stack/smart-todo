// ===== NOTES SCRIPT =====

let currentNoteId = null;
let notes = Storage.get('notes', []);

function loadNotes() {
  const container = document.getElementById('notes-list');
  if (!container) return;
  
  notes = Storage.get('notes', []);
  
  if (notes.length === 0) {
    container.innerHTML = '<p>Nuk ka shënime</p>';
    return;
  }
  
  container.innerHTML = notes.map(note => `
    <div class="note-item ${note.id === currentNoteId ? 'active' : ''}" onclick="selectNote('${note.id}')">
      <h4>${note.title}</h4>
      <small>${formatDate(note.updated)}</small>
    </div>
  `).join('');
}

function selectNote(noteId) {
  currentNoteId = noteId;
  const note = notes.find(n => n.id === noteId);
  
  if (note) {
    const editor = document.getElementById('note-editor');
    editor.innerHTML = `
      <div class="note-editor-header">
        <input type="text" value="${note.title}" placeholder="Titull" onchange="updateNoteTitle('${note.id}', this.value)">
        <button onclick="deleteNote('${note.id}')">🗑️ Fshij</button>
      </div>
      <textarea placeholder="Shënime..." onchange="updateNoteContent('${note.id}', this.value)">${note.content}</textarea>
    `;
  }
  
  loadNotes();
}

function createNewNote() {
  const newNote = {
    id: generateId(),
    title: 'Shënim i ri',
    content: '',
    tags: [],
    created: new Date(),
    updated: new Date()
  };
  
  notes.unshift(newNote);
  Storage.set('notes', notes);
  selectNote(newNote.id);
  loadNotes();
}

function updateNoteTitle(noteId, title) {
  const note = notes.find(n => n.id === noteId);
  if (note) {
    note.title = title;
    note.updated = new Date();
    Storage.set('notes', notes);
    loadNotes();
  }
}

function updateNoteContent(noteId, content) {
  const note = notes.find(n => n.id === noteId);
  if (note) {
    note.content = content;
    note.updated = new Date();
    Storage.set('notes', notes);
  }
}

function deleteNote(noteId) {
  notes = notes.filter(n => n.id !== noteId);
  Storage.set('notes', notes);
  currentNoteId = null;
  loadNotes();
  
  const editor = document.getElementById('note-editor');
  if (editor) {
    editor.innerHTML = '<div class="editor-empty"><p>Zgjidh një shënim për të filluar</p></div>';
  }
}

const searchInput = document.getElementById('notes-search');
if (searchInput) {
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = notes.filter(n => 
      n.title.toLowerCase().includes(query) || 
      n.content.toLowerCase().includes(query)
    );
    
    const container = document.getElementById('notes-list');
    container.innerHTML = filtered.map(note => `
      <div class="note-item ${note.id === currentNoteId ? 'active' : ''}" onclick="selectNote('${note.id}')">
        <h4>${note.title}</h4>
        <small>${formatDate(note.updated)}</small>
      </div>
    `).join('');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  loadNotes();
});
