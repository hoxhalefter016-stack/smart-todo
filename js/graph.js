// ===== GRAPH (MIND MAP) SCRIPT =====

function loadGraph() {
  const container = document.getElementById('graph-container');
  if (!container) return;

  const notes = Storage.get('notes', []);

  container.innerHTML = `
    <div class="graph-placeholder">
      <p>Hartë mendore - do të implementohet në fazën e ardhshme</p>
      <p>Numri i shënimeve: ${notes.length}</p>
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  loadGraph();
});
