// cv/script.js
// Check viewport width and toggle a class + dispatch an event
(function () {
  /**
   * Returns true if the viewport width is less than 800px.
   */
  function isSmallScreen() {
    return window.innerWidth < 850;
  }

  function updateScreenClass() {
    const small = isSmallScreen();
    document.body.classList.toggle('small-screen', small);
    // dispatch custom event so other scripts can react
    const ev = new CustomEvent('screenSizeChange', { detail: { small } });
    window.dispatchEvent(ev);
    return small;
  }

  // run on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateScreenClass);
  } else {
    updateScreenClass();
  }

  // run on resize (debounced)
  let resizeTimer = null;
  window.addEventListener('resize', () => {
    if (resizeTimer) clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      updateScreenClass();
      resizeTimer = null;
    }, 120);
  });

  // expose utility for other scripts if needed
  window.cvScreen = {
    isSmallScreen,
    updateScreenClass,
  };
})();
