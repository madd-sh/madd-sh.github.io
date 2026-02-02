/* MADD - Multi-Agent Driven Development
   Theme Toggle & Language Selector for Hugo */

(function() {
  'use strict';

  // ========================================
  // Configuration
  // ========================================
  const STORAGE_KEY_THEME = 'madd-theme';

  // ========================================
  // Theme Management
  // ========================================
  function initTheme() {
    const savedTheme = localStorage.getItem(STORAGE_KEY_THEME);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Use system theme by default if no preference saved
    const theme = savedTheme || (prefersDark ? 'dark' : 'light');
    setTheme(theme, !savedTheme); // Don't persist to localStorage if using system default

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(STORAGE_KEY_THEME)) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  function setTheme(theme, skipPersist) {
    document.documentElement.setAttribute('data-theme', theme);
    if (!skipPersist) {
      localStorage.setItem(STORAGE_KEY_THEME, theme);
    }
  }

  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  }

  // ========================================
  // Language Selector (Hugo-based)
  // ========================================
  function initLangSelector() {
    const langSelector = document.getElementById('lang-selector');
    if (!langSelector) return;

    const langBtn = langSelector.querySelector('.lang-selector__btn');

    // Toggle dropdown
    langBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = langSelector.classList.toggle('lang-selector--open');
      langBtn.setAttribute('aria-expanded', isOpen);
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!langSelector.contains(e.target)) {
        langSelector.classList.remove('lang-selector--open');
        langBtn.setAttribute('aria-expanded', 'false');
      }
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        langSelector.classList.remove('lang-selector--open');
        langBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ========================================
  // Language Toggle (keyboard shortcut)
  // ========================================
  function toggleLanguage() {
    const currentLang = document.documentElement.getAttribute('lang') || 'en';
    const currentPath = window.location.pathname;

    if (currentLang === 'en') {
      // Switch to French
      if (currentPath === '/' || currentPath === '/index.html') {
        window.location.href = '/fr/';
      } else {
        window.location.href = '/fr' + currentPath;
      }
    } else {
      // Switch to English
      if (currentPath === '/fr/' || currentPath === '/fr/index.html') {
        window.location.href = '/';
      } else {
        window.location.href = currentPath.replace('/fr/', '/').replace('/fr', '');
      }
    }
  }

  // ========================================
  // UI Event Handlers
  // ========================================
  function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', toggleTheme);
    }
  }

  // ========================================
  // Initialize
  // ========================================
  function init() {
    initTheme();
    initThemeToggle();
    initLangSelector();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose for external use if needed
  window.MADD = window.MADD || {};
  window.MADD.i18n = {
    toggleTheme,
    setTheme,
    toggleLanguage
  };

})();
