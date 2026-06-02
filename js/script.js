// ===== VALORA - GLOBAL SCRIPT =====

// Tema
function toggleTheme() {
  const html = document.documentElement;
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  document.body.setAttribute('data-theme', newTheme);
}

// Ngarko temën e ruajtur
function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  document.body.setAttribute('data-theme', savedTheme);
}

// Lokalizim
const translations = {
  sq: {
    dashboard: 'Dashboard',
    notes: 'Shënime',
    tasks: 'Detyra',
    calendar: 'Kalendar',
    goals: 'Qëllime',
    graph: 'Hartë Mendore',
    settings: 'Cilësimet',
    profile: 'Profili',
    search: 'Kërko...',
  },
  en: {
    dashboard: 'Dashboard',
    notes: 'Notes',
    tasks: 'Tasks',
    calendar: 'Calendar',
    goals: 'Goals',
    graph: 'Mind Map',
    settings: 'Settings',
    profile: 'Profile',
    search: 'Search...',
  },
};

let currentLang = localStorage.getItem('language') || 'sq';

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('language', lang);
  updateUILanguage();
}

function t(key) {
  return translations[currentLang]?.[key] || translations['sq'][key];
}

function updateUILanguage() {
  document.documentElement.lang = currentLang;
}

// Storage Management
const Storage = {
  set(key, value) {
    try {
      localStorage.setItem(`valora_${key}`, JSON.stringify(value));
    } catch (e) {
      console.error('Storage error:', e);
    }
  },

  get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(`valora_${key}`);
      return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
      console.error('Storage error:', e);
      return defaultValue;
    }
  },

  remove(key) {
    localStorage.removeItem(`valora_${key}`);
  },
};

// Navigation
function navigate(page) {
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => item.classList.remove('active'));

  const activeItem = document.querySelector(`[href*="${page}"]`);
  if (activeItem) {
    activeItem.classList.add('active');
  }
}

// Search functionality
const search = document.getElementById('search');
if (search) {
  search.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    performSearch(query);
  });
}

function performSearch(query) {
  if (query.length === 0) {
    return;
  }

  console.log('Searching for:', query);
}

// PWA - Service Worker Registration
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('pwa/service-worker.js')
    .then(() => console.log('Service Worker registered'))
    .catch(err => console.log('SW registration failed:', err));
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  updateUILanguage();

  const user = Storage.get('currentUser');
  if (!user) {
    console.log('No user logged in');
  }
});

// Offline detection
window.addEventListener('offline', () => {
  console.log('App is offline');
  showNotification('Jeni offline', 'Disa funksionalitete mund të mos jenë të disponueshme');
});

window.addEventListener('online', () => {
  console.log('App is online');
  showNotification('Jeni online', 'Të gjitha funksionalitetet janë të disponueshme');
});

// Notifications
function showNotification(title, message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <strong>${title}</strong>
    <p>${message}</p>
  `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.opacity = '0';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Utility functions
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

function formatDate(date, format = 'short') {
  const d = new Date(date);
  if (format === 'short') {
    return d.toLocaleDateString('sq-AL');
  } else if (format === 'long') {
    return d.toLocaleDateString('sq-AL', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
  return d.toLocaleString('sq-AL');
}

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

console.log('VALORA v0.1.0 - Aplikacioni Personal i Organizimit');
