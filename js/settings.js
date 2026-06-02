// ===== SETTINGS SCRIPT =====

function changeLanguage(lang) {
  setLanguage(lang);
  location.reload();
}

function exportData() {
  const data = {
    notes: Storage.get('notes', []),
    tasks: Storage.get('tasks', []),
    goals: Storage.get('goals', []),
    settings: {
      theme: localStorage.getItem('theme'),
      language: localStorage.getItem('language'),
    },
  };

  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `valora-backup-${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);

  showNotification('Sukses', 'Të dhënat u eksportuan');
}

function importData() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';

  input.onchange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        Storage.set('notes', data.notes || []);
        Storage.set('tasks', data.tasks || []);
        Storage.set('goals', data.goals || []);

        if (data.settings) {
          localStorage.setItem('theme', data.settings.theme);
          localStorage.setItem('language', data.settings.language);
        }

        showNotification('Sukses', 'Të dhënat u importuan');
        location.reload();
      } catch (err) {
        showNotification('Gabim', 'Nuk mund të importoheshin të dhënat');
      }
    };

    reader.readAsText(file);
  };

  input.click();
}

const languageSelect = document.getElementById('language-select');
if (languageSelect) {
  languageSelect.value = currentLang;
}

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
});
