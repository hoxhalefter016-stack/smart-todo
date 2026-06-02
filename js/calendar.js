// ===== CALENDAR SCRIPT =====

function loadCalendar() {
  const container = document.getElementById('calendar');
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();
  
  let html = `
    <div class="calendar-header">
      <h2>${firstDay.toLocaleDateString('sq-AL', { month: 'long', year: 'numeric' })}</h2>
    </div>
    <div class="calendar-grid">
  `;
  
  const days = ['E diel', 'E hënë', 'E martë', 'E mërkurë', 'E enjte', 'E premte', 'E shtunë'];
  days.forEach(day => {
    html += `<div class="calendar-day-header">${day.substring(0, 3)}</div>`;
  });
  
  for (let i = 0; i < startingDayOfWeek; i++) {
    html += '<div class="calendar-day empty"></div>';
  }
  
  for (let day = 1; day <= daysInMonth; day++) {
    const isToday = day === now.getDate() && month === now.getMonth() && year === now.getFullYear();
    html += `<div class="calendar-day ${isToday ? 'today' : ''}">${day}</div>`;
  }
  
  html += '</div>';
  container.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  loadCalendar();
});
