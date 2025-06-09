// Function to set the theme
function setTheme(theme) {
  if (theme === 'system') {
    document.documentElement.removeAttribute('data-theme');
  } else {
    document.documentElement.setAttribute('data-theme', theme);
  }
  localStorage.setItem('theme', theme);
  updateThemeIcon(theme);
}

// Function to update the theme icon
function updateThemeIcon(theme) {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDark = theme === 'dark' || (theme === 'system' && prefersDark);
  const icons = document.querySelectorAll('.theme-icon');
  
  icons.forEach(icon => {
    icon.textContent = isDark ? '🌞' : '🌙';
  });
}

// Function to toggle between light and dark theme
function toggleTheme() {
  const currentTheme = localStorage.getItem('theme') || 'system';
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (currentTheme === 'system') {
    setTheme(prefersDark ? 'light' : 'dark');
  } else if (currentTheme === 'dark') {
    setTheme('light');
  } else {
    setTheme('system');
  }
}

// Initialize theme when the page loads
document.addEventListener('DOMContentLoaded', () => {
  // Set initial theme from localStorage or system preference
  const savedTheme = localStorage.getItem('theme') || 'system';
  setTheme(savedTheme);
  
  // Add event listeners to theme toggle buttons
  const themeToggles = document.querySelectorAll('#theme-toggle, #mobile-theme-toggle');
  themeToggles.forEach(button => {
    button.addEventListener('click', toggleTheme);
  });
  
  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (localStorage.getItem('theme') === 'system') {
      updateThemeIcon('system');
    }
  });
});
