// Runs before rendering in both entry pages to avoid a light flash.
(() => {
  const key = 'orientia-theme';
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  let preference = null;
  try { preference = localStorage.getItem(key); } catch { /* Storage may be blocked. */ }
  if (preference !== 'dark' && preference !== 'light') preference = null;
  const apply = () => {
    const theme = preference || (media.matches ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.style.colorScheme = theme;
    window.dispatchEvent(new Event('orientia-theme-change'));
  };
  window.orientiaTheme = {
    toggle() {
      preference = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
      try { localStorage.setItem(key, preference); } catch { /* Keep the in-memory choice. */ }
      apply();
    },
  };
  media.addEventListener('change', () => { if (!preference) apply(); });
  window.addEventListener('storage', (event) => {
    if (event.key !== key && event.key !== null) return;
    preference = event.newValue === 'dark' || event.newValue === 'light' ? event.newValue : null;
    apply();
  });
  apply();
})();
