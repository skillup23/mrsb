function loadAndInitHeader() {
  const headerPlaceholder = document.getElementById('header');
  if (!headerPlaceholder) return;

  fetch('header.html')
    .then((response) => response.text())
    .then((html) => {
      headerPlaceholder.innerHTML = html;
      executeHeaderScripts();
    });
}

function executeHeaderScripts() {
  const scripts = document.getElementById('header').querySelectorAll('script');

  scripts.forEach((script) => {
    const newScript = document.createElement('script');
    if (script.src) {
      newScript.src = script.src;
      document.head.appendChild(newScript);
    } else {
      newScript.textContent = script.textContent;
      document.body.appendChild(newScript).remove();
    }
  });
}

// Запускаем когда DOM готов
document.addEventListener('readystatechange', () => {
  if (
    document.readyState === 'interactive' ||
    document.readyState === 'complete'
  ) {
    loadAndInitHeader();
  }
});
