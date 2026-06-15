(() => {
  const toggle   = document.getElementById('themeToggle');
  const html     = document.documentElement;
  const greeting = document.querySelector('.greeting');
  const label    = document.querySelector('.label-text');

  const MESSAGES = {
    light: { greeting: 'Good Day! ☀️',   label: 'Switch to Night Mode' },
    dark:  { greeting: 'Good Night! 🌙', label: 'Switch to Day Mode'   },
  };

  /** Apply a theme and persist the preference */
  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    toggle.checked       = theme === 'dark';
    greeting.textContent = MESSAGES[theme].greeting;
    label.textContent    = MESSAGES[theme].label;
    localStorage.setItem('theme', theme);
  }

  /** Read saved preference, fall back to OS preference */
  function getInitialTheme() {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }

  // Boot
  applyTheme(getInitialTheme());

  // Listen for toggle changes
  toggle.addEventListener('change', () => {
    applyTheme(toggle.checked ? 'dark' : 'light');
  });

  // Sync across browser tabs
  window.addEventListener('storage', (e) => {
    if (e.key === 'theme' && (e.newValue === 'light' || e.newValue === 'dark')) {
      applyTheme(e.newValue);
    }
  });
})();
